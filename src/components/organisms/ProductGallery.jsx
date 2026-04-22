import { useCallback, useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';
import { apiService } from '../../services/api';
import { ProductCard } from '../molecules/ProductCard';
import { Button } from '../atoms/Button';

export function ProductGallery() {
  const {
    products,
    setProducts,
    addToCart,
    searchTerm,
    currentPage,
    itemsPerPage,
    setCurrentPage,
  } = useStore();
  const [loadError, setLoadError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const data = await apiService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
      setLoadError('No se pudieron cargar los productos. Revisa tu conexión e inténtalo de nuevo.');
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, [setProducts]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, setCurrentPage]);

  const filteredProducts = products.filter((product) => {
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    if (!normalizedSearchTerm) return true;

    return (
      product.title.toLowerCase().includes(normalizedSearchTerm) ||
      (product.category?.toLowerCase() ?? '').includes(normalizedSearchTerm)
    );
  });

  if (isLoading) {
    return <div className="py-12 text-center text-gray-600">Cargando productos...</div>;
  }

  if (loadError) {
    return (
      <div className="flex flex-col items-center gap-4 px-4 py-12 text-center">
        <p className="text-gray-700">{loadError}</p>
        <Button
          type="button"
          onClick={loadProducts}
          className="border border-blue-600 bg-white text-blue-600 hover:bg-blue-50"
        >
          Reintentar
        </Button>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return <div className="text-center py-8">No se encontraron productos.</div>;
  }

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="p-2 sm:p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <Button
            onClick={() => setCurrentPage(safeCurrentPage - 1)}
            disabled={safeCurrentPage === 1}
            className="border disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </Button>

          {pageNumbers.map((pageNumber) => (
            <Button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              className={`border ${pageNumber === safeCurrentPage ? 'bg-blue-500 text-white border-blue-500' : ''}`}
            >
              {pageNumber}
            </Button>
          ))}

          <Button
            onClick={() => setCurrentPage(safeCurrentPage + 1)}
            disabled={safeCurrentPage === totalPages}
            className="border disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente
          </Button>
        </div>
      )}
    </div>
  );
}
