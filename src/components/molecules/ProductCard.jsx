import { Button } from '../atoms/Button';

const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect width='100%' height='100%' fill='%23e5e7eb'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='22'>Imagen no disponible</text></svg>";

export function ProductCard({ product, onAddToCart }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition">
      <div className="bg-gray-200 h-48 rounded mb-2 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="h-full object-contain"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = FALLBACK_IMAGE;
          }}
        />
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
