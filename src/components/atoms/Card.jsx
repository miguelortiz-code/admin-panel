export default function Card({ children }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 cursor-pointer">
      {children}
    </div>
  );
}