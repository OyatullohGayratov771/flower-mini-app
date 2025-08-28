import ProductCard from "./ProductCard";

export default function ProductList({ items }){
if(!items?.length) return <p className="text-gray-500">No products.</p>;
return (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
{items.map((p)=> <ProductCard key={p.ID} p={p} />)}
</div>
);
}