import './App.css';
import { useState, useEffect } from 'react';
import { useStore } from './store/useStore';
import { ProductGallery } from './components/organisms/ProductGallery';
import { Header } from './components/organisms/Header';
import { Footer } from './components/organisms/Footer';
import { CheckoutPreview } from './components/organisms/CheckoutPreview';
import { MESSAGES } from './utils/constants';

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

function AuthModal({ isOpen, onClose, onSubmit, mode, setMode, errorMessage }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) {
    return null;
  }

  const isRegisterMode = mode === 'register';

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      name,
      email,
      password,
      mode,
      onSuccess: () => {
        setName('');
        setEmail('');
        setPassword('');
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-lg">
            {isRegisterMode ? 'Crear cuenta' : 'Iniciar sesión'}
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {isRegisterMode && (
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Nombre completo"
              required
            />
          )}

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Correo"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Contraseña"
            required
          />

          {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            {isRegisterMode ? 'Registrarme' : 'Entrar'}
          </button>
        </form>

        <div className="mt-3 text-sm text-center">
          {isRegisterMode ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
          <button
            onClick={() => setMode(isRegisterMode ? 'login' : 'register')}
            className="text-blue-600 hover:underline"
          >
            {isRegisterMode ? 'Iniciar sesión' : 'Registrarme'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authError, setAuthError] = useState('');
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    searchTerm,
    setSearchTerm,
    user,
    login,
    registerUser,
    logout,
  } = useStore();

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);

  useEffect(() => {
    if (!showCheckoutSuccess) return;
    const timer = setTimeout(() => setShowCheckoutSuccess(false), 4000);
    return () => clearTimeout(timer);
  }, [showCheckoutSuccess]);

  const handleAuthSubmit = ({ name, email, password, mode, onSuccess }) => {
    let success = false;

    if (mode === 'login') {
      success = login(email, password);
      if (!success) {
        setAuthError('Credenciales inválidas.');
        return;
      }
    } else {
      success = registerUser({ name, email, password });
      if (!success) {
        setAuthError('Ese correo ya está registrado.');
        return;
      }
    }

    onSuccess();
    setAuthError('');
    setIsAuthOpen(false);
  };

  const handleConfirmPurchase = () => {
    clearCart();
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setShowCheckoutSuccess(true);
  };

  return (
    <div className="relative">
      {showCheckoutSuccess && (
        <div
          className="fixed top-0 left-0 right-0 z-[70] bg-green-600 text-white text-center py-2 text-sm shadow"
          role="status"
        >
          {MESSAGES.CHECKOUT_SUCCESS}
        </div>
      )}
      <Header
        searchTerm={searchTerm}
        onSearchChange={(event) => setSearchTerm(event.target.value)}
        cartCount={cart.length}
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
        user={user}
        onAuthOpen={() => {
          setAuthMode('login');
          setAuthError('');
          setIsAuthOpen(true);
        }}
        onLogout={logout}
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
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded mb-2"
                >
                  Ir al checkout
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

      <CheckoutPreview
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        user={user}
        cartTotal={cartTotal}
        onConfirmPurchase={handleConfirmPurchase}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => {
          setAuthError('');
          setIsAuthOpen(false);
        }}
        onSubmit={handleAuthSubmit}
        mode={authMode}
        setMode={setAuthMode}
        errorMessage={authError}
      />
      <Footer />
    </div>
  );
}