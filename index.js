import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Connessione a Supabase
const supabaseUrl = 'https://gleqdisrwmvgfnqlebsc.supabase.co';
const supabaseKey = 'sb_publishable_op6dwteVSnU2MQWyeR-o_w_DPGc0GTl';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function fetchListings() {
      const { data, error } = await supabase.from('listings').select('*');
      if (!error) setListings(data);
    }
    fetchListings();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '28px' }}>🐾 PetRent Italy</h1>
        <p style={{ color: '#666' }}>Trova la tua prossima casa in affitto senza separarti dai tuoi animali</p>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
        {listings.map((item) => (
          <div key={item.id} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #ddd', overflow: 'hidden', padding: '16px' }}>
            <img src={item.image_url} alt={item.title} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }} />
            <div style={{ marginTop: '12px' }}>
              <span style={{ background: '#d1fae5', color: '#065f46', fontSize: '12px', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                🐶 {item.pet_policy ? item.pet_policy.toUpperCase() : 'PET FRIENDLY'}
              </span>
              <h3 style={{ fontSize: '16px', margin: '10px 0 5px 0' }}>{item.title}</h3>
              <p style={{ color: '#666', fontSize: '14px', margin: '0' }}>{item.location}</p>
              <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '10px 0' }}>{item.price}</p>
              <a
                href={item.original_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', textAlign: 'center', background: '#2563eb', color: '#fff', padding: '10px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}
              >
                Vedi Annuncio Originale ↗
              </a>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
