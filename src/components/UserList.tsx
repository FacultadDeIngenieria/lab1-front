import type { User } from '../types';

interface UserListProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (id: number) => void;
}

function UserList({ users, onEdit, onDelete }: UserListProps) {
    if (users.length === 0) {
        return <p className="status-message">No users yet. Add one to get started!</p>;
    }

    return (
        <div className="user-list">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td className="actions-cell">
                                <button className="btn btn-secondary" onClick={() => onEdit(user)}>
                                    Edit
                                </button>
                                <button className="btn btn-danger" onClick={() => onDelete(user.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;
