import { Input } from '../atoms/Input';

export function Header({ searchTerm, onSearchChange, cartCount, onCartToggle }) {
  return (
    <header className="flex justify-between items-center gap-3 px-4 py-4 border-b bg-white sticky top-0 z-40">
      <h1 className="text-2xl font-bold">E-Shop</h1>
      <Input
        type="text"
        value={searchTerm}
        onChange={onSearchChange}
        placeholder="Buscar productos..."
        className="w-64 max-w-full"
      />
      <button
        onClick={onCartToggle}
        className="relative text-2xl hover:scale-110 transition"
      >
        🛒
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>
    </header>
  );
}
