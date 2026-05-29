'use client';

import { useState } from 'react';
import { deletePost } from '@/lib/blog-actions';

export default function DeletePostButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = async () => {
    setShowModal(false);
    setIsDeleting(true);
    const formData = new FormData();
    formData.append('id', id);
    await deletePost(formData);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        disabled={isDeleting}
        className="text-red-500 hover:text-red-400 font-bold uppercase text-xs tracking-wide border border-red-900/50 hover:border-red-500 px-4 py-2 rounded transition-all disabled:opacity-50"
      >
        {isDeleting ? 'Deleting...' : 'Delete Post'}
      </button>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl p-6 max-w-sm w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-white text-lg font-bold mb-2">Delete Post</h2>
            <p className="text-zinc-400 text-sm mb-6">
              Are you sure you want to permanently delete this post? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-500 rounded transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-500 rounded transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
