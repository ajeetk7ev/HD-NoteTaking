import { useAuthStore } from "@/store/authStore";
import { Mail } from "lucide-react";

function UserCard() {
  const { user } = useAuthStore();

  return (
    <div className="w-fit mt-6 mx-auto flex items-center justify-center bg-white shadow-md rounded-xl py-5 px-10 mb-6 transition hover:shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* User Info */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Welcome, <span className="text-blue-600">{user?.name}</span> 👋
          </h2>
          <p className="flex items-center gap-2 text-gray-600 text-sm mt-1">
            <Mail className="w-4 h-4 text-gray-500" />
            <span>{user?.email}</span>
          </p>
        </div>

        
      </div>
    </div>
  );
}

export default UserCard;
