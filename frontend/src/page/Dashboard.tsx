import React from "react";
import { User, ShieldCheck, Calendar, Mail, Phone } from "lucide-react";

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  dob: string;
}

const UserInfoCard: React.FC<{ user: UserInfo }> = ({ user }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-md transform transition-all duration-300 hover:shadow-xl border border-gray-100">
      {/* Card Header with Gradient */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-6 relative">
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-full shadow-md border-4 border-white">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full p-3">
            <User size={36} className="text-white" />
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="pt-16 pb-8 px-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">
          {user.name}
        </h2>
        <p className="text-center text-gray-500 mb-6 flex items-center justify-center gap-1">
          <ShieldCheck size={16} className="text-green-500" />
          <span>Verified User</span>
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg transition-all hover:bg-gray-100">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Mail size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="font-medium text-gray-800">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg transition-all hover:bg-gray-100">
            <div className="bg-green-100 p-2 rounded-lg">
              <Phone size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="font-medium text-gray-800">{user.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg transition-all hover:bg-gray-100">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Calendar size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-medium text-gray-800">{user.dob}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="border-t border-gray-100 p-4 bg-gray-50">
        <button className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg transition-all hover:opacity-90">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const user: UserInfo = {
    name: "Aditya Sharma",
    email: "a@xyz.com",
    phone: "+91 9876543210",
    dob: "01-Apr-1995",
  };

  return (
    <div className="min-h-screen  flex flex-col items-center p-6">
      {/* Header with Animation */}
      <div className="w-full max-w-4xl mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2">
          My{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">
            Dashboard
          </span>
        </h1>
        <p className="text-gray-500">
          Welcome back, Aditya! Your personal dashboard awaits.
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Main User Card */}
        <UserInfoCard user={user} />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 h-fit">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Activity Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Login Streak</span>
                <span className="font-medium text-green-600">8 days</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-600">Profile Completion</span>
                <span className="font-medium text-blue-600">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Recent Notifications
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-full mt-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <p className="text-gray-800 font-medium">Security Update</p>
                  <p className="text-gray-500 text-sm">
                    Your password was changed 5 days ago
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full mt-1">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
                <div>
                  <p className="text-gray-800 font-medium">Account Verified</p>
                  <p className="text-gray-500 text-sm">
                    Your account was successfully verified
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
