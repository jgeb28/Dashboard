export default function Input({ type, name, placeholder, className }) {
  return (
    <input
      className={`border p-2 border-gray-300 rounded ${className}`}
      type={type}
      name={name}
      placeholder={placeholder}
    />
  );
}
