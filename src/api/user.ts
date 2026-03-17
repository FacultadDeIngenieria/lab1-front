import type { User } from '../types';

const BASE_URL = '/api/users';

export async function fetchUsers(): Promise<User[]> {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error(`Failed to fetch users: ${response.status}`);
    return response.json();
}

export async function createUser(user: Omit<User, 'id'>): Promise<User> {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error(`Failed to create user: ${response.status}`);
    return response.json();
}

export async function updateUser(user: User): Promise<User> {
    const response = await fetch(`${BASE_URL}/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error(`Failed to update user: ${response.status}`);
    return response.json();
}

export async function deleteUser(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error(`Failed to delete user: ${response.status}`);
}
