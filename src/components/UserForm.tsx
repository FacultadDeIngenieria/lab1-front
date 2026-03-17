import { useActionState } from 'react';
import type { User } from '../types';

interface UserFormProps {
    user: User | null;
    onSave: (user: User) => Promise<void>;
    onCancel: () => void;
}

function UserForm({ user, onSave, onCancel }: UserFormProps) {
    const [error, formAction, isPending] = useActionState(
        async (_prev: string | null, formData: FormData) => {
            const name = formData.get('name') as string;
            const email = formData.get('email') as string;
            try {
                await onSave({ id: user?.id ?? 0, name, email });
                return null;
            } catch (e) {
                return e instanceof Error ? e.message : 'Failed to save user';
            }
        },
        null
    );

    return (
        <form className="user-form" action={formAction}>
            <h2>{user ? 'Edit User' : 'Add User'}</h2>
            {error && <p className="form-error">{error}</p>}
            <div className="form-field">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={user?.name ?? ''}
                    placeholder="Full name"
                    required
                />
            </div>
            <div className="form-field">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={user?.email ?? ''}
                    placeholder="email@example.com"
                    required
                />
            </div>
            <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={isPending}>
                    {isPending ? 'Saving…' : 'Save'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={isPending}>
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default UserForm;
