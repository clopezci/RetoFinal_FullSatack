const API_BASE = 'https://fakestoreapi.com';

export const apiService = {
    // Obtener todos los productos
    getProducts: async () => {
        try {
            const response = await fetch(`${API_BASE}/products`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    },

    // Obtener un producto por ID
    getProductById: async (id) => {
        try {
            const response = await fetch(`${API_BASE}/products/${id}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching product:', error);
            return null;
        }
    },

    // Obtener categorías
    getCategories: async () => {
        try {
            const response = await fetch(`${API_BASE}/products/categories`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    },

    // Obtener productos por categoría
    getProductsByCategory: async (category) => {
        try {
            const response = await fetch(`${API_BASE}/products/category/${category}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching products by category:', error);
            return [];
        }
    },
};