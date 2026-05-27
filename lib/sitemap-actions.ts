'use server';

import { revalidatePath } from 'next/cache';

export interface RevalidateResult {
    success: boolean;
    revalidatedAt: string;
    error?: string;
}

export async function revalidateSitemap(): Promise<RevalidateResult> {
    try {
        revalidatePath('/sitemap.xml');
        return { success: true, revalidatedAt: new Date().toISOString() };
    } catch (err) {
        return {
            success: false,
            revalidatedAt: new Date().toISOString(),
            error: err instanceof Error ? err.message : 'Unknown error',
        };
    }
}
