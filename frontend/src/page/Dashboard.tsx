"use client";

import type React from "react";

import { useEffect, useState, useCallback, useRef } from "react";
import {
  User,
  ShieldCheck,
  Calendar,
  Mail,
  Edit,
  Activity,
  FileText,
  Camera,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import UserEditModal from "../components/UserEditModal";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface UserInfo {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  age?: number;
  dateOfBirth?: string;
  bio?: string;
  avatar?: string;
}

interface JwtPayload {
  email: string;
  sub: number;
  iat: number;
  exp: number;
}

export default function Dashboard() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Use callback to allow refreshing data after updates
  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Authentication token missing");
        return;
      }

      // Decode the JWT token to get the user ID
      const decoded = jwtDecode<JwtPayload>(token);
      const userId = decoded.sub; // Get user ID from sub claim

      const response = await axios.get(`http://localhost:3000/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser({
        id: response.data.id,
        firstName: response.data.firstName || "",
        lastName: response.data.lastName || "",
        email: response.data.email || "",
        age: response.data.age || 0,
        dateOfBirth: response.data.dateOfBirth || "",
        bio: response.data.bio || "",
        avatar: response.data.avatar || "",
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to load user data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file is an image
    if (!file.type.match(/image\/(jpeg|jpg|png|gif)/i)) {
      toast.error("Please select a valid image file (JPG, PNG, or GIF)");
      return;
    }

    // Validate file size
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large. Maximum size is 5MB");
      return;
    }

    try {
      setUploadingAvatar(true);
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Authentication token missing");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:3000/user/upload-avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the user state with the new avatar URL
      setUser((prevUser) => {
        if (prevUser) {
          return { ...prevUser, avatar: response.data.avatarUrl };
        }
        return prevUser;
      });
      fetchUserData(); //

      toast.success("Profile picture updated successfully");
      console.log("Avatar upload response:", response.data);
      console.log("Avatar URL:", response.data.avatarUrl);
      console.log(
        "Full image URL:",
        `http://localhost:3000${response.data.avatarUrl}`
      );
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Failed to upload profile picture");
    } finally {
      setUploadingAvatar(false);
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
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

  const getInitials = () => {
    if (user.firstName && user.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(
        0
      )}`.toUpperCase();
    } else if (user.firstName) {
      return user.firstName.charAt(0).toUpperCase();
    } else if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <div className="min-h-screen">
      {/* Hidden file input for avatar upload */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/jpeg,image/png,image/gif,image/jpg"
        onChange={handleAvatarChange}
      />

      {/* Top Navigation Bar */}
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
                          : `http://localhost:3000${user.avatar}`
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

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full lg:w-64 bg-white/70 rounded-lg shadow-md p-6 h-fit">
              <div className="flex flex-col items-center mb-6">
                {/* Avatar with upload indicator */}
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
                              : `http://localhost:3000${user.avatar}`
                          }
                          alt="Profile"
                          className="h-24 w-24 rounded-full object-cover"
                          onClick={handleAvatarClick}
                        />
                      ) : (
                        <div
                          className="h-24 w-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white text-3xl font-bold"
                          onClick={handleAvatarClick}
                        >
                          {getInitials()}
                        </div>
                      )}
                      <div
                        className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer shadow-lg hover:bg-blue-700 transition-colors"
                        onClick={handleAvatarClick}
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
                  <Activity className="w-5 h-5" />
                  <span>Activity</span>
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                {activeTab === "profile" && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/70 rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="p-6 bg-gradient-to-r from-cyan-500 to-blue-600 flex justify-between items-center">
                      <h2 className="text-xl font-bold text-white">
                        Personal Information
                      </h2>
                      <button
                        onClick={() => setShowModal(true)}
                        className="bg-white text-cyan-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-2"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit Profile</span>
                      </button>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div className="flex items-center space-x-4 group p-4 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors">
                              <User className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Full Name</p>
                              <p className="text-lg font-medium text-gray-800">
                                {`${user.firstName || ""} ${
                                  user.lastName || "Not specified"
                                }`}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 group p-4 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors">
                              <Mail className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">
                                Email Address
                              </p>
                              <p className="text-lg font-medium text-gray-800">
                                {user.email}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 group p-4 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors">
                              <Calendar className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">
                                Date of Birth
                              </p>
                              <p className="text-lg font-medium text-gray-800">
                                {user.dateOfBirth?.slice(0, 10) ||
                                  "Not specified"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="flex items-center space-x-4 group p-4 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors">
                              <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Age</p>
                              <p className="text-lg font-medium text-gray-800">
                                {user.age
                                  ? `${user.age} years`
                                  : "Not specified"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-4 group p-4 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors">
                              <FileText className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Bio</p>
                              <p className="text-lg font-medium text-gray-800">
                                {user.bio || "No bio provided"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "activity" && (
                  <motion.div
                    key="activity"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <h2 className="text-xl font-bold text-gray-800 mb-6">
                      Your Liked Products
                    </h2>
                    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                      <Activity className="w-16 h-16 mb-4 text-gray-300" />
                      <p className="text-lg">No recent activity to display</p>
                      <p className="text-sm mt-2">
                        Your activity will appear here
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <UserEditModal
          user={{
            id: user.id,
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            dateOfBirth: user.dateOfBirth || "",
            age: user.age || 0,
            bio: user.bio || "",
          }}
          onClose={() => setShowModal(false)}
          onUpdate={fetchUserData}
        />
      )}
    </div>
  );
}
