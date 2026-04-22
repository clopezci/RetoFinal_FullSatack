import { Input } from '../atoms/Input';

export function Header({
  searchTerm,
  onSearchChange,
  cartCount,
  onCartToggle,
  user,
  onAuthOpen,
  onLogout,
}) {
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
      <div className="flex items-center gap-2">
        {user ? (
          <>
            <span className="text-sm text-gray-700 hidden md:inline">Hola, {user.name}</span>
            <button
              onClick={onLogout}
              className="px-3 py-1 rounded border text-sm hover:bg-gray-100"
            >
              Salir
            </button>
          </>
        ) : (
          <button
            onClick={onAuthOpen}
            className="px-3 py-1 rounded border text-sm hover:bg-gray-100"
          >
            Ingresar
          </button>
        )}
      </div>
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
