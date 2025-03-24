export default function OutlineButton({ className, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`border-gray-300 border px-3 py-2 rounded cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
