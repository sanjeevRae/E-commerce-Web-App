import { NextResponse, type NextRequest } from 'next/server';
import { assertAdmin } from '@/lib/adminAuth';
import { listDocuments } from '@/lib/firestoreAdmin';

export async function GET(request: NextRequest) {
  const denied = assertAdmin(request);
  if (denied) return denied;

  try {
    const orders = await listDocuments('orders');
    orders.sort((a, b) => new Date(String(b.createdAt || 0)).getTime() - new Date(String(a.createdAt || 0)).getTime());
    return NextResponse.json({ orders });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Could not load orders.' }, { status: 500 });
  }
}
