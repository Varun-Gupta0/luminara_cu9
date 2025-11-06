import React, { useRef, useEffect } from "react";

/*
  Simple image gallery to add visual richness.
  Uses Unsplash images (hotlink). Replace with your own assets for production.
*/
const IMAGES = [
  { src: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=800&auto=format&fit=crop", alt: "Field at sunrise" },
  { src: "https://www.gamesreviews.com/wp-content/uploads/2024/06/unnamed-5-2048x1152.jpg", alt: "Tractor in field" },
  { src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop", alt: "Fresh produce baskets" },
  { src: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=800&auto=format&fit=crop", alt: "Farmer inspecting crop" }
];

export default function Gallery() {
  const ref = useRef(null);
  useEffect(() => { if (ref.current) ref.current.classList.add("visible"); }, []);
  return (
    <section id="gallery" className="gallery card" aria-label="Gallery" ref={ref}>
      <h3 style={{marginTop:0}}>Field moments</h3>
      <p className="muted">Photos from farms and markets — inspiration and real-world context.</p>

      <div className="gallery-grid">
        {IMAGES.map((img, i) => (
          <figure key={i} className="gallery-item">
            <img src={img.src} alt={img.alt} loading="lazy" />
            <figcaption>{img.alt}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}