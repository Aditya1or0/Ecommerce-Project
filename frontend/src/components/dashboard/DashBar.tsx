interface Props {
  user: {
    firstName?: string;
    lastName?: string;
    avatar?: string;
    email?: string;
  };
  onAvatarClick: () => void;
  getInitials: () => string;
  setShowModal: (val: boolean) => void;
}
console.log(import.meta.env.VITE_BACKEND_URL);

export default function Dashbar({ user, getInitials, setShowModal }: Props) {
  return (
    <nav className="bg-white/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600 font-bold">
              MyDashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                className="flex items-center space-x-2 focus:outline-none"
                onClick={() => setShowModal(true)}
              >
                {user.avatar ? (
                  <img
                    src={
                      user.avatar?.startsWith("http")
                        ? user.avatar
                        : `${import.meta.env.VITE_BACKEND_URL}/${user.avatar}`
                    }
                    alt="Profile"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-medium">
                    {getInitials()}
                  </div>
                )}
                <span className="text-gray-700 hidden sm:block">{`${
                  user.firstName || ""
                } ${user.lastName || ""}`}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
