import { useEffect, useState } from "react";
import { adminListOrders, adminSetOrderStatus } from "../../api/orders";


export default function OrdersPage(){
const [orders, setOrders] = useState([]);
const load = async ()=>{ const r = await adminListOrders(); setOrders(r.data); };
useEffect(()=>{ load(); },[]);
const setStatus = async (id, status)=>{ await adminSetOrderStatus(id, status); load(); };


return (
<div className="space-y-4">
<h1 className="text-2xl font-semibold">Admin • Orders</h1>
{orders.map(o=> (
<div key={o.id} className="card p-4 flex items-start justify-between gap-4">
<div>
<div className="font-medium">#{o.id} • <span className="capitalize">{o.status}</span></div>
<div className="text-sm text-gray-500">{(o.total_cents/100).toFixed(2)} {o.currency}</div>
{o.address && <div className="text-sm">📍 {o.address}</div>}
{o.phone && <div className="text-sm">📞 {o.phone}</div>}
{o.note && <div className="text-sm">📝 {o.note}</div>}
</div>
<div className="flex flex-wrap gap-2">
{['pending','paid','delivered','canceled'].map(s=> (
<button key={s} onClick={()=>setStatus(o.id, s)} className="px-3 py-1 rounded border">{s}</button>
))}
</div>
</div>
))}
</div>
);
}