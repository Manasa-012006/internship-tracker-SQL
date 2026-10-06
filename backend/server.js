const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.log('MySQL Connection Error:', err);
  } else {
    console.log('MySQL Connected!');
  }
});

// ========== INTERNSHIPS ==========
app.post('/internships', (req, res) => {
  const { company, role, status, notes } = req.body;
  db.query('INSERT INTO internships (company, role, status, notes) VALUES (?, ?, ?, ?)',
    [company, role, status, notes], (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, company, role, status, notes });
    });
});

app.get('/internships', (req, res) => {
  db.query('SELECT * FROM internships', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.put('/internships/:id', (req, res) => {
  const { company, role, status, notes } = req.body;
  db.query('UPDATE internships SET company=?, role=?, status=?, notes=? WHERE id=?',
    [company, role, status, notes, req.params.id], (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Updated successfully' });
    });
});

app.delete('/internships/:id', (req, res) => {
  db.query('DELETE FROM internships WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Deleted successfully' });
  });
});

// ========== COMPANIES ==========
app.post('/companies', (req, res) => {
  const { name, location, domain, website } = req.body;
  db.query('INSERT INTO companies (name, location, domain, website) VALUES (?, ?, ?, ?)',
    [name, location, domain, website], (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, name, location, domain, website });
    });
});

app.get('/companies', (req, res) => {
  db.query('SELECT * FROM companies', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.put('/companies/:id', (req, res) => {
  const { name, location, domain, website } = req.body;
  db.query('UPDATE companies SET name=?, location=?, domain=?, website=? WHERE id=?',
    [name, location, domain, website, req.params.id], (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Updated successfully' });
    });
});

app.delete('/companies/:id', (req, res) => {
  db.query('DELETE FROM companies WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Deleted successfully' });
  });
});

// ========== SKILLS ==========
app.post('/skills', (req, res) => {
  const { name, level, category } = req.body;
  db.query('INSERT INTO skills (name, level, category) VALUES (?, ?, ?)',
    [name, level, category], (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, name, level, category });
    });
});

app.get('/skills', (req, res) => {
  db.query('SELECT * FROM skills', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.put('/skills/:id', (req, res) => {
  const { name, level, category } = req.body;
  db.query('UPDATE skills SET name=?, level=?, category=? WHERE id=?',
    [name, level, category, req.params.id], (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Updated successfully' });
    });
});

app.delete('/skills/:id', (req, res) => {
  db.query('DELETE FROM skills WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Deleted successfully' });
  });
});

// ========== CONTACTS ==========
app.post('/contacts', (req, res) => {
  const { personName, company, email, linkedin } = req.body;
  db.query('INSERT INTO contacts (person_name, company, email, linkedin) VALUES (?, ?, ?, ?)',
    [personName, company, email, linkedin], (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, personName, company, email, linkedin });
    });
});

app.get('/contacts', (req, res) => {
  db.query('SELECT * FROM contacts', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results.map(r => ({ ...r, personName: r.person_name })));
  });
});

app.put('/contacts/:id', (req, res) => {
  const { personName, company, email, linkedin } = req.body;
  db.query('UPDATE contacts SET person_name=?, company=?, email=?, linkedin=? WHERE id=?',
    [personName, company, email, linkedin, req.params.id], (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Updated successfully' });
    });
});

app.delete('/contacts/:id', (req, res) => {
  db.query('DELETE FROM contacts WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Deleted successfully' });
  });
});

// ========== TASKS ==========
app.post('/tasks', (req, res) => {
  const { task, deadline, priority, status } = req.body;
  db.query('INSERT INTO tasks (task, deadline, priority, status) VALUES (?, ?, ?, ?)',
    [task, deadline, priority, status], (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, task, deadline, priority, status });
    });
});

app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.put('/tasks/:id', (req, res) => {
  const { task, deadline, priority, status } = req.body;
  db.query('UPDATE tasks SET task=?, deadline=?, priority=?, status=? WHERE id=?',
    [task, deadline, priority, status, req.params.id], (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Updated successfully' });
    });
});

app.delete('/tasks/:id', (req, res) => {
  db.query('DELETE FROM tasks WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Deleted successfully' });
  });
});

app.listen(5001, () => console.log('Server running on port 5001'));