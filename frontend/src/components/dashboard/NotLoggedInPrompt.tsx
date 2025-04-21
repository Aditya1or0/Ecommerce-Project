import { useNavigate } from "react-router-dom";

export default function NotLoggedInPrompt() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <p className="text-red-500 text-center text-lg font-medium">
          You are not logged in
        </p>
        <button
          className="mt-4 w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:opacity-80 transition-colors"
          onClick={() => navigate("/login")}
        >
          Return to Login
        </button>
      </div>
    </div>
  );
}
