import { Button } from '../atoms/Button';

export function ProductCard({ product, onAddToCart }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition">
      <div className="bg-gray-200 h-48 rounded mb-2 flex items-center justify-center overflow-hidden">
        <img src={product.image} alt={product.title} className="h-full object-contain" />
      </div>
      <h3 className="text-sm font-semibold line-clamp-2">{product.title}</h3>
      <p className="text-yellow-500 text-sm my-1">⭐ {product.rating?.rate || 'N/A'}</p>
      <div className="flex justify-between items-center mt-3">
        <span className="font-bold text-lg">${product.price}</span>
        <Button
          onClick={() => onAddToCart(product)}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          + Agregar
        </Button>
      </div>
    </div>
  );
}
