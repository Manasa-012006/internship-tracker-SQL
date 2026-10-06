import { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5001/skills';

function Skills() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ name: '', level: '', category: '' });

  const fetchData = async () => { const res = await axios.get(API); setList(res.data); };
  useEffect(() => { fetchData(); }, []);

  const add = async () => { await axios.post(API, form); setForm({ name: '', level: '', category: '' }); fetchData(); };
  const remove = async (id) => { await axios.delete(`${API}/${id}`); fetchData(); };

  const inputStyle = { padding: '10px', borderRadius: '8px', border: '1px solid #99F6E4', width: '160px', outline: 'none', fontSize: '13px' };
  const levelColor = (level) => level === 'Advanced' ? '#10B981' : level === 'Intermediate' ? '#F59E0B' : '#0D9488';

  return (
    <div>
      <h2 style={{ color: '#0D9488', marginBottom: '16px' }}>💡 Skills</h2>
      <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 10px rgba(13,148,136,0.1)', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input style={inputStyle} placeholder="Skill Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          <select style={inputStyle} value={form.level} onChange={e => setForm({...form, level: e.target.value})}>
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <input style={inputStyle} placeholder="Category (eg: ML)" value={form.category} onChange={e => setForm({...form, category: e.target.value})} />
          <button onClick={add} style={{ padding: '10px 24px', background: 'linear-gradient(135deg, #0D9488, #14B8A6)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>
            + Add
          </button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
        {list.map(item => (
          <div key={item.id} style={{ background: 'white', borderRadius: '12px', padding: '16px', boxShadow: '0 2px 10px rgba(13,148,136,0.1)', borderTop: `4px solid ${levelColor(item.level)}` }}>
            <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#134E4A', marginBottom: '6px' }}>{item.name}</div>
            <span style={{ padding: '3px 12px', borderRadius: '20px', backgroundColor: levelColor(item.level), color: 'white', fontSize: '11px', fontWeight: 'bold' }}>{item.level}</span>
            <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '8px' }}>{item.category}</div>
            <button onClick={() => remove(item.id)} style={{ marginTop: '10px', padding: '5px 12px', background: '#FEE2E2', color: '#EF4444', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>Delete</button>
          </div>
        ))}
      </div>
      {list.length === 0 && <p style={{ color: '#9CA3AF', textAlign: 'center', marginTop: '40px' }}>No entries yet! Add one above 😊</p>}
    </div>
  );
}

export default Skills;