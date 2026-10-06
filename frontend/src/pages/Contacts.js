import { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5001/contacts';

function Contacts() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ personName: '', company: '', email: '', linkedin: '' });

  const fetchData = async () => { const res = await axios.get(API); setList(res.data); };
  useEffect(() => { fetchData(); }, []);

  const add = async () => { await axios.post(API, form); setForm({ personName: '', company: '', email: '', linkedin: '' }); fetchData(); };
  const remove = async (id) => { await axios.delete(`${API}/${id}`); fetchData(); };

  const inputStyle = { padding: '10px', borderRadius: '8px', border: '1px solid #D8B4FE', width: '160px', outline: 'none', fontSize: '13px' };
  const cardStyle = { background: 'white', borderRadius: '12px', padding: '16px', boxShadow: '0 2px 10px rgba(108,61,224,0.1)', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };

  return (
    <div>
      <h2 style={{ color: '#6C3DE0', marginBottom: '16px' }}>👤 Contacts</h2>
      <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 10px rgba(108,61,224,0.1)', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input style={inputStyle} placeholder="Person Name" value={form.personName} onChange={e => setForm({...form, personName: e.target.value})} />
          <input style={inputStyle} placeholder="Company" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
          <input style={inputStyle} placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          <input style={inputStyle} placeholder="LinkedIn URL" value={form.linkedin} onChange={e => setForm({...form, linkedin: e.target.value})} />
          <button onClick={add} style={{ padding: '10px 24px', background: 'linear-gradient(135deg, #6C3DE0, #9B59B6)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>
            + Add
          </button>
        </div>
      </div>
      {list.map(item => (
        <div key={item.id} style={cardStyle}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #6C3DE0, #9B59B6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '16px' }}>
              {item.personName ? item.personName[0].toUpperCase() : '?'}
            </div>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#2D1B69' }}>{item.personName}</div>
              <div style={{ fontSize: '13px', color: '#6B7280' }}>{item.company}</div>
            </div>
            <div style={{ fontSize: '13px', color: '#6B7280' }}>{item.email}</div>
            <a href={item.linkedin} target="_blank" rel="noreferrer" style={{ fontSize: '13px', color: '#6C3DE0', fontWeight: 'bold' }}>LinkedIn →</a>
          </div>
          <button onClick={() => remove(item.id)} style={{ padding: '6px 14px', background: '#FEE2E2', color: '#EF4444', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Delete</button>
        </div>
      ))}
      {list.length === 0 && <p style={{ color: '#9CA3AF', textAlign: 'center', marginTop: '40px' }}>No entries yet! Add one above 😊</p>}
    </div>
  );
}

export default Contacts;