"use client"
import { useEffect, useState } from "react";
import { GetAllProducts } from "../../actions/product.actions";
import { Home, ChevronRight, Package, Loader2 } from "lucide-react";
import ProductCard from "@/app/_componant/ProductCard/ProductCard";
import Link from "next/link";

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await GetAllProducts();
      setProducts(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-[#22c55e]" size={40} />
      <p className="text-gray-500 font-bold">Loading Store...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Green Header Banner */}
      <div className="bg-[#22c55e] text-white pt-8 pb-16 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 text-xs text-green-100 mb-8 opacity-90">
            <Link href="/" className="hover:text-white transition-all flex items-center gap-1">
              <Home size={14} /> Home
            </Link>
            <ChevronRight size={12} />
            <span className="font-bold text-white">All Products</span>
          </nav>

          <div className="flex items-center gap-5">
            <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-md border border-white/20 shadow-xl">
              <Package size={36} className="text-white fill-white/10" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight">All Products</h1>
              <p className="text-green-50/90 mt-2 font-medium italic">
                Explore our complete product collection
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-6 mt-8 relative z-20">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-gray-500">
              Showing <span className="text-[#22c55e]">{products.length}</span> products
            </p>
            {/* هنا ممكن تضيف Sort Dropdown مستقبلاً */}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    </div>
  );
}