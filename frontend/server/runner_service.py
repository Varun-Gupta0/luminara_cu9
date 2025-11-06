"""Persistent FastAPI runner that loads a Hugging Face pipeline once and
serves a simple chat-like endpoint used by the Node proxy.

Run with:
  pip install fastapi uvicorn transformers torch
  uvicorn server.runner_service:app --host 127.0.0.1 --port 5001

Notes:
- Loading the model may take a while and requires sufficient memory.
- For production, run this behind a process manager and ensure model files
  are cached to disk.
"""
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
import logging

try:
    from transformers import AutoTokenizer, AutoModelForMaskedLM
    import torch
except Exception as e:
    raise RuntimeError(f"Failed to import transformers or torch: {e}")

app = FastAPI()
logger = logging.getLogger("runner_service")


class ChatReq(BaseModel):
    message: str


class ChatResp(BaseModel):
    reply: str


@app.on_event("startup")
def load_model():
    # Load tokenizer and model once. Use GPU if available.
    global tokenizer, model, mask_token, device
    logger.info("Loading tokenizer and model (recobo/agriculture-bert-uncased)")
    device = 0 if torch.cuda.is_available() else -1
    tokenizer = AutoTokenizer.from_pretrained("recobo/agriculture-bert-uncased")
    model = AutoModelForMaskedLM.from_pretrained("recobo/agriculture-bert-uncased")
    if device == 0:
        model.to("cuda")
    mask_token = getattr(tokenizer, "mask_token", "[MASK]") or "[MASK]"
    logger.info("Model loaded")


@app.post("/internal/chat", response_model=ChatResp)
def chat(req: ChatReq):
    if not req.message:
        raise HTTPException(status_code=400, detail="Missing message")

    # Build a short prompt using the mask token. This model is a masked-LM
    # and will provide token suggestions for the mask position.
    prompt = f"{req.message} The likely issue is {mask_token}."
    try:
        inputs = tokenizer(prompt, return_tensors="pt")
        if device == 0:
            inputs = {k: v.to("cuda") for k, v in inputs.items()}

        with torch.no_grad():
            outputs = model(**inputs)
            logits = outputs.logits  # shape: (batch, seq_len, vocab_size)

        input_ids = inputs["input_ids"]
        mask_id = tokenizer.mask_token_id
        # find mask positions
        mask_positions = (input_ids == mask_id).nonzero(as_tuple=False)
        suggestions = []
        if mask_positions.size(0) == 0:
            # No explicit mask token found; fall back to using last token position
            pos = input_ids.size(1) - 1
            logits_at_pos = logits[0, pos]
            probs = torch.softmax(logits_at_pos, dim=-1)
            topk = torch.topk(probs, k=5)
            for token_id, score in zip(topk.indices.tolist(), topk.values.tolist()):
                token = tokenizer.decode([token_id]).strip()
                suggestions.append(f"{token}: {round(float(score), 3)}")
        else:
            # handle first mask position
            pos = mask_positions[0, 1].item()
            logits_at_pos = logits[0, pos]
            probs = torch.softmax(logits_at_pos, dim=-1)
            topk = torch.topk(probs, k=5)
            for token_id, score in zip(topk.indices.tolist(), topk.values.tolist()):
                token = tokenizer.decode([token_id]).strip()
                suggestions.append(f"{token}: {round(float(score), 3)}")

        reply = "Suggestions: " + "; ".join(suggestions)
        return {"reply": reply}
    except Exception as e:
        logger.exception("Model inference failed")
        raise HTTPException(status_code=500, detail=str(e))
