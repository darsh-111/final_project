import React from 'react';
import NextLink from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPhoneAlt, FaRegEnvelope } from "react-icons/fa";
import { IoLocationOutline, IoCartOutline } from "react-icons/io5";
import { SiVisa, SiMastercard, SiPaypal } from "react-icons/si";

export default function Footer() {
    return (
        <footer className="bg-[#0b1522] text-gray-400 py-16">
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

                    {/* Column 1: Brand & About */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white inline-block p-2 rounded-md">
                            <span className="text-2xl font-black text-[#0b1522] flex items-center gap-2">
                                <IoCartOutline className="text-green-600" size={28} /> Fresh<span className="text-green-600">Cart</span>
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-400">
                            FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices.
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm">
                                <FaPhoneAlt size={14} className="text-green-500" />
                                <span>+1 (800) 123-4567</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <FaRegEnvelope size={16} className="text-green-500" />
                                <span>support@freshcart.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <IoLocationOutline size={18} className="text-green-500" />
                                <span>123 Commerce Street, New York, NY 10001</span>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-3 pt-2">
                            <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors text-white"><FaFacebookF size={14} /></a>
                            <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-sky-400 transition-colors text-white"><FaTwitter size={14} /></a>
                            <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors text-white"><FaInstagram size={14} /></a>
                            <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors text-white"><FaYoutube size={14} /></a>
                        </div>
                    </div>

                    {/* Column 2: Shop */}
                    <div className="space-y-6">
                        <h4 className="text-white font-bold text-lg">Shop</h4>
                        <ul className="space-y-3 text-sm">
                            <li><NextLink href="/shop" className="hover:text-white transition-colors">All Products</NextLink></li>
                            <li><NextLink href="/categories" className="hover:text-white transition-colors">Categories</NextLink></li>
                            <li><NextLink href="/brands" className="hover:text-white transition-colors">Brands</NextLink></li>
                            <li><NextLink href="/electronics" className="hover:text-white transition-colors">Electronics</NextLink></li>
                            <li><NextLink href="/mens-fashion" className="hover:text-white transition-colors">Men's Fashion</NextLink></li>
                        </ul>
                    </div>

                    {/* Column 3: Account */}
                    <div className="space-y-6">
                        <h4 className="text-white font-bold text-lg">Account</h4>
                        <ul className="space-y-3 text-sm">
                            <li><NextLink href="/profile" className="hover:text-white transition-colors">My Account</NextLink></li>
                            <li><NextLink href="/allorders" className="hover:text-white transition-colors">Order History</NextLink></li>
                            <li><NextLink href="/wishlist" className="hover:text-white transition-colors">Wishlist</NextLink></li>
                            <li><NextLink href="/cart" className="hover:text-white transition-colors">Shopping Cart</NextLink></li>
                            <li><NextLink href="/login" className="hover:text-white transition-colors">Sign In</NextLink></li>
                        </ul>
                    </div>

                    {/* Column 4: Support */}
                    <div className="space-y-6">
                        <h4 className="text-white font-bold text-lg">Support</h4>
                        <ul className="space-y-3 text-sm">
                            <li><NextLink href="/contact" className="hover:text-white transition-colors">Contact Us</NextLink></li>
                            <li><NextLink href="/help" className="hover:text-white transition-colors">Help Center</NextLink></li>
                            <li><NextLink href="/shipping" className="hover:text-white transition-colors">Shipping Info</NextLink></li>
                            <li><NextLink href="/returns" className="hover:text-white transition-colors">Returns & Refunds</NextLink></li>
                        </ul>
                    </div>

                    {/* Column 5: Legal */}
                    <div className="space-y-6">
                        <h4 className="text-white font-bold text-lg">Legal</h4>
                        <ul className="space-y-3 text-sm">
                            <li><NextLink href="/privacy" className="hover:text-white transition-colors">Privacy Policy</NextLink></li>
                            <li><NextLink href="/terms" className="hover:text-white transition-colors">Terms of Service</NextLink></li>
                            <li><NextLink href="/cookies" className="hover:text-white transition-colors">Cookie Policy</NextLink></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Section */}
                <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm">© 2026 FreshCart. All rights reserved.</p>

                    <div className="flex items-center gap-4 text-2xl">
                        <SiVisa className="hover:text-white transition-colors cursor-pointer" />
                        <SiMastercard className="hover:text-white transition-colors cursor-pointer" />
                        <SiPaypal className="hover:text-white transition-colors cursor-pointer" size={20} />
                    </div>
                </div>
            </div>
        </footer>
    );
}