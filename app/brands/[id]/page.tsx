"use client"
import { useEffect, useState } from "react";
import { GetProductsByBrand } from "@/actions/brands.actions";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Home, ChevronRight, RefreshCw, PackageOpen, X } from "lucide-react";
import ProductCard from "@/app/_componant/ProductCard/ProductCard";
import Link from "next/link";

export default function BrandProductsPage() {
    const { id } = useParams();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const data = await GetProductsByBrand(id as string);
            setProducts(data || []);
            setLoading(false);
        }
        load();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22c55e]"></div>
        </div>
    );

    // استخراج بيانات البراند من أول منتج لو موجود
    const brandInfo = products.length > 0 ? products[0]?.brand : null;

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Green Header Banner */}
            <div className="bg-[#22c55e] text-white pt-6 pb-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <nav className="flex items-center gap-2 text-xs text-green-100 mb-6">
                        <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                            <Home size={14} /> Home
                        </Link>
                        <ChevronRight size={12} />
                        <Link href="/brands" className="hover:text-white transition-colors">Brands</Link>
                        <ChevronRight size={12} />
                        <span className="font-bold">{brandInfo?.name || "Brand Details"}</span>
                    </nav>

                    <div className="flex items-center gap-5">
                        {brandInfo?.image && (
                            <div className="bg-white p-3 rounded-2xl shadow-lg">
                                <Image src={brandInfo.image} alt="logo" width={60} height={60} className="object-contain" unoptimized />
                            </div>
                        )}
                        <div>
                            <h1 className="text-3xl font-black">{brandInfo?.name || "Brand Details"}</h1>
                            <p className="text-green-50 opacity-90">Shop the latest collection</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-6 py-10">
                {products.length > 0 ? (
                    <>
                        <div className="flex items-center justify-between mb-8 border-b pb-4">
                            <p className="text-sm font-bold text-gray-500">Showing {products.length} products</p>
                            <div className="flex gap-2">
                                <div className="bg-purple-50 text-purple-600 px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-2 border border-purple-100">
                                    {brandInfo?.name} <X size={12} className="cursor-pointer" />
                                </div>
                                <Link href="/shop">                                <button className="text-xs text-gray-400 font-bold underline cursor-pointer">Clear all</button>
</Link>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {products.map((product) => (
                                <ProductCard product={product} key={product._id} />
                                // استخدمت product._id لإن أغلب داتا Route بتيجي بـ _id
                            ))}
                        </div>
                    </>
                ) : (
                    /* --- Empty State (لما ميكونش فيه منتجات) --- */
                    <div className="py-20 flex flex-col items-center justify-center text-center">
                        <div className="bg-gray-50 p-10 rounded-full mb-6">
                            <PackageOpen size={80} className="text-gray-300" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 mb-2">No Products Found</h2>
                        <p className="text-gray-500 mb-8 max-w-sm">
                            Sorry, there are no products currently available for this brand. Check back later!
                        </p>
                        <Link
                            href="/brands"
                            className="bg-[#22c55e] text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-green-100 hover:bg-green-600 transition-all"
                        >
                            Back to Brands
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}