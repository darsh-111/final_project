"use server"


export async function GetAllBrands() {
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`, {
            method: "GET",
        });
        const data = await res.json();
        return data.data; 
    } catch (error) {
        return [];
    }
}
export async function GetProductsByBrand(brandId: string) {
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`, {
            method: "GET",
            next: { revalidate: 60 }
        });
        const data = await res.json();
        return data.data; // مصفوفة المنتجات
    } catch (error) {
        return [];
    }
}