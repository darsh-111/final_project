import React from 'react'
import { ChevronLeft, ShoppingCart, Star } from 'lucide-react'
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/app/_componant/ProductCard/ProductCard';
import { Product } from '@/api/routemisr.type/routemisr.type';

export default async function CategoryDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        // 1. نجيب بيانات القسم (عشان الاسم والصورة اللي فوق)
        // 2. نجيب "المنتجات" اللي تبع القسم ده علطول باستخدام فلتر category
        const [catRes, prodRes] = await Promise.all([
            fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`),
            fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`)
        ]);

        const categoryData = await catRes.json();
        const productsData = await prodRes.json();

        const category = categoryData.data;
        const products = productsData.data;

        return (
            <div className="min-h-screen bg-gray-50 pb-20">
                {/* الجزء الأخضر اللي فوق */}
                <div className="bg-[#008235] py-12 text-white">
                    <div className="container mx-auto px-6">
                        <Link href="/categories" className="flex items-center gap-2 mb-4 text-green-100 hover:text-white transition-colors">
                            <ChevronLeft size={20} /> Back to Categories
                        </Link>
                        <div className="flex items-center gap-6">
                            <img src={category.image} className="w-24 h-24 rounded-2xl object-cover border-4 border-white/20" alt={category.name} />
                            <div>
                                <h1 className="text-4xl font-bold">{category.name}</h1>
                                <p className="opacity-80">Showing {products.length} products</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* عرض المنتجات بدل الفولدرات */}
                <div className="container mx-auto py-12 px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {products.map((product: Product) => (
                            <ProductCard product={product} key={product._id}/>
                        ))}
                    </div>

                    {products.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl">
                            {/* أيقونة الصندوق */}
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                <svg
                                    className="w-10 h-10 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>

                            {/* النص */}
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No Products Found</h3>
                            <p className="text-gray-500 mb-8 text-center">
                                No products match your current category.
                            </p>

                            {/* الزرار الأخضر */}
                            <Link href="/shop">
                                <button className="bg-[#198754] hover:bg-[#157347] text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md">
                                    View All Products
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        );

    } catch (err) {
        return <div className="p-20 text-center text-red-500">Error loading products.</div>;
    }
}