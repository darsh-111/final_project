"use client"
import { useEffect, useState } from "react";
import { GetAllBrands } from "../../actions/brands.actions";
import { Home, ChevronRight, Tag, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BrandsPage() {
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBrands() {
      try {
        const data = await GetAllBrands();
        setBrands(data || []);
      } catch (error) {
        console.error("Failed to load brands");
      } finally {
        setLoading(false);
      }
    }
    fetchBrands();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-[#a044ff]" size={40} />
        <p className="text-gray-500 font-bold animate-pulse">Loading Brands...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFE]">
      {/* Header Banner (Purple Section) */}
      <div className="bg-[#a044ff] text-white pt-10 pb-20 px-4 md:px-12 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-purple-100 mb-8 opacity-90">
            <Link href="/" className="hover:text-white transition-all flex items-center gap-1">
              <Home size={16} /> Home
            </Link>
            <ChevronRight size={14} />
            <span className="font-bold text-white">Brands</span>
          </nav>

          {/* Title Section */}
          <div className="flex items-center gap-5">
            <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-md border border-white/20 shadow-2xl">
              <Tag size={36} className="text-white fill-white/10" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter">Top Brands</h1>
              <p className="text-purple-100/90 mt-2 font-medium italic text-lg">
                Discover quality products from your favorite names
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Brands Grid Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 mt-10 pb-20 relative z-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {brands.map((brand) => (
            <Link
              key={brand._id}
              href={`/brands/${brand._id}`}
              className="group bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm hover:shadow-2xl hover:shadow-purple-200/50 hover:border-purple-200 transition-all duration-500 flex flex-col items-center justify-center gap-5 cursor-pointer"
            >
              {/* Logo Container */}
              <div className="relative w-full aspect-square flex items-center justify-center p-2">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={140}
                  height={140}
                  className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
                  unoptimized
                />
              </div>

              {/* Brand Name */}
              <div className="text-center">
                <h3 className="text-xs font-black text-gray-400 group-hover:text-[#a044ff] transition-colors uppercase tracking-[0.15em]">
                  {brand.name}
                </h3>
                <div className="h-1 w-0 group-hover:w-full bg-[#a044ff] mt-1 transition-all duration-500 mx-auto rounded-full"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}