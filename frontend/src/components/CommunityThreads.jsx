import React, { useEffect, useState, useRef } from "react";

/*
  CommunityThreads:
  - Basic thread posting and viewing for disease problems/solutions.
  - Mock location filtering (assume user's location is "Delhi" for demo).
  - Saved to localStorage for demo.
*/

const MOCK_LOCATION = "Delhi"; // Mock user location

export default function CommunityThreads() {
  const ref = useRef(null);
  useEffect(() => { if (ref.current) ref.current.classList.add("visible"); }, []);
  const [threads, setThreads] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", location: MOCK_LOCATION });

  useEffect(() => {
    const raw = localStorage.getItem("farmigo_community_threads");
    setThreads(raw ? JSON.parse(raw) : []);
  }, []);

  function submit(e) {
    e.preventDefault();
    if (!form.title || !form.description) {
      alert("Fill title and description");
      return;
    }
    const thread = {
      id: Date.now().toString(),
      ...form,
      createdAt: new Date().toISOString(),
      replies: []
    };
    const updated = [thread, ...threads];
    setThreads(updated);
    localStorage.setItem("farmigo_community_threads", JSON.stringify(updated));
    setForm({ title: "", description: "", location: MOCK_LOCATION });
  }

  // Filter threads to show only nearby (mock: same location)
  const nearbyThreads = threads.filter(t => t.location === MOCK_LOCATION);

  return (
    <section className="card" ref={ref}>
      <h2 style={{marginTop:0}}>Community Threads</h2>
      <p style={{color:"var(--muted)"}}>Share crop disease problems and solutions with nearby farmers.</p>

      <form onSubmit={submit} style={{display:"grid",gap:8,marginTop:12}}>
        <input placeholder="Title (e.g., Aphids on Tomato)"
          value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})}
          style={{padding:10,borderRadius:8}} />
        <textarea placeholder="Describe the problem and solution..."
          value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})}
          rows={4} style={{padding:10,borderRadius:8}} />
        <div style={{display:"flex",gap:8}}>
          <button className="btn btn-primary" type="submit">Post Thread</button>
          <button className="btn btn-ghost" type="button" onClick={()=>setForm({title:"",description:"",location:MOCK_LOCATION})}>Reset</button>
        </div>
      </form>

      <div style={{marginTop:16}}>
        <h3 style={{marginBottom:8}}>Nearby Threads ({MOCK_LOCATION})</h3>
        {nearbyThreads.length === 0 && <div style={{color:"var(--muted)"}}>No threads yet</div>}
        {nearbyThreads.map((t) => (
          <div key={t.id} style={{padding:10,background:"rgba(255,255,255,0.02)",borderRadius:8,marginBottom:8}}>
            <div style={{fontWeight:700}}>{t.title}</div>
            <div style={{color:"var(--muted)",fontSize:13,marginTop:4}}>{t.description}</div>
            <div style={{fontSize:12,color:"var(--muted)",marginTop:4}}>{t.location} • {new Date(t.createdAt).toLocaleDateString()}</div>
          </div>
        ))}
      </div>

      <div style={{marginTop:12,color:"var(--muted)",fontSize:13}}>
        Production note: Add real location services, replies, upvotes, and moderation.
      </div>
    </section>
  );
}
