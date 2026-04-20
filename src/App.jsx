import './App.css';
import { useState } from 'react';
import { useStore } from './store/useStore';
import { ProductGallery } from './components/organisms/ProductGallery';
import { Header } from './components/organisms/Header';
import { Footer } from './components/organisms/Footer';

function CartItem({ item, onRemove, onQuantityChange }) {
  return (
    <div className="flex items-center px-3 w-full gap-3 border-b pb-3">
      <div className="bg-gray-300 w-16 h-16 rounded flex-shrink-0 flex items-center justify-center overflow-hidden">
        <img src={item.image} alt={item.title} className="h-full object-contain" />
      </div>
      <div className="flex w-full justify-between items-start">
        <div>
          <p className="font-semibold text-sm line-clamp-2">{item.title}</p>
          <p className="text-xs text-gray-500 my-1">${item.price}</p>
          <div className="flex items-center gap-2 my-2">
            <button
              onClick={() => onQuantityChange(item.id, item.quantity - 1)}
              className="px-2 py-1 bg-gray-300 rounded text-sm"
            >
              -
            </button>
            <span className="text-sm font-semibold">{item.quantity}</span>
            <button
              onClick={() => onQuantityChange(item.id, item.quantity + 1)}
              className="px-2 py-1 bg-gray-300 rounded text-sm"
            >
              +
            </button>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="text-xs text-red-500 hover:text-red-700"
          >
            🗑️ Eliminar
          </button>
        </div>
        <div className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</div>
      </div>
    </div>
  );
}

function Drawer({ isOpen, children }) {
  return (
    <div
      className={`${isOpen ? 'drawer-wrap-open' : ''} absolute drawer-wrap bg-white border-l border-sky-500 w-96 min-h-screen overflow-y-auto`}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, removeFromCart, updateQuantity, clearCart, searchTerm, setSearchTerm } = useStore();

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);

  return (
    <div className="relative">
      <Header
        searchTerm={searchTerm}
        onSearchChange={(event) => setSearchTerm(event.target.value)}
        cartCount={cart.length}
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
      />

      <main>
        <ProductGallery />
      </main>

      <Drawer isOpen={isCartOpen}>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Mi Carrito</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-8">El carrito está vacío</p>
          ) : (
            <>
              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onRemove={removeFromCart}
                    onQuantityChange={updateQuantity}
                  />
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-lg">Total:</span>
                  <span className="font-bold text-lg">${cartTotal}</span>
                </div>
                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded mb-2">
                  Checkout
                </button>
                <button
                  onClick={clearCart}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
                >
                  Vaciar Carrito
                </button>
              </div>
            </>
          )}
        </div>
      </Drawer>
      <Footer />
    </div>
  );
}