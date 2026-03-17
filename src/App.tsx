import { useState, useOptimistic, startTransition } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import { useUsers } from './hooks/useUsers';
import type { User } from './types';
import './App.css';

function App() {
    const { users, loading, error, addUser, editUser, removeUser } = useUsers();
    const [optimisticUsers, applyOptimisticDelete] = useOptimistic(
        users,
        (state, deletedId: number) => state.filter(u => u.id !== deletedId)
    );

    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [showForm, setShowForm] = useState(false);

    const handleSaveUser = async (user: User) => {
        setShowForm(false);
        setEditingUser(null);
        if (user.id) {
            await editUser(user);
        } else {
            await addUser({ name: user.name, email: user.email });
        }
    };

    const handleDeleteUser = (id: number) => {
        startTransition(async () => {
            applyOptimisticDelete(id);
            await removeUser(id);
        });
    };

    const handleEditUser = (user: User) => {
        setEditingUser(user);
        setShowForm(true);
    };

    const handleAddUser = () => {
        setEditingUser(null);
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingUser(null);
    };

    return (
        <div className="app">
            <header className="app-header">
                <h1>User Management</h1>
            </header>
            <main className="app-main">
                {error && <div className="error-banner">{error}</div>}
                <div className="toolbar">
                    <button className="btn btn-primary" onClick={handleAddUser}>
                        + Add User
                    </button>
                </div>
                {showForm && (
                    <UserForm
                        key={editingUser?.id ?? 'new'}
                        user={editingUser}
                        onSave={handleSaveUser}
                        onCancel={handleCancel}
                    />
                )}
                {loading ? (
                    <p className="status-message">Loading users...</p>
                ) : (
                    <UserList
                        users={optimisticUsers}
                        onEdit={handleEditUser}
                        onDelete={handleDeleteUser}
                    />
                )}
            </main>
        </div>
    );
}

export default App;
