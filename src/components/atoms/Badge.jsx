export default function Badge({ count }) {
  return (
    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 rounded-full">
      {count}
    </span>
  );
}