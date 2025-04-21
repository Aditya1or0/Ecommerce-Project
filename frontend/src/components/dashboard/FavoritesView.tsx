import FavoritesList from "./FavoriteList";

export default function FavoritesView() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Your Liked Products
      </h2>
      <FavoritesList />
    </div>
  );
}
