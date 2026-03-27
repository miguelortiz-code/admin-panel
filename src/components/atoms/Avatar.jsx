export default function Avatar({ src, alt = "User" }) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-10 h-10 rounded-full object-cover"
    />
  );
}