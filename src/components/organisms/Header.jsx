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
    <header className="sticky top-0 z-40 border-b bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-3 py-3 sm:px-4 sm:py-4 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
        <div className="flex min-w-0 items-center justify-between gap-2 lg:contents">
          <h1 className="shrink-0 text-xl font-bold sm:text-2xl">E-Shop</h1>

          <div className="flex items-center gap-1.5 sm:gap-2 lg:order-3">
            {user ? (
              <>
                <span className="max-w-[9rem] truncate text-sm text-gray-700 sm:max-w-none">
                  <span className="hidden sm:inline">Hola, </span>
                  {user.name}
                </span>
                <button
                  type="button"
                  onClick={onLogout}
                  className="shrink-0 rounded border px-2.5 py-1.5 text-sm hover:bg-gray-100 sm:px-3"
                >
                  Salir
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={onAuthOpen}
                className="shrink-0 rounded border px-2.5 py-1.5 text-sm hover:bg-gray-100 sm:px-3"
              >
                Ingresar
              </button>
            )}

            <button
              type="button"
              onClick={onCartToggle}
              className="relative shrink-0 text-2xl transition hover:scale-110"
              aria-label="Abrir carrito"
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="min-w-0 flex-1 lg:order-2 lg:max-w-xl">
          <Input
            type="text"
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Buscar productos..."
            className="w-full"
          />
        </div>
      </div>
    </header>
  );
}
