import React, { useEffect, useState, useRef } from "react";

/*
  SellFertilizers:
  - Basic listing form saved to localStorage for demo.
  - Replace with API endpoints for production and image upload.
*/

export default function SellCrops() {
  const ref = useRef(null);
  useEffect(() => { if (ref.current) ref.current.classList.add("visible"); }, []);
  const [listings, setListings] = useState([]);
  const [form, setForm] = useState({ item: "", quantity: "", price: "" });

  useEffect(() => {
    const raw = localStorage.getItem("farmigo_sell_listings");
    setListings(raw ? JSON.parse(raw) : []);
  }, []);

  function submit(e) {
    e.preventDefault();
    if (!form.item || !form.quantity || !form.price) {
      alert("Fill all fields");
      return;
    }
    const item = {
      id: Date.now().toString(),
      ...form,
      createdAt: new Date().toISOString()
    };
    const updated = [item, ...listings];
    setListings(updated);
    localStorage.setItem("farmigo_sell_listings", JSON.stringify(updated));
    setForm({ item: "", quantity: "", price: "" });
  }

  return (
    <section className="card" ref={ref}>
      <h2 style={{marginTop:0}}>Sell Fertilizers & Pesticides</h2>
      <p style={{color:"var(--muted)"}}>Create a listing to sell used fertilizers or pesticides. Buyers can contact you (contact flow to add).</p>

      <form onSubmit={submit} style={{display:"grid",gap:8,marginTop:12}}>
        <input placeholder="Item (e.g., Urea Fertilizer)"
          value={form.item} onChange={(e)=>setForm({...form,item:e.target.value})}
          style={{padding:10,borderRadius:8}} />
        <input placeholder="Quantity (e.g., 50 kg)"
          value={form.quantity} onChange={(e)=>setForm({...form,quantity:e.target.value})}
          style={{padding:10,borderRadius:8}} />
        <input placeholder="Price (e.g., 200 USD per 50 kg)"
          value={form.price} onChange={(e)=>setForm({...form,price:e.target.value})}
          style={{padding:10,borderRadius:8}} />
        <div style={{display:"flex",gap:8}}>
          <button className="btn btn-primary" type="submit">Create listing</button>
          <button className="btn btn-ghost" type="button" onClick={()=>setForm({item:"",quantity:"",price:""})}>Reset</button>
        </div>
      </form>

      <div style={{marginTop:16}}>
        <h3 style={{marginBottom:8}}>Listings</h3>
        {listings.length === 0 && <div style={{color:"var(--muted)"}}>No listings yet</div>}
        {listings.map((l) => (
          <div key={l.id} style={{padding:10,background:"rgba(255,255,255,0.02)",borderRadius:8,marginBottom:8}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontWeight:700}}>{l.item}</div>
                <div style={{color:"var(--muted)",fontSize:13}}>{l.quantity} • {l.price}</div>
              </div>
              <div style={{fontSize:12,color:"var(--muted)"}}>{new Date(l.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{marginTop:12,color:"var(--muted)",fontSize:13}}>
        Production note: Add contact info, images and verification for listings when moving to production.
      </div>
    </section>
  );
}
