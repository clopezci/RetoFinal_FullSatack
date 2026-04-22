export function CheckoutPreview({
  isOpen,
  onClose,
  cart,
  user,
  cartTotal,
  onConfirmPurchase,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto p-4 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-xl">Revisar pedido</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-600 hover:text-black text-lg leading-none"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        <section className="mb-4 p-3 bg-gray-50 rounded border">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Datos del comprador</h3>
          {user ? (
            <div className="text-sm">
              <p>
                <span className="text-gray-500">Nombre: </span>
                {user.name}
              </p>
              <p>
                <span className="text-gray-500">Correo: </span>
                {user.email}
              </p>
            </div>
          ) : (
            <p className="text-sm text-amber-700">
              No has iniciado sesión. Puedes confirmar igualmente o ingresar desde el encabezado.
            </p>
          )}
        </section>

        <section className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Resumen del carrito</h3>
          <ul className="space-y-2 text-sm border rounded divide-y">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between gap-2 px-3 py-2">
                <span className="line-clamp-2">{item.title}</span>
                <span className="flex-shrink-0 text-gray-600">
                  x{item.quantity} · ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <div className="flex justify-between items-center text-lg font-bold border-t pt-3 mb-4">
          <span>Total a pagar</span>
          <span>${cartTotal}</span>
        </div>

        <p className="text-xs text-gray-500 mb-4">
          Al confirmar, se vaciará el carrito. Esta es una vista previa del flujo de compra (simulación).
        </p>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 rounded border border-gray-300 hover:bg-gray-50"
          >
            Volver
          </button>
          <button
            type="button"
            onClick={onConfirmPurchase}
            className="flex-1 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Confirmar compra
          </button>
        </div>
      </div>
    </div>
  );
}
