import { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';
import { apiService } from '../../services/api';

export function ProductGallery() {
    const {
        products,
        setProducts,
        addToCart,
        searchTerm,
        currentPage,
        itemsPerPage,
        setCurrentPage
    } = useStore();
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

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, setCurrentPage]);

    if (loading) {
        return <div className="text-center py-8">Cargando productos...</div>;
    }

    const filteredProducts = products.filter((product) => {
        const normalizedSearchTerm = searchTerm.toLowerCase().trim();
        if (!normalizedSearchTerm) {
            return true;
        }

        return (
            product.title.toLowerCase().includes(normalizedSearchTerm)
            || product.category?.toLowerCase().includes(normalizedSearchTerm)
        );
    });

    if (filteredProducts.length === 0) {
        return <div className="text-center py-8">No se encontraron productos.</div>;
    }

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const safeCurrentPage = Math.min(currentPage, totalPages);
    const startIndex = (safeCurrentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="p-4">
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
                {paginatedProducts.map((product) => (
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

            {totalPages > 1 && (
                <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                    <button
                        onClick={() => setCurrentPage(safeCurrentPage - 1)}
                        disabled={safeCurrentPage === 1}
                        className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Anterior
                    </button>

                    {pageNumbers.map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => setCurrentPage(pageNumber)}
                            className={`px-3 py-1 border rounded ${pageNumber === safeCurrentPage ? 'bg-blue-500 text-white border-blue-500' : ''}`}
                        >
                            {pageNumber}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage(safeCurrentPage + 1)}
                        disabled={safeCurrentPage === totalPages}
                        className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
}