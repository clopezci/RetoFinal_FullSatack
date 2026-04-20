import { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';
import { apiService } from '../../services/api';

export function ProductGallery() {
    const { products, setProducts, addToCart } = useStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProducts() {
            setLoading(true);
            const data = await apiService.getProducts();
            setProducts(data);
            setLoading(false);
        }

        loadProducts();
    }, [setProducts]);

    if (loading) {
        return <div className="text-center py-8">Cargando productos...</div>;
    }

    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 p-4">
            {products.map((product) => (
                <div key={product.id} className="border rounded-lg p-4 hover:shadow-lg transition">
                    <div className="bg-gray-200 h-48 rounded mb-2 flex items-center justify-center overflow-hidden">
                        <img src={product.image} alt={product.title} className="h-full object-contain" />
                    </div>
                    <h3 className="text-sm font-semibold line-clamp-2">{product.title}</h3>
                    <p className="text-yellow-500 text-sm my-1">⭐ {product.rating?.rate || 'N/A'}</p>
                    <div className="flex justify-between items-center mt-3">
                        <span className="font-bold text-lg">${product.price}</span>
                        <button
                            onClick={() => addToCart(product)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                        >
                            + Agregar
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}