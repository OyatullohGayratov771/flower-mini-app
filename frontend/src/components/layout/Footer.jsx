export default function Footer(){
return (
<footer className="mt-10 border-t border-rose-100">
<div className="max-w-7xl mx-auto px-4 py-8 text-sm text-gray-500 flex items-center justify-between">
<p>© {new Date().getFullYear()} Bloom Flowers. All rights reserved.</p>
<p className="text-gray-400">Made with ♥</p>
</div>
</footer>
);
}