import { Category, Product } from "../routemisr.types/routemisr.types";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

export async function getProducts(): Promise<Product[]> {
    try {
        const res = await fetch(`${BASE_URL}/products`, {
            cache: "force-cache",
            next: { revalidate: 3600 }
        });
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error("getProducts Error:", error);
        return [];
    }
}
export async function getProductDetails(id: string): Promise<Product | null> {
    try {
        const res = await fetch(`${BASE_URL}/products/${id}`, {
            next: { revalidate: 60 }
        });
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error("getProductDetails Error:", error);
        return null;
    }
}
export async function getallcategories(): Promise<Category[] | undefined> {
    try {
        const res = await fetch(`${BASE_URL}/categories`)
        const data = await res.json();
        return data.data;
    }
    catch (err) {
        console.log(err)
        return undefined;
    }
}