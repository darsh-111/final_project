const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
        });

        if (!res.ok) throw new Error(`Fetch failed: ${res.statusText}`);

        const data = await res.json();
        return data.data || data;
    } catch (error) {
        console.error("API Request Error:", error);
        return null;
    }
}