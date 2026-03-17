import { useState, useEffect, useCallback } from 'react';
import { fetchUsers, createUser, updateUser, deleteUser } from '../api/user';
import type { User } from '../types';

export function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadUsers = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchUsers();
            setUsers(data);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Failed to load users');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    const addUser = async (user: Omit<User, 'id'>) => {
        const newUser = await createUser(user);
        setUsers(prev => [...prev, newUser]);
    };

    const editUser = async (user: User) => {
        const updated = await updateUser(user);
        setUsers(prev => prev.map(u => (u.id === updated.id ? updated : u)));
    };

    const removeUser = async (id: number) => {
        await deleteUser(id);
        setUsers(prev => prev.filter(u => u.id !== id));
    };

    return { users, loading, error, addUser, editUser, removeUser };
}
