export default function OutlineButton({ className, children, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`border-gray-300 border px-3 py-2 rounded ${className}
      ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      {children}
    </button>
  );
}
