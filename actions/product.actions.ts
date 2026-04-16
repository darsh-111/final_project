export async function GetAllProducts() {
    try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/products");
        const data = await res.json();
        return data.data; // المصفوفة اللي فيها الـ 40 منتج
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}
export async function GetProductsByCategory(categoryId: string) {
    try {
        // بنبعت الـ category ID في الـ Query String
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`);
        const data = await res.json();
        return data.data; // هيرجع بس المنتجات اللي تبع الكاتيجوري ده
    } catch (error) {
        return [];
    }
}