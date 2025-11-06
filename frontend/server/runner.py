#!/usr/bin/env python3
"""
Simple Python runner that uses a Hugging Face `fill-mask` pipeline
with the model `recobo/agriculture-bert-uncased` to provide short hints
based on an incoming message.

Usage: the Node server writes a JSON object to stdin: {"message": "..."}
This script prints a JSON object to stdout: {"reply": "..."}

Requirements:
  pip install transformers torch

Note: loading the model may take time and requires sufficient RAM. For
production use, run this as a persistent Python service (FastAPI/Flask)
rather than spawning per-request.
"""
import sys
import json

try:
    from transformers import pipeline
except Exception as e:
    print(json.dumps({"error": f"Failed to import transformers: {e}"}))
    sys.exit(1)


def main():
    try:
        raw = sys.stdin.read()
        data = json.loads(raw or "{}")
        message = data.get("message", "")
        if not message:
            print(json.dumps({"reply": "No message provided"}))
            return

        # Initialize the pipeline once (for a persistent runner you would keep this in global scope)
        # For simplicity we construct it here. This will download and cache the model the first time.
        pipe = pipeline("fill-mask", model="recobo/agriculture-bert-uncased")

        mask_token = getattr(pipe.tokenizer, "mask_token", "[MASK]") or "[MASK]"
        # Create a simple prompt that asks the model to guess a short label related to the message.
        prompt = f"{message} The likely issue is {mask_token}."

        results = pipe(prompt, top_k=5)

        # Format suggestions into a concise reply
        suggestions = []
        for r in results:
            token = r.get("token_str") or r.get("sequence", "").strip()
            score = r.get("score", 0.0)
            suggestions.append(f"{token.strip()}: {round(score, 3)}")

        reply = "Suggestions: " + "; ".join(suggestions)
        print(json.dumps({"reply": reply}))
    except Exception as exc:
        print(json.dumps({"error": str(exc)}))
        sys.exit(1)


if __name__ == '__main__':
    main()
