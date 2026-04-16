"use client";
import { createContext, useContext, useState, useEffect, ReactNode, useRef, useCallback } from "react";
import { GetLoggedUserCart, Addtocard } from "@/actions/card.actions";
import { useSession } from "next-auth/react";

interface CartContextType {
    cartCount: number;
    cartItems: any[];
    cartId: string;
    cartTotal: number;
    setCartCount: (count: number) => void;
    refreshCartCount: () => Promise<void>;
    addProductToCart: (id: string) => Promise<any>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export default function CartContextProvider({ children }: { children: ReactNode }) {
    const [cartCount, setCartCount] = useState<number>(0);
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [cartId, setCartId] = useState<string>("");
    const [cartTotal, setCartTotal] = useState<number>(0);

    const { data: session, status } = useSession();
    const lastFetchedToken = useRef<string | null>(null);
    const userToken = (session?.user as any)?.token;

    // دالة مساعدة لحساب إجمالي القطع (Quantity) مش بس الأنواع
    const calculateTotalQuantity = (products: any[]) => {
        return products.reduce((total, item) => total + item.count, 0);
    };

    const refreshCartCount = useCallback(async () => {
        if (status !== "authenticated") return;

        try {
            const res = await GetLoggedUserCart();

            if (res && res.status === "success") {
                const products = res.data.products;
                setCartItems(products);
                setCartId(res.data._id);
                setCartTotal(res.data.totalCartPrice);

                // 🔥 بنحسب الإجمالي بناءً على الـ count بتاع كل منتج
                setCartCount(calculateTotalQuantity(products));
            } else {
                setCartItems([]);
                setCartCount(0);
                setCartId("");
                setCartTotal(0);
            }
        } catch (error) {
            console.error("Cart Context Error:", error);
        }
    }, [status]);

    const addProductToCart = async (id: string) => {
        if (status !== "authenticated") return { status: "error", message: "unauthenticated" };

        // ⚡ Optimistic Update: زود الرقم فوراً عشان اليوزر يحس بالسرعة
        setCartCount((prev) => prev + 1);

        try {
            const res = await Addtocard(id);
            if (res.status === "success") {
                // بنحدث البيانات الحقيقية من السيرفر عشان نضمن المزامنة
                await refreshCartCount();
                return res;
            } else {
                // لو السيرفر رجع خطأ، بنرجع الرقم زي ما كان (Rollback)
                setCartCount((prev) => (prev > 0 ? prev - 1 : 0));
                return res;
            }
        } catch (error) {
            // في حالة وقوع خطأ في الشبكة، بنرجع الرقم برضه
            setCartCount((prev) => (prev > 0 ? prev - 1 : 0));
            console.error("Error adding to cart:", error);
            throw error;
        }
    };

    useEffect(() => {
        if (status === "authenticated" && userToken) {
            if (lastFetchedToken.current !== userToken) {
                lastFetchedToken.current = userToken;
                refreshCartCount();
            }
        }

        if (status === "unauthenticated") {
            setCartItems([]);
            setCartCount(0);
            setCartId("");
            setCartTotal(0);
            lastFetchedToken.current = null;
        }
    }, [status, userToken, refreshCartCount]);

    return (
        <CartContext.Provider value={{
            cartCount,
            cartItems,
            cartId,
            cartTotal,
            setCartCount,
            refreshCartCount,
            addProductToCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartContextProvider");
    return context;
};