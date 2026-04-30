import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    const services = await prisma.service.findMany({
        where: { status: 'published' },
        select: { slug: true, title: true, category: true },
        orderBy: { title: 'asc' },
    });
    return NextResponse.json(services);
}
