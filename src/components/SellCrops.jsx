import React, { useEffect, useState } from "react";

/*
  SellCrops:
  - Basic listing form saved to localStorage for demo.
  - Replace with API endpoints for production and image upload.
*/

export default function SellCrops() {
  const [listings, setListings] = useState([]);
  const [form, setForm] = useState({ crop: "", quantity: "", price: "" });

  useEffect(() => {
    const raw = localStorage.getItem("farmigo_sell_listings");
    setListings(raw ? JSON.parse(raw) : []);
  }, []);

  function submit(e) {
    e.preventDefault();
    if (!form.crop || !form.quantity || !form.price) {
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
    setForm({ crop: "", quantity: "", price: "" });
  }

  return (
    <section className="card">
      <h2 style={{marginTop:0}}>Sell Crops</h2>
      <p style={{color:"var(--muted)"}}>Create a listing to sell crops. Buyers can contact you (contact flow to add).</p>

      <form onSubmit={submit} style={{display:"grid",gap:8,marginTop:12}}>
        <input placeholder="Crop (e.g., Maize)"
          value={form.crop} onChange={(e)=>setForm({...form,crop:e.target.value})}
          style={{padding:10,borderRadius:8}} />
        <input placeholder="Quantity (e.g., 100 kg)"
          value={form.quantity} onChange={(e)=>setForm({...form,quantity:e.target.value})}
          style={{padding:10,borderRadius:8}} />
        <input placeholder="Price (e.g., 300 USD per 100 kg)"
          value={form.price} onChange={(e)=>setForm({...form,price:e.target.value})}
          style={{padding:10,borderRadius:8}} />
        <div style={{display:"flex",gap:8}}>
          <button className="btn btn-primary" type="submit">Create listing</button>
          <button className="btn btn-ghost" type="button" onClick={()=>setForm({crop:"",quantity:"",price:""})}>Reset</button>
        </div>
      </form>

      <div style={{marginTop:16}}>
        <h3 style={{marginBottom:8}}>Listings</h3>
        {listings.length === 0 && <div style={{color:"var(--muted)"}}>No listings yet</div>}
        {listings.map((l) => (
          <div key={l.id} style={{padding:10,background:"rgba(255,255,255,0.02)",borderRadius:8,marginBottom:8}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontWeight:700}}>{l.crop}</div>
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