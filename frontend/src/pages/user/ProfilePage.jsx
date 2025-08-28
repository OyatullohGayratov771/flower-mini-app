import { useAuth } from "../../context/AuthContext";
import { User } from "lucide-react";

export default function ProfilePage() {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500">⏳ Tekshirilmoqda...</p>
    );
  if (!user)
    return (
      <p className="text-center mt-10 text-red-500">❌ User topilmadi</p>
    );

  return (
    <div className="max-w-2xl mx-auto mt-12 px-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-r from-rose-400 to-pink-500 flex items-center justify-center shadow-lg">
          <User className="w-14 h-14 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-rose-700 mt-4">
          {user.FirstName} {user.LastName}
        </h1>
        <p className="text-gray-500">@{user.Username}</p>
      </div>

      {/* Info Card */}
      <div className="bg-white shadow-xl rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-rose-600 mb-4">
          👤 Account Information
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">First Name</span>
            <span className="text-gray-800">{user.FirstName}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Last Name</span>
            <span className="text-gray-800">{user.LastName}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Username</span>
            <span className="text-gray-800">@{user.Username}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Role</span>
            <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-medium">
              {user.Role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
