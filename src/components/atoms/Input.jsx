export default function Input({
  type = "text",
  placeholder = "",
  value,
  onChange,
  name,
}) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-gray-300 cursor-pointer"
    />
  );
}