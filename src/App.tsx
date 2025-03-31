import React, { useState } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import './App.css';

interface User {
    id: number;
    name: string;
    email: string;
}

function App() {
    const [users, setUsers] = useState<User[]>([
        { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
    ]);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [showForm, setShowForm] = useState(false);

    const handleAddUser = () => {
        setEditingUser(null);
        setShowForm(true);
    };

    const handleEditUser = (user: User) => {
        setEditingUser(user);
        setShowForm(true);
    };

    const handleDeleteUser = (id: number) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    const handleSaveUser = (user: User) => {
        if (user.id) {
            setUsers(users.map((u) => (u.id === user.id ? user : u)));
        } else {
            const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1
            setUsers([...users, { ...user, id: newId }]);
        }
        setShowForm(false);
        setEditingUser(null);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingUser(null);
    };

    return (
        <div className="App">
            <header className="App-header">
                <button onClick={handleAddUser}>Add User</button>
                {showForm && (
                    <UserForm
                        user={editingUser}
                        onSave={handleSaveUser}
                        onCancel={handleCancel}
                    />
                )}
                <UserList users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
            </header>
        </div>
    );
}

export default App;