import { useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { mockProducts } from '../../mockdata/products';
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

  useEffect(() => {
    setProducts(mockProducts);
  }, [setProducts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, setCurrentPage]);

  const filteredProducts = products.filter((product) => {
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    if (!normalizedSearchTerm) return true;

    return (
      product.title.toLowerCase().includes(normalizedSearchTerm) ||
      product.category.toLowerCase().includes(normalizedSearchTerm)
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
