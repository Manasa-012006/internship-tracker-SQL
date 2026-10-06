import { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5001/internships';

function Internships() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ company: '', role: '', status: '', notes: '' });

  const fetchData = async () => { const res = await axios.get(API); setList(res.data); };
  useEffect(() => { fetchData(); }, []);

  const add = async () => { await axios.post(API, form); setForm({ company: '', role: '', status: '', notes: '' }); fetchData(); };
  const remove = async (id) => { await axios.delete(`${API}/${id}`); fetchData(); };

  const inputStyle = { padding: '10px', borderRadius: '8px', border: '1px solid #99F6E4', width: '160px', outline: 'none', fontSize: '13px' };
  const cardStyle = { background: 'white', borderRadius: '12px', padding: '16px', boxShadow: '0 2px 10px rgba(13,148,136,0.1)', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };

  const statusColor = (status) => {
    if (status === 'Selected') return '#10B981';
    if (status === 'Rejected') return '#EF4444';
    if (status === 'Interview') return '#F59E0B';
    return '#0D9488';
  };

  return (
    <div>
      <h2 style={{ color: '#0D9488', marginBottom: '16px' }}>📋 Internship Applications</h2>
      <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 10px rgba(13,148,136,0.1)', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input style={inputStyle} placeholder="Company" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
          <input style={inputStyle} placeholder="Role" value={form.role} onChange={e => setForm({...form, role: e.target.value})} />
          <select style={inputStyle} value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
            <option value="">Select Status</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>
          <input style={inputStyle} placeholder="Notes" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
          <button onClick={add} style={{ padding: '10px 24px', background: 'linear-gradient(135deg, #0D9488, #14B8A6)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>
            + Add
          </button>
        </div>
      </div>
      {list.map(item => (
        <div key={item.id} style={cardStyle}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#134E4A' }}>{item.company}</div>
              <div style={{ fontSize: '13px', color: '#6B7280' }}>{item.role}</div>
            </div>
            <span style={{ padding: '4px 14px', borderRadius: '20px', backgroundColor: statusColor(item.status), color: 'white', fontSize: '12px', fontWeight: 'bold' }}>
              {item.status}
            </span>
            <div style={{ fontSize: '13px', color: '#6B7280' }}>{item.notes}</div>
          </div>
          <button onClick={() => remove(item.id)} style={{ padding: '6px 14px', background: '#FEE2E2', color: '#EF4444', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            Delete
          </button>
        </div>
      ))}
      {list.length === 0 && <p style={{ color: '#9CA3AF', textAlign: 'center', marginTop: '40px' }}>No entries yet! Add one above 😊</p>}
    </div>
  );
}

export default Internships;