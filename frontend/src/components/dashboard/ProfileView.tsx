import {
  Calendar,
  Edit,
  FileText,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";

export default function ProfileView({ user, onEditClick }: any) {
  return (
    <div className="bg-white/70 rounded-lg shadow-md overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-cyan-500 to-blue-600 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Personal Information</h2>
        <button
          onClick={onEditClick}
          className="bg-white text-cyan-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-2"
        >
          <Edit className="w-4 h-4" />
          <span>Edit Profile</span>
        </button>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <InfoCard
            icon={<User />}
            label="Full Name"
            value={`${user.firstName || ""} ${
              user.lastName || "Not specified"
            }`}
          />
          <InfoCard icon={<Mail />} label="Email Address" value={user.email} />
          <InfoCard
            icon={<Calendar />}
            label="Date of Birth"
            value={user.dateOfBirth?.slice(0, 10) || "Not specified"}
          />
        </div>

        <div className="space-y-6">
          <InfoCard
            icon={<ShieldCheck />}
            label="Age"
            value={user.age ? `${user.age} years` : "Not specified"}
          />
          <InfoCard
            icon={<FileText />}
            label="Bio"
            value={user.bio || "No bio provided"}
          />
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center space-x-4 group p-4 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-lg font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}
