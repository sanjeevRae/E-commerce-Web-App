'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Boxes, CalendarDays, PackageCheck, ReceiptText, Search, ShoppingBag, Users } from 'lucide-react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type OrderItem = {
  id?: string;
  name?: string;
  price?: number;
  image?: string;
  category?: string;
  quantity?: number;
  selectedSize?: string;
};

type Order = {
  id: string;
  user?: { id?: string; name?: string; email?: string; phone?: string };
  items?: OrderItem[];
  subtotal?: number;
  discount?: number;
  deliveryFee?: number;
  deliveryLabel?: string;
  total?: number;
  paymentMethod?: string;
  status?: string;
  shippingAddress?: Record<string, string>;
  createdAt?: string;
};

type ProductStat = {
  id: string;
  name: string;
  image: string;
  category: string;
  quantity: number;
  revenue: number;
};

const statusLabels: Record<string, string> = {
  pending_cod: 'Pending COD',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

function money(value?: number) {
  return `Rs. ${Number(value || 0).toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
}

function dateLabel(value?: string) {
  if (!value) return 'Unknown date';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function fullDate(value?: string) {
  if (!value) return 'Unknown date';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
}

function orderQuantity(order: Order) {
  return (order.items ?? []).reduce((sum, item) => sum + Number(item.quantity || 0), 0);
}

function dailySeries(orders: Order[]) {
  const byDay = new Map<string, { date: string; orders: number; revenue: number }>();
  orders.forEach(order => {
    const key = dateLabel(order.createdAt);
    const current = byDay.get(key) ?? { date: key, orders: 0, revenue: 0 };
    current.orders += 1;
    current.revenue += Number(order.total || 0);
    byDay.set(key, current);
  });
  return Array.from(byDay.values()).slice(-14);
}

function productStats(orders: Order[]) {
  const stats = new Map<string, ProductStat>();
  orders.forEach(order => {
    (order.items ?? []).forEach(item => {
      const id = String(item.id || item.name || 'unknown');
      const current = stats.get(id) ?? {
        id,
        name: String(item.name || 'Unnamed product'),
        image: String(item.image || ''),
        category: String(item.category || 'General'),
        quantity: 0,
        revenue: 0,
      };
      const quantity = Number(item.quantity || 0);
      current.quantity += quantity;
      current.revenue += Number(item.price || 0) * quantity;
      stats.set(id, current);
    });
  });
  return Array.from(stats.values()).sort((a, b) => b.revenue - a.revenue);
}

function categoryStats(products: ProductStat[]) {
  const stats = new Map<string, { name: string; value: number }>();
  products.forEach(product => {
    const current = stats.get(product.category) ?? { name: product.category, value: 0 };
    current.value += product.revenue;
    stats.set(product.category, current);
  });
  return Array.from(stats.values()).sort((a, b) => b.value - a.value).slice(0, 5);
}

export default function InsightDashboard({ token }: { token: string }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('Loading orders...');

  const load = useCallback(async () => {
    setStatus('Loading orders...');
    const response = await fetch('/api/admin/orders', { headers: { 'x-admin-token': token } });
    const data = await response.json().catch(() => ({}));
    setOrders(data.orders ?? []);
    setStatus(response.ok ? '' : data.error || 'Could not load orders.');
  }, [token]);

  useEffect(() => { void load(); }, [load]);

  const filteredOrders = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return orders;
    return orders.filter(order => [
      order.id,
      order.status,
      order.user?.name,
      order.user?.email,
      order.user?.phone,
      order.shippingAddress?.city,
      ...(order.items ?? []).map(item => item.name),
    ].filter(Boolean).join(' ').toLowerCase().includes(term));
  }, [orders, query]);

  const metrics = useMemo(() => {
    const revenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
    const quantity = orders.reduce((sum, order) => sum + orderQuantity(order), 0);
    const customers = new Set(orders.map(order => order.user?.id || order.user?.email || order.shippingAddress?.phone).filter(Boolean)).size;
    const pending = orders.filter(order => order.status === 'pending_cod').length;
    return { revenue, quantity, customers, pending };
  }, [orders]);

  const series = useMemo(() => dailySeries(orders), [orders]);
  const products = useMemo(() => productStats(orders), [orders]);
  const categories = useMemo(() => categoryStats(products), [products]);
  const maxOrders = Math.max(...series.map(item => item.orders), 1);
  const bestDay = series.reduce((best, item) => item.orders > best.orders ? item : best, { date: 'No data', orders: 0, revenue: 0 });

  return (
    <section className="overflow-hidden border border-[#e0dbd4] bg-white shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
      <div className="border-b border-[#eee8e1] bg-[#fbfaf8] p-5 md:p-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8f1f35]">View insight</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Orders and analytics</h1>
            <p className="mt-2 text-sm text-[#666]">Track COD orders, product quantities, revenue, customer activity, and best-selling products.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href={`/admin?token=${encodeURIComponent(token)}`} className="border border-[#ded8d0] bg-white px-4 py-2 text-sm font-semibold hover:border-[#111]">Back to admin</Link>
            <Link href="/main-product" className="bg-[#111] px-4 py-2 text-sm font-semibold text-white">View shop</Link>
          </div>
        </div>
      </div>

      <div className="grid gap-4 bg-[#f5f2ee] p-5 md:grid-cols-2 md:p-7 xl:grid-cols-4">
        {[
          { label: 'Total revenue', value: money(metrics.revenue), helper: `${orders.length} orders`, icon: ReceiptText },
          { label: 'Products sold', value: metrics.quantity.toLocaleString(), helper: 'Total item quantity', icon: Boxes },
          { label: 'Customers', value: metrics.customers.toLocaleString(), helper: 'Unique buyers', icon: Users },
          { label: 'Pending COD', value: metrics.pending.toLocaleString(), helper: 'Needs follow-up', icon: PackageCheck },
        ].map(item => (
          <article key={item.label} className="border border-[#e4ded6] bg-white p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-[#555]">{item.label}</p>
                <p className="mt-3 text-2xl font-semibold tracking-tight">{item.value}</p>
                <p className="mt-1 text-xs text-[#777]">{item.helper}</p>
              </div>
              <span className="grid h-10 w-10 place-items-center bg-[#f1ede7] text-[#8f1f35]"><item.icon size={18} /></span>
            </div>
          </article>
        ))}
      </div>

      <div className="grid gap-5 p-5 md:p-7 xl:grid-cols-[minmax(0,1.4fr)_minmax(340px,0.6fr)]">
        <article className="border border-[#eee8e1] bg-white p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8f1f35]">Analytics</p>
              <h2 className="mt-1 text-xl font-semibold">Revenue trend</h2>
            </div>
            <span className="inline-flex items-center gap-1 bg-[#ecfdf3] px-3 py-1 text-xs font-semibold text-[#166534]"><ArrowUpRight size={14} /> Live from orders</span>
          </div>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series}>
                <defs>
                  <linearGradient id="revenue" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#1f6feb" stopOpacity={0.34} />
                    <stop offset="95%" stopColor="#1f6feb" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#eee8e1" vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fill: '#777', fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#777', fontSize: 12 }} />
                <Tooltip formatter={(value: number) => money(value)} contentStyle={{ border: '1px solid #e0dbd4', borderRadius: 0 }} />
                <Area type="monotone" dataKey="revenue" stroke="#1f6feb" strokeWidth={3} fill="url(#revenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="border border-[#eee8e1] bg-white p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8f1f35]">Most active day</p>
              <h2 className="mt-1 text-xl font-semibold">{bestDay.date}</h2>
              <p className="mt-1 text-sm text-[#666]">{bestDay.orders} orders, {money(bestDay.revenue)}</p>
            </div>
            <CalendarDays className="text-[#8f1f35]" size={20} />
          </div>
          <div className="mt-6 flex h-56 items-end gap-3">
            {series.map(item => (
              <div key={item.date} className="flex min-w-0 flex-1 flex-col items-center gap-2">
                <div className="flex h-44 w-full items-end bg-[#f1ede7]">
                  <div className="w-full bg-[#1f6feb]" style={{ height: `${Math.max(8, (item.orders / maxOrders) * 100)}%` }} />
                </div>
                <span className="max-w-full truncate text-xs text-[#777]">{item.date}</span>
              </div>
            ))}
          </div>
        </article>
      </div>

      <div className="grid gap-5 px-5 pb-5 md:px-7 md:pb-7 xl:grid-cols-[minmax(0,1fr)_390px]">
        <article className="border border-[#eee8e1] bg-white p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8f1f35]">Order management</p>
              <h2 className="mt-1 text-xl font-semibold">Checkout orders</h2>
            </div>
            <label className="flex h-11 items-center gap-2 border border-[#ded8d0] bg-[#fbfaf8] px-3 text-sm">
              <Search size={16} className="text-[#777]" />
              <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search orders..." className="h-full min-w-0 bg-transparent outline-none" />
            </label>
          </div>
          <p className="mt-3 text-sm text-[#666]">{status || `${filteredOrders.length} orders shown`}</p>

          <div className="mt-5 overflow-x-auto border border-[#eee8e1]">
            <table className="w-full min-w-[980px] border-collapse text-left text-sm">
              <thead className="bg-[#111] text-white">
                <tr>
                  <th className="px-4 py-3 font-semibold">Order</th>
                  <th className="px-4 py-3 font-semibold">Customer</th>
                  <th className="px-4 py-3 font-semibold">Products</th>
                  <th className="px-4 py-3 font-semibold">Quantity</th>
                  <th className="px-4 py-3 font-semibold">Total</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Delivery</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order.id} className="border-b border-[#eee8e1] align-top last:border-b-0 hover:bg-[#faf8f5]">
                    <td className="px-4 py-4"><p className="font-semibold">{order.id}</p><p className="mt-1 text-xs text-[#777]">{fullDate(order.createdAt)}</p></td>
                    <td className="px-4 py-4"><p className="font-semibold">{order.user?.name || order.shippingAddress?.fullName || 'Customer'}</p><p className="mt-1 text-xs text-[#777]">{order.user?.email || order.shippingAddress?.email || order.user?.phone || order.shippingAddress?.phone || '-'}</p></td>
                    <td className="px-4 py-4">
                      <div className="grid gap-2">
                        {(order.items ?? []).map(item => (
                          <div key={`${order.id}-${item.id}-${item.selectedSize}`} className="flex items-center gap-3">
                            {item.image ? <img src={item.image} alt="" className="h-10 w-10 bg-[#eee9e2] object-cover" /> : <span className="grid h-10 w-10 place-items-center bg-[#eee9e2]"><ShoppingBag size={15} /></span>}
                            <span className="min-w-0"><span className="block truncate font-medium">{item.name || 'Product'}</span><span className="block text-xs text-[#777]">{item.category || '-'}{item.selectedSize ? ` / Size ${item.selectedSize}` : ''} x {item.quantity || 0}</span></span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4 font-semibold">{orderQuantity(order)}</td>
                    <td className="px-4 py-4 font-semibold">{money(order.total)}</td>
                    <td className="px-4 py-4"><span className="bg-[#fef3c7] px-2 py-1 text-xs font-semibold text-[#92400e]">{statusLabels[order.status || ''] || order.status || 'Pending'}</span></td>
                    <td className="px-4 py-4"><p>{order.deliveryLabel || 'Delivery'}</p><p className="mt-1 text-xs text-[#777]">{order.shippingAddress?.city || '-'}{order.shippingAddress?.area ? `, ${order.shippingAddress.area}` : ''}</p></td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr><td colSpan={7} className="px-4 py-12 text-center text-[#777]">No orders found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </article>

        <div className="grid gap-5">
          <article className="border border-[#eee8e1] bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8f1f35]">Best selling products</p>
            <div className="mt-4 grid gap-4">
              {products.slice(0, 5).map(product => (
                <div key={product.id} className="grid grid-cols-[48px_1fr_auto] items-center gap-3">
                  {product.image ? <img src={product.image} alt="" className="h-12 w-12 bg-[#eee9e2] object-cover" /> : <span className="h-12 w-12 bg-[#eee9e2]" />}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{product.name}</p>
                    <p className="mt-1 text-xs text-[#777]">{product.quantity} sold</p>
                  </div>
                  <p className="text-sm font-semibold">{money(product.revenue)}</p>
                </div>
              ))}
              {products.length === 0 && <p className="border border-dashed border-[#ded8d0] p-5 text-sm text-[#777]">Best sellers appear after checkout orders are placed.</p>}
            </div>
          </article>

          <article className="border border-[#eee8e1] bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8f1f35]">Category revenue</p>
            <div className="mt-4 h-60">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categories} dataKey="value" nameKey="name" innerRadius={54} outerRadius={88} paddingAngle={3}>
                    {categories.map((item, index) => <Cell key={item.name} fill={['#1f6feb', '#16a34a', '#f97316', '#8f1f35', '#111111'][index % 5]} />)}
                  </Pie>
                  <Tooltip formatter={(value: number) => money(value)} contentStyle={{ border: '1px solid #e0dbd4', borderRadius: 0 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="border border-[#eee8e1] bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8f1f35]">Order volume</p>
            <div className="mt-4 h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={series}>
                  <CartesianGrid stroke="#eee8e1" vertical={false} />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fill: '#777', fontSize: 11 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: '#777', fontSize: 11 }} />
                  <Tooltip contentStyle={{ border: '1px solid #e0dbd4', borderRadius: 0 }} />
                  <Bar dataKey="orders" fill="#16a34a" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
