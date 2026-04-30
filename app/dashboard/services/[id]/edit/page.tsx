import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import EditServiceForm from '../../_components/edit-service-form';

export default async function EditServicePage(props: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await props.params;

    const service = await prisma.service.findUnique({ where: { id } });

    if (!service) {
        notFound();
    }

    return (
        <div className="max-w-5xl mx-auto">

            {/* ── Header ── */}
            <div className="flex items-center justify-between mb-10 border-b border-gray-800 pb-6">
                <div>
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">
                        <Link href="/dashboard" className="hover:text-white transition-colors">
                            Dashboard
                        </Link>
                        <span>/</span>
                        <Link href="/dashboard/services" className="hover:text-white transition-colors">
                            Services
                        </Link>
                        <span>/</span>
                        <span className="text-[#f8ed1a]">Edit</span>
                    </div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight">
                        Edit Service
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Modifying:{' '}
                        <span className="text-[#f8ed1a] font-bold">{service.title}</span>
                    </p>
                </div>
                <Link
                    href="/dashboard/services"
                    className="inline-flex items-center rounded-lg bg-white/5 border border-gray-600 px-4 py-2 text-sm font-bold text-gray-300 shadow-sm hover:bg-white/10 hover:text-white transition-colors"
                >
                    ← Back to List
                </Link>
            </div>

            {/* ── Form ── */}
            <div className="relative">
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#f8ed1a] opacity-5 rounded-full blur-3xl pointer-events-none" />
                <EditServiceForm service={service} />
            </div>
        </div>
    );
}
