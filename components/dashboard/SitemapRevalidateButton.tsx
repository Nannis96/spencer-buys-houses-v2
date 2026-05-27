'use client';

import { useActionState, useEffect, useRef } from 'react';
import { RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { revalidateSitemap, type RevalidateResult } from '@/lib/sitemap-actions';

const initialState: RevalidateResult | null = null;

function formatDateTime(iso: string) {
    const d = new Date(iso);
    return d.toLocaleString('en-US', {
        month: 'short', day: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
    });
}

async function wrappedAction(_prev: RevalidateResult | null): Promise<RevalidateResult> {
    return revalidateSitemap();
}

export function SitemapRevalidateButton() {
    const [result, formAction, isPending] = useActionState(wrappedAction, initialState);
    const prevPendingRef = useRef(false);

    // detect transition from pending → done
    const justFinished = prevPendingRef.current && !isPending;
    useEffect(() => {
        prevPendingRef.current = isPending;
    });

    return (
        <div className="space-y-4">
            <form action={formAction}>
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-bold uppercase tracking-wide bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 text-black disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-[var(--color-primary)]/30 hover:-translate-y-0.5 transform"
                >
                    <RefreshCw className={`h-5 w-5 ${isPending ? 'animate-spin' : ''}`} />
                    {isPending ? 'Regenerating…' : 'Regenerate Sitemap'}
                </button>
            </form>

            {/* Status feedback */}
            {result && justFinished && (
                result.success ? (
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/40 text-sm">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 shrink-0" />
                        <div>
                            <p className="font-semibold text-green-400">Sitemap queued for regeneration</p>
                            <p className="text-gray-400 text-xs mt-0.5">
                                Next request to <code className="text-gray-300">/sitemap.xml</code> will include updated content.
                            </p>
                            <p className="text-gray-500 text-xs mt-1">Triggered at {formatDateTime(result.revalidatedAt)}</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/40 text-sm">
                        <XCircle className="h-5 w-5 text-red-400 mt-0.5 shrink-0" />
                        <div>
                            <p className="font-semibold text-red-400">Revalidation failed</p>
                            {result.error && <p className="text-gray-400 text-xs mt-0.5">{result.error}</p>}
                        </div>
                    </div>
                )
            )}

            {/* Persistent last result after dismiss */}
            {result && !justFinished && result.success && (
                <p className="text-xs text-gray-500 text-center">
                    Last triggered: {formatDateTime(result.revalidatedAt)}
                </p>
            )}
        </div>
    );
}
