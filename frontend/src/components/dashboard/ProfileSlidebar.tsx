import { Camera, User, Heart } from "lucide-react";

interface Props {
  user: any;
  activeTab: string;
  uploadingAvatar: boolean;
  setActiveTab: (tab: string) => void;
  onAvatarClick: () => void;
  getInitials: () => string;
}

export default function ProfileSidebar({
  user,
  activeTab,
  setActiveTab,
  uploadingAvatar,
  onAvatarClick,
  getInitials,
}: Props) {
  return (
    <div className="w-full lg:w-64 bg-white/70 rounded-lg shadow-md p-6 h-fit">
      <div className="flex flex-col items-center mb-6">
        <div className="relative group mb-4">
          {uploadingAvatar ? (
            <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              {user.avatar ? (
                <img
                  src={
                    user.avatar?.startsWith("http")
                      ? user.avatar
                      : `${import.meta.env.VITE_BACKEND_URL}/${user.avatar}`
                  }
                  alt="Profile"
                  className="h-24 w-24 rounded-full object-cover"
                  onClick={onAvatarClick}
                />
              ) : (
                <div
                  className="h-24 w-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white text-3xl font-bold"
                  onClick={onAvatarClick}
                >
                  {getInitials()}
                </div>
              )}
              <div
                className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer shadow-lg hover:bg-blue-700 transition-colors"
                onClick={onAvatarClick}
              >
                <Camera className="h-4 w-4 text-white" />
              </div>
            </>
          )}
        </div>
        <h2 className="text-xl font-semibold text-gray-800">{`${
          user.firstName || ""
        } ${user.lastName || ""}`}</h2>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => setActiveTab("profile")}
          className={`w-full flex items-center space-x-2 p-2 rounded-md transition-colors ${
            activeTab === "profile"
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </button>
        <button
          onClick={() => setActiveTab("activity")}
          className={`w-full flex items-center space-x-2 p-2 rounded-md transition-colors ${
            activeTab === "activity"
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Heart className="w-5 h-5" />
          <span>Your Favorites</span>
        </button>
      </div>
    </div>
  );
}
