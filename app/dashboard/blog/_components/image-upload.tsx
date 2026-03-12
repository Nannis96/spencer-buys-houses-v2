'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { getPresignedUrl } from '@/lib/s3-actions';
import Image from 'next/image';

export interface ImageFile {
  id?: string;
  url: string;
  altText?: string;
  title?: string;
  caption?: string;
  description?: string;
  file?: File;
}

interface ImageUploadProps {
  label: string;
  value: ImageFile[];
  onChange: (images: ImageFile[]) => void;
  multiple?: boolean;
  disableMetadata?: boolean;
}

export default function ImageUpload({
  label,
  value = [],
  onChange,
  multiple = false,
  disableMetadata = false,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [editingImage, setEditingImage] = useState<ImageFile | null>(null);
  const [editIndex, setEditIndex] = useState<number>(-1);

  // --- DROPZONE LOGIC ---
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setUploading(true);
      try {
        const newImages: ImageFile[] = [];

        for (const file of acceptedFiles) {
          const { signedUrl, publicUrl } = await getPresignedUrl(file.type, 'blog');
          
          await fetch(signedUrl, {
            method: 'PUT',
            body: file,
            headers: { 'Content-Type': file.type },
          });

          newImages.push({
            url: publicUrl,
            altText: '',
            title: '',
            caption: '',
            description: '',
          });
        }

        if (multiple) {
          onChange([...value, ...newImages]);
        } else {
          onChange([newImages[0]]);
        }
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Error uploading image');
      } finally {
        setUploading(false);
      }
    },
    [multiple, value, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple,
  });

  // --- HANDLERS ---
  const removeImage = (indexToRemove: number) => {
    const updated = value.filter((_, i) => i !== indexToRemove);
    onChange(updated);
  };

  const openEditModal = (img: ImageFile, index: number) => {
    setEditingImage({ ...img });
    setEditIndex(index);
  };

  const saveMetadata = () => {
    if (editingImage && editIndex > -1) {
      const updatedList = [...value];
      updatedList[editIndex] = editingImage;
      onChange(updatedList);
      setEditingImage(null);
      setEditIndex(-1);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-xs font-bold leading-6 text-[#f8ed1a] uppercase">
        {label}
      </label>

      {/* GRID DE IMÁGENES */}
      <div className="flex flex-wrap gap-4">
        {value.map((img, i) => (
          <div
            key={i}
            className="relative w-28 h-28 rounded-lg overflow-hidden border border-gray-700 group bg-gray-900 shadow-md"
          >
            {img.url ? (
              <Image
                src={img.url}
                alt={img.altText || 'Image'}
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                No Img
              </div>
            )}

            {/* CONTROL OVERLAY (Hidden by default, shown on hover) */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              {/* BOTÓN ELIMINAR */}
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="bg-red-600 hover:bg-red-500 text-white p-2 rounded-full shadow-lg transform transition-transform hover:scale-110"
                title="Remove"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>

              {/* BOTÓN EDITAR */}
              {!disableMetadata && (
                <button
                  type="button"
                  onClick={() => openEditModal(img, i)}
                  className="bg-[#f8ed1a] hover:bg-white text-black p-2 rounded-full shadow-lg transform transition-transform hover:scale-110"
                  title="Edit Metadata"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                  </svg>
                </button>
              )}
            </div>

            {/* ALERTA MISSING ALT */}
            {!disableMetadata && !img.altText && (
              <div className="absolute bottom-0 w-full bg-red-600/80 text-[8px] text-center text-white font-black py-0.5 tracking-tighter">
                NO ALT TEXT
              </div>
            )}
          </div>
        ))}
      </div>

      {/* DROPZONE */}
      {(!multiple && value.length === 0) || multiple ? (
        <div
          {...getRootProps()}
          className={`
            mt-2 flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 cursor-pointer transition-all duration-200
            ${
              isDragActive
                ? 'border-[#529e14] bg-[#529e14]/5 scale-[0.98]'
                : 'border-gray-700 hover:border-[#f8ed1a] bg-gray-800/50 hover:bg-gray-800'
            }
          `}
        >
          <input {...getInputProps()} />
          <div className="text-center">
            {uploading ? (
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-4 border-[#f8ed1a] border-t-transparent rounded-full animate-spin"></div>
                <div className="text-[#f8ed1a] font-black uppercase text-xs tracking-widest">
                  Uploading to S3...
                </div>
              </div>
            ) : (
              <>
                <div className="text-3xl mb-3 opacity-30">📁</div>
                <p className="text-sm font-bold text-gray-300 uppercase tracking-wide">
                  {isDragActive ? 'Drop image here' : 'Drop or Click to Upload'}
                </p>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-tighter">
                  SVG, PNG, JPG or WEBP (MAX. 5MB)
                </p>
              </>
            )}
          </div>
        </div>
      ) : null}

      {/* --- MODAL DE EDICIÓN --- */}
      {editingImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#222222]">
              <h3 className="text-white font-black uppercase text-xs tracking-widest">
                Image Optimization & Metadata
              </h3>
              <button
                onClick={() => setEditingImage(null)}
                className="text-gray-500 hover:text-white transition-colors p-2"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {/* Preview */}
              <div className="flex justify-center">
                <div className="relative w-40 h-40 rounded-xl bg-gray-900 border border-gray-800 shadow-inner overflow-hidden">
                  <Image
                    src={editingImage.url}
                    alt="Preview"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Metadata Inputs */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-[#f8ed1a] uppercase mb-1.5 tracking-widest">
                    Alt Text (Critical for SEO & Accessibility)
                  </label>
                  <input
                    type="text"
                    className="w-full bg-[#111111] border border-gray-800 rounded-lg p-3 text-white text-sm focus:border-[#f8ed1a] outline-none transition-colors"
                    value={editingImage.altText || ''}
                    onChange={(e) =>
                      setEditingImage({ ...editingImage, altText: e.target.value })
                    }
                    placeholder="Describe what is in the image..."
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase mb-1.5 tracking-widest">
                    Image Title
                  </label>
                  <input
                    type="text"
                    className="w-full bg-[#111111] border border-gray-800 rounded-lg p-3 text-white text-sm focus:border-[#f8ed1a] outline-none"
                    value={editingImage.title || ''}
                    onChange={(e) =>
                      setEditingImage({ ...editingImage, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase mb-1.5 tracking-widest">
                    Caption (Visible under image)
                  </label>
                  <textarea
                    rows={2}
                    className="w-full bg-[#111111] border border-gray-800 rounded-lg p-3 text-white text-sm focus:border-[#f8ed1a] outline-none"
                    value={editingImage.caption || ''}
                    onChange={(e) =>
                      setEditingImage({ ...editingImage, caption: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-800 bg-[#222222] flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingImage(null)}
                className="px-6 py-2 text-xs font-black text-gray-500 hover:text-white uppercase tracking-widest transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveMetadata}
                className="px-6 py-2 text-xs font-black bg-[#529e14] text-white rounded-lg hover:bg-[#458510] uppercase tracking-widest shadow-lg transition-all active:scale-95"
              >
                Save Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
