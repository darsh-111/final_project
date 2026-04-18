'use client';

import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { getallcategories } from '@/api/routemisr.service/routemisr.servece';
import { Category } from '../../../api/routemisr.type/routemisr.type';

import {
    ShoppingCart, Heart, Menu, Search, X, ChevronRight, LogOut,
    Settings, Package, User as UserIcon, MapPin, ChevronDown,
    Headset
} from 'lucide-react';

// أضفت الـ SheetHeader والـ SheetTitle والـ SheetDescription هنا
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSession, signOut } from "next-auth/react";
import { useCart } from '@/Context/CartContext';
import { useWishlist } from '@/Context/wishlistContext';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
    const { cartCount } = useCart();
    const { wishlistCount } = useWishlist();
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const { data: session, status } = useSession();

    useEffect(() => {
        setMounted(true);
        async function fetchCats() {
            try {
                const data = await getallcategories();
                setCategories(data || []);
            } catch (error) {
                console.error("Navbar categories error:", error);
                setCategories([]);
            }
        }
        fetchCats();
    }, []);

    if (!mounted) {
        return <nav className="bg-white border-b h-[73px] w-full shadow-sm"></nav>;
    }

    return (
        <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
            <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-10 py-3">
                <div className="flex items-center justify-between gap-4">

                    {/* Logo Section */}
                    <NextLink href="/" className="flex items-center gap-2 md:gap-3 shrink-0 group">
                        <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white shadow-md group-hover:rotate-6 transition-transform">
                            <ShoppingCart size={22} strokeWidth={2.5} />
                        </div>
                        <span className="text-xl md:text-2xl font-black tracking-tight text-gray-900">
                            Fresh<span className="text-green-600">Cart</span>
                        </span>
                    </NextLink>

                    {/* Desktop Search Section */}
                    <div className="hidden md:block flex-1 max-w-xl mx-4">
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Search for products..."
                                className="bg-gray-100 border-none focus-visible:ring-2 focus-visible:ring-green-500 h-11 rounded-full ps-6 transition-all"
                            />
                            <div className="absolute end-1.5 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white p-2 rounded-full cursor-pointer transition-colors shadow-sm">
                                <Search size={18} />
                            </div>
                        </div>
                    </div>

                    {/* Actions & Links */}
                    <div className="flex items-center gap-1 md:gap-3">

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-6 text-sm font-bold text-gray-600 me-4">
                            <NextLink href="/" className="hover:text-green-600 transition-colors">Home</NextLink>
                            <NextLink href="/shop" className="hover:text-green-600 transition-colors">Shop</NextLink>

                            <DropdownMenu modal={false}>
                                <DropdownMenuTrigger className="flex items-center gap-1 hover:text-green-600 transition-colors focus:outline-none py-2 outline-none">
                                    Categories <ChevronDown size={14} />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-56 mt-1 rounded-xl shadow-xl border-gray-100 max-h-[400px] overflow-y-auto z-[100]"
                                >
                                    <DropdownMenuItem asChild className="focus:bg-green-50 focus:text-green-600 font-bold py-2.5 cursor-pointer text-[#198754]">
                                        <NextLink href="/categories">All Categories</NextLink>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    {categories?.map((category) => (
                                        <DropdownMenuItem key={category._id} asChild className="focus:bg-green-50 focus:text-green-600 py-2.5 cursor-pointer">
                                            <NextLink href={`/categorydetailes/${category._id}`}>{category.name}</NextLink>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <NextLink href="/brands" className="hover:text-green-600 transition-colors">Brands</NextLink>
                        </div>

                        {/* Wishlist */}
                        <NextLink href="/wishlist" className="relative p-2.5 hover:bg-red-50 rounded-full transition-colors group">
                            <Heart size={24} className="text-gray-700 group-hover:text-red-500 transition-colors" />
                            {wishlistCount > 0 && (
                                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1 shadow-sm">
                                    {wishlistCount}
                                </span>
                            )}
                        </NextLink>

                        {/* Cart */}
                        <NextLink href="/cart" className="relative p-2.5 hover:bg-green-50 rounded-full transition-colors group">
                            <ShoppingCart size={24} className="text-gray-700 group-hover:text-green-600 transition-colors" />
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 bg-green-600 text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1 shadow-sm">
                                    {cartCount}
                                </span>
                            )}
                        </NextLink>

                        {/* User Profile */}
                        <div className="hidden md:block ml-2">
                            {status === "authenticated" ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="focus:outline-none">
                                        <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold border-2 border-green-200 hover:bg-green-600 hover:text-white transition-all cursor-pointer shadow-sm">
                                            {session?.user?.name?.charAt(0).toUpperCase()}
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-60 mt-2 p-2 rounded-xl">
                                        <DropdownMenuLabel className="p-3">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-bold text-gray-900 leading-none">{session?.user?.name}</p>
                                                <p className="text-xs text-gray-500 truncate">{session?.user?.email}</p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild className="focus:bg-green-50 py-2.5 cursor-pointer"><NextLink href="/myaddress" className="flex items-center"><UserIcon className="mr-3 h-4 w-4" /> Profile</NextLink></DropdownMenuItem>
                                        <DropdownMenuItem asChild className="focus:bg-green-50 py-2.5 cursor-pointer"><NextLink href="/allorders" className="flex items-center"><Package className="mr-3 h-4 w-4" /> Orders</NextLink></DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600 focus:bg-red-50 py-2.5 cursor-pointer font-medium" onClick={() => signOut({ callbackUrl: '/', redirect: true })}><LogOut className="mr-3 h-4 w-4" /> Sign Out</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <NextLink href="/login">
                                    <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-7 font-bold">Sign In</Button>
                                </NextLink>
                            )}
                        </div>

                        {/* Mobile Menu */}
                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu size={28} />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[85%] sm:w-[350px] p-0 border-none shadow-2xl">

                                {/* 🟢 السطر ده هو اللي حل المشكلة: Accessibility Headers */}
                                <SheetHeader className="sr-only">
                                    <SheetTitle>Navigation Menu</SheetTitle>
                                    <SheetDescription>Mobile navigation links and user actions</SheetDescription>
                                </SheetHeader>

                                <div className="flex flex-col h-full bg-white">
                                    {/* Header Menu */}
                                    <div className="flex items-center justify-between p-5 border-b">
                                        <div className="flex items-center gap-2 text-green-600">
                                            <ShoppingCart size={24} strokeWidth={2.5} />
                                            <span className="text-xl font-black text-gray-900">FreshCart</span>
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="rounded-full bg-gray-50">
                                            <X size={20} />
                                        </Button>
                                    </div>

                                    {/* Mobile Search */}
                                    <div className="p-5">
                                        <div className="relative">
                                            <Input
                                                placeholder="Search products..."
                                                className="pr-10 h-12 bg-white border-gray-200"
                                            />
                                            <div className="absolute right-1 top-1/2 -translate-y-1/2 bg-green-600 text-white p-2 rounded-md">
                                                <Search size={18} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Nav Links */}
                                    <div className="flex-1 overflow-y-auto px-5 pb-5">
                                        <div className="space-y-1 mb-6">
                                            <NextLink href="/" onClick={() => setOpen(false)} className="block py-3 px-4 text-gray-700 font-medium hover:bg-green-50 rounded-lg transition-colors">Home</NextLink>
                                            <NextLink href="/shop" onClick={() => setOpen(false)} className="block py-3 px-4 text-gray-700 font-medium hover:bg-green-50 rounded-lg transition-colors">Shop</NextLink>
                                            <NextLink href="/categories" onClick={() => setOpen(false)} className="block py-3 px-4 text-green-600 font-bold bg-green-50 rounded-lg">Categories</NextLink>
                                            <NextLink href="/brands" onClick={() => setOpen(false)} className="block py-3 px-4 text-gray-700 font-medium hover:bg-green-50 rounded-lg transition-colors">Brands</NextLink>
                                        </div>

                                        <div className="h-[1px] bg-gray-100 my-4" />

                                        {/* Activity Section */}
                                        <div className="space-y-4">
                                            <NextLink href="/wishlist" onClick={() => setOpen(false)} className="flex items-center justify-between py-2 group">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                                                        <Heart size={20} />
                                                    </div>
                                                    <span className="font-medium text-gray-700">Wishlist</span>
                                                </div>
                                                <span className="w-6 h-6 bg-red-500 text-white text-[11px] font-bold flex items-center justify-center rounded-full">{wishlistCount}</span>
                                            </NextLink>

                                            <NextLink href="/cart" onClick={() => setOpen(false)} className="flex items-center justify-between py-2 group">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                                        <ShoppingCart size={20} />
                                                    </div>
                                                    <span className="font-medium text-gray-700">Cart</span>
                                                </div>
                                                <span className="w-6 h-6 bg-green-600 text-white text-[11px] font-bold flex items-center justify-center rounded-full">{cartCount}</span>
                                            </NextLink>
                                        </div>

                                        <div className="h-[1px] bg-gray-100 my-4" />

                                        {/* User Section */}
                                        <div className="space-y-4">
                                            {status === "authenticated" ? (
                                                <>
                                                    <div className="flex items-center gap-4 py-2">
                                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                                            <UserIcon size={20} />
                                                        </div>
                                                        <span className="font-medium text-gray-700">{session?.user?.name}</span>
                                                    </div>
                                                    <button
                                                        onClick={() => signOut()}
                                                        className="flex items-center gap-4 py-2 text-red-500 w-full"
                                                    >
                                                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                                                            <LogOut size={20} />
                                                        </div>
                                                        <span className="font-medium">Sign Out</span>
                                                    </button>
                                                </>
                                            ) : (
                                                <div className="grid grid-cols-2 gap-3 mt-4">
                                                    <NextLink href="/login" onClick={() => setOpen(false)}>
                                                        <Button variant="outline" className="w-full rounded-lg">Sign In</Button>
                                                    </NextLink>
                                                    <NextLink href="/register" onClick={() => setOpen(false)}>
                                                        <Button className="w-full bg-green-600 rounded-lg">Register</Button>
                                                    </NextLink>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Footer Support */}
                                    <div className="p-5 mt-auto">
                                        <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                                <Headset size={20} />
                                            </div>
                                            <div>
                                                <p className="text-[12px] text-gray-500 font-medium">Need Help?</p>
                                                <p className="text-sm font-bold text-green-600 cursor-pointer">Contact Support</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    );
}