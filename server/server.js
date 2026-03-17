import express from 'express';

const app = express();
const PORT = 3001;

app.use(express.json());

// In-memory data store
let users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
];
let nextId = 3;

// GET /api/users — list all users
app.get('/api/users', (_req, res) => {
    res.json(users);
});

// POST /api/users — create a user
app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'name and email are required' });
    }
    const newUser = { id: nextId++, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT /api/users/:id — update a user
app.put('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name, email } = req.body;
    const index = users.findIndex(u => u.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    users[index] = { id, name, email };
    res.json(users[index]);
});

// DELETE /api/users/:id — delete a user
app.delete('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    users = users.filter(u => u.id !== id);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
