import { useState } from 'react';
import Internships from './pages/Internships';
import Companies from './pages/Companies';
import Skills from './pages/Skills';
import Contacts from './pages/Contacts';
import Tasks from './pages/Tasks';

function App() {
  const [page, setPage] = useState('internships');

  const pages = [
    { key: 'internships', label: '📋 Internships' },
    { key: 'companies', label: '🏢 Companies' },
    { key: 'skills', label: '💡 Skills' },
    { key: 'contacts', label: '👤 Contacts' },
    { key: 'tasks', label: '✅ Tasks' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F0FDFA', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{
        background: 'linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)',
        padding: '20px 30px',
        boxShadow: '0 4px 15px rgba(13, 148, 136, 0.3)'
      }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '26px', letterSpacing: '1px' }}>
          🎯 Internship Tracker
        </h1>
        <p style={{ color: '#CCFBF1', margin: '4px 0 16px', fontSize: '13px' }}>
          AI & DS Department — DBMS Project
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {pages.map(p => (
            <button
              key={p.key}
              onClick={() => setPage(p.key)}
              style={{
                padding: '8px 18px',
                borderRadius: '25px',
                border: page === p.key ? '2px solid white' : '2px solid rgba(255,255,255,0.3)',
                backgroundColor: page === p.key ? 'white' : 'transparent',
                color: page === p.key ? '#0D9488' : 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '13px',
                transition: 'all 0.2s'
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: '25px 30px' }}>
        {page === 'internships' && <Internships />}
        {page === 'companies' && <Companies />}
        {page === 'skills' && <Skills />}
        {page === 'contacts' && <Contacts />}
        {page === 'tasks' && <Tasks />}
      </div>
    </div>
  );
}

export default App;