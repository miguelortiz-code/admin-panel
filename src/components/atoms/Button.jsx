export default function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
  className = "",
}) {
  const baseStyles =
    "px-4 py-2 rounded-xl font-medium transition-all duration-200 cursor-pointer";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}