import React, { useEffect, useState, useRef } from "react";

/*
  Simple Rent Tools module:
  - Shows tools list
  - Allows user to request a rent (saved in localStorage)
  - Scalable: replace localStorage with API calls
*/

const TOOLS = [
  { id: "t1", name: "Hand Plough", pricePerhour: 5 },
  { id: "t2", name: "Motorized Sprayer", pricePerhour: 20 },
  { id: "t3", name: "Rotary Tiller", pricePerhour: 30 },
  { id: "t4", name: "Seed Drill", pricePerhour: 25 }
];

export default function RentTools() {
  const ref = useRef(null);
  useEffect(() => { if (ref.current) ref.current.classList.add("visible"); }, []);
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState(null);
  const [hours, sethours] = useState(1);

  useEffect(() => {
    const raw = localStorage.getItem("farmigo_rent_requests");
    setRequests(raw ? JSON.parse(raw) : []);
  }, []);

  function saveRequest(tool) {
    const req = {
      id: Date.now().toString(),
      toolId: tool.id,
      toolName: tool.name,
      hours: Number(hours) || 1,
      total: (tool.pricePerhour * (Number(hours) || 1)),
      createdAt: new Date().toISOString()
    };
    const updated = [req, ...requests];
    setRequests(updated);
    localStorage.setItem("farmigo_rent_requests", JSON.stringify(updated));
    setSelected(null);
    sethours(1);
    alert("Rent request created (saved locally). Replace with backend API for production.");
  }

  return (
    <section className="card" ref={ref}>
      <h2 style={{marginTop:0}}>Rent Tools</h2>
      <p style={{color:"var(--muted)"}}>Choose a tool and submit a rent request.</p>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12,marginTop:12}}>
        {TOOLS.map((t) => (
          <div key={t.id} style={{padding:12,background:"rgba(255,255,255,0.02)",borderRadius:8}}>
            <div style={{fontWeight:700}}>{t.name}</div>
            <div style={{color:"var(--muted)",fontSize:13}}>Price: ${t.pricePerhour}/hour</div>
            <div style={{marginTop:8,display:"flex",gap:8}}>
              <button className="btn btn-primary" onClick={() => setSelected(t)}>Rent</button>
              <button className="btn btn-ghost" onClick={() => alert("View details placeholder")}>Details</button>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div style={{marginTop:12,padding:12,background:"linear-gradient(180deg, rgba(255,255,255,0.01), transparent)",borderRadius:8}}>
          <div style={{fontWeight:700}}>Rent: {selected.name}</div>
          <div style={{display:"flex",gap:8,alignItems:"center",marginTop:8}}>
            <label style={{color:"var(--muted)"}}>hours:</label>
            <input type="number" value={hours} min={1} onChange={(e)=>sethours(e.target.value)} style={{width:80,padding:8,borderRadius:8}} />
            <div style={{marginLeft:"auto",fontWeight:700}}>Total: ${(selected.pricePerhour * (Number(hours)||1)).toFixed(2)}</div>
            <button className="btn btn-primary" onClick={()=>saveRequest(selected)}>Submit Request</button>
            <button className="btn btn-ghost" onClick={()=>setSelected(null)}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{marginTop:16}}>
        <h3 style={{marginBottom:8}}>Your requests</h3>
        {requests.length === 0 && <div style={{color:"var(--muted)"}}>No requests yet</div>}
        {requests.map((r) => (
          <div key={r.id} style={{padding:10,background:"rgba(255,255,255,0.02)",borderRadius:8,marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontWeight:700}}>{r.toolName}</div>
              <div style={{color:"var(--muted)",fontSize:13}}>{r.hours} hour(s) • ${r.total.toFixed(2)}</div>
            </div>
            <div style={{fontSize:12,color:"var(--muted)"}}>{new Date(r.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>

      <div style={{marginTop:12,color:"var(--muted)",fontSize:13}}>
        Replace localStorage with API endpoints to manage availability, payments and owner contacts.
      </div>
    </section>
  );
}