interface User {
    id: number;
    name: string;
    email: string;
}

export async function fetchUsers(): Promise<User[]> {
    try {
        const response = await fetch('https://unexisting-api.example.com/users'); // Replace with your API URL
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: User[] = await response.json();
        return result;
    } catch (e) {
        if (e instanceof Error) {
            throw e;
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}

export async function createUser(user: Omit<User, 'id'>): Promise<User> {
    try {
        const response = await fetch('https://unexisting-api.example.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: User = await response.json();
        return result;
    } catch (e) {
        if (e instanceof Error) {
            throw e;
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}

export async function deleteUser(id: number): Promise<void> {
    try {
        const response = await fetch(`https://unexisting-api.example.com/users/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (e) {
        if (e instanceof Error) {
            throw e;
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}