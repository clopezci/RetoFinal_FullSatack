export function Button({ children, className = '', type = 'button', ...props }) {
  return (
    <button
      type={type}
      className={`px-3 py-1 rounded text-sm transition ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
