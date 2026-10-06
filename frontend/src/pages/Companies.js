import { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5001/companies';

function Companies() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ name: '', location: '', domain: '', website: '' });

  const fetchData = async () => { const res = await axios.get(API); setList(res.data); };
  useEffect(() => { fetchData(); }, []);

  const add = async () => { await axios.post(API, form); setForm({ name: '', location: '', domain: '', website: '' }); fetchData(); };
  const remove = async (id) => { await axios.delete(`${API}/${id}`); fetchData(); };

  const inputStyle = { padding: '10px', borderRadius: '8px', border: '1px solid #99F6E4', width: '160px', outline: 'none', fontSize: '13px' };
  const cardStyle = { background: 'white', borderRadius: '12px', padding: '16px', boxShadow: '0 2px 10px rgba(13,148,136,0.1)', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };

  return (
    <div>
      <h2 style={{ color: '#0D9488', marginBottom: '16px' }}>🏢 Companies</h2>
      <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 10px rgba(13,148,136,0.1)', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input style={inputStyle} placeholder="Company Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          <input style={inputStyle} placeholder="Location" value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
          <input style={inputStyle} placeholder="Domain (eg: AI)" value={form.domain} onChange={e => setForm({...form, domain: e.target.value})} />
          <input style={inputStyle} placeholder="Website" value={form.website} onChange={e => setForm({...form, website: e.target.value})} />
          <button onClick={add} style={{ padding: '10px 24px', background: 'linear-gradient(135deg, #0D9488, #14B8A6)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>
            + Add
          </button>
        </div>
      </div>
      {list.map(item => (
        <div key={item.id} style={cardStyle}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#134E4A' }}>{item.name}</div>
              <div style={{ fontSize: '13px', color: '#6B7280' }}>{item.location}</div>
            </div>
            <span style={{ padding: '4px 14px', borderRadius: '20px', backgroundColor: '#CCFBF1', color: '#0D9488', fontSize: '12px', fontWeight: 'bold' }}>{item.domain}</span>
            <a href={item.website} target="_blank" rel="noreferrer" style={{ fontSize: '13px', color: '#0D9488' }}>{item.website}</a>
          </div>
          <button onClick={() => remove(item.id)} style={{ padding: '6px 14px', background: '#FEE2E2', color: '#EF4444', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Delete</button>
        </div>
      ))}
      {list.length === 0 && <p style={{ color: '#9CA3AF', textAlign: 'center', marginTop: '40px' }}>No entries yet! Add one above 😊</p>}
    </div>
  );
}

export default Companies;