import { API_BASE_URL } from '../utils/constants';

async function handleJsonResponse(response) {
    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }
    return response.json();
}

export const apiService = {
    // Fake Store API: https://fakestoreapi.com/docs
    // GET /products
    getProducts: async () => {
        const response = await fetch(`${API_BASE_URL}/products`);
        const data = await handleJsonResponse(response);
        if (!Array.isArray(data)) {
            throw new Error('Respuesta inválida: se esperaba un listado de productos.');
        }
        return data;
    },

    // GET /products/:id
    getProductById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        return handleJsonResponse(response);
    },

    // GET /products/categories
    getCategories: async () => {
        const response = await fetch(`${API_BASE_URL}/products/categories`);
        const data = await handleJsonResponse(response);
        return Array.isArray(data) ? data : [];
    },

    // GET /products/category/:category
    getProductsByCategory: async (category) => {
        const encodedCategory = encodeURIComponent(category);
        const response = await fetch(
            `${API_BASE_URL}/products/category/${encodedCategory}`,
        );
        const data = await handleJsonResponse(response);
        return Array.isArray(data) ? data : [];
    },
};