'use client';

import { useState } from 'react';
import { deleteService } from '@/lib/service-actions';

export default function DeleteServiceButton({ id }: { id: string }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        const confirmed = window.confirm(
            'Are you sure you want to permanently delete this service? This action cannot be undone.'
        );

        if (confirmed) {
            setIsDeleting(true);
            const formData = new FormData();
            formData.append('id', id);
            await deleteService(formData);
        }
    };

    return (
        <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-500 hover:text-red-400 font-bold uppercase text-xs tracking-wide border border-red-900/50 hover:border-red-500 px-4 py-2 rounded transition-all disabled:opacity-50"
        >
            {isDeleting ? 'Deleting...' : 'Delete Service'}
        </button>
    );
}
