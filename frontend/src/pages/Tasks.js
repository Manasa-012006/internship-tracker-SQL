import { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5001/tasks';

function Tasks() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ task: '', deadline: '', priority: '', status: '' });

  const fetchData = async () => { const res = await axios.get(API); setList(res.data); };
  useEffect(() => { fetchData(); }, []);

  const add = async () => { await axios.post(API, form); setForm({ task: '', deadline: '', priority: '', status: '' }); fetchData(); };
  const remove = async (id) => { await axios.delete(`${API}/${id}`); fetchData(); };

  const inputStyle = { padding: '10px', borderRadius: '8px', border: '1px solid #D8B4FE', width: '160px', outline: 'none', fontSize: '13px' };
  const priorityColor = (p) => p === 'High' ? '#EF4444' : p === 'Medium' ? '#F59E0B' : '#10B981';
  const statusColor = (s) => s === 'Done' ? '#10B981' : s === 'In Progress' ? '#F59E0B' : '#9CA3AF';

  return (
    <div>
      <h2 style={{ color: '#3de0d8', marginBottom: '16px' }}>✅ Tasks</h2>
      <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 10px rgba(108,61,224,0.1)', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input style={inputStyle} placeholder="Task Description" value={form.task} onChange={e => setForm({...form, task: e.target.value})} />
          <input style={{...inputStyle, width: '140px'}} type="date" value={form.deadline} onChange={e => setForm({...form, deadline: e.target.value})} />
          <select style={inputStyle} value={form.priority} onChange={e => setForm({...form, priority: e.target.value})}>
            <option value="">Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select style={inputStyle} value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
            <option value="">Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <button onClick={add} style={{ padding: '10px 24px', background: 'linear-gradient(135deg, #6C3DE0, #9B59B6)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>
            + Add
          </button>
        </div>
      </div>
      {list.map(item => (
        <div key={item.id} style={{ background: 'white', borderRadius: '12px', padding: '16px', boxShadow: '0 2px 10px rgba(108,61,224,0.1)', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#2D1B69' }}>{item.task}</div>
            <div style={{ fontSize: '13px', color: '#6B7280' }}>📅 {item.deadline}</div>
            <span style={{ padding: '3px 12px', borderRadius: '20px', backgroundColor: priorityColor(item.priority), color: 'white', fontSize: '11px', fontWeight: 'bold' }}>{item.priority}</span>
            <span style={{ padding: '3px 12px', borderRadius: '20px', backgroundColor: statusColor(item.status), color: 'white', fontSize: '11px', fontWeight: 'bold' }}>{item.status}</span>
          </div>
          <button onClick={() => remove(item.id)} style={{ padding: '6px 14px', background: '#FEE2E2', color: '#EF4444', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Delete</button>
        </div>
      ))}
      {list.length === 0 && <p style={{ color: '#9CA3AF', textAlign: 'center', marginTop: '40px' }}>No entries yet! Add one above 😊</p>}
    </div>
  );
}

export default Tasks;