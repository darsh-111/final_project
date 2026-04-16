"use client"
import { useEffect, useState, use } from "react"; // 1. ضيف use هنا
import { GetProductsByCategory } from "@/actions/product.actions";
import ProductCard from "@/app/_componant/ProductCard/ProductCard";
import { Loader2, PackageOpen } from "lucide-react";

export default function CategoryProducts({ params }: { params: Promise<{ id: string }> }) {

    // 2. فك الـ Promise بتاع الـ params هنا
    // دي أهم خطوة عشان الـ ID يتحدث كل ما الـ URL يتغير
    const { id } = use(params);

    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            setLoading(true); // شغل اللودر أول ما الـ ID يتغير
            try {
                // نستخدم الـ ID اللي جاي من الـ URL
                const data = await GetProductsByCategory(id);
                setProducts(data || []);
            } catch (error) {
                console.error("Error loading products:", error);
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            load();
        }
    }, [id]); // 3. ضروري جداً الـ id يكون هنا عشان الـ Effect يشتغل لما يتغير

    if (loading) return (
        <div className="h-96 flex items-center justify-center">
            <Loader2 className="animate-spin text-green-600" size={40} />
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-8 border-b pb-4">
                <h1 className="text-3xl font-bold text-gray-800">
                    Category <span className="text-green-600">Products</span>
                </h1>
                {/* السطر ده للتيست عشان تتأكد إن الأيدي بيتغير فعلاً */}
                <p className="text-xs text-gray-400 mt-2">Current ID: {id}</p>
            </div>

            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard product={product} key={product._id} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed">
                    <PackageOpen size={64} className="mx-auto text-gray-300 mb-4" />
                    <h2 className="text-xl font-bold text-gray-500">No products found for this category</h2>
                </div>
            )}
        </div>
    );
}