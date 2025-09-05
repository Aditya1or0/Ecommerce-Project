"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";

import LoadingSpinner from "../components/dashboard/LoadingSpinner";
import NotLoggedInPrompt from "../components/dashboard/NotLoggedInPrompt";
import Dashbar from "../components/dashboard/DashBar";
import ProfileSidebar from "../components/dashboard/ProfileSlidebar";
import ProfileView from "../components/dashboard/ProfileView";
import FavoritesView from "../components/dashboard/FavoritesView";
import UserEditModal from "../components/dashboard/UserEditModal";

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

  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Authentication token missing");
        setLoading(false);
        return;
      }

      const decoded = jwtDecode<JwtPayload>(token);
      const userId = decoded.sub;

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // useEffect(() => {
  //   if (user && activeTab === "activity") {
  //     const token = localStorage.getItem("token");
  //   }
  // }, [user, activeTab, dispatch]);

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

    if (!file.type.match(/image\/(jpeg|jpg|png|gif)/i)) {
      toast.error("Please select a valid image file (JPG, PNG, or GIF)");
      return;
    }

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
        `${import.meta.env.VITE_BACKEND_URL}/user/upload-avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser((prevUser) =>
        prevUser ? { ...prevUser, avatar: response.data.avatarUrl } : prevUser
      );

      fetchUserData();
      toast.success("Profile picture updated successfully");
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Failed to upload profile picture");
    } finally {
      setUploadingAvatar(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const getInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    } else if (user?.firstName) {
      return user.firstName[0].toUpperCase();
    } else if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  if (loading) return <LoadingSpinner text="Loading your profile..." />;
  if (!user) return <NotLoggedInPrompt />;

  return (
    <div className="min-h-screen">
      {/* Hidden File Input for Avatar */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/jpeg,image/png,image/gif,image/jpg"
        onChange={handleAvatarChange}
      />

      {/* Top Navigation */}
      <Dashbar
        user={user}
        onAvatarClick={handleAvatarClick}
        getInitials={getInitials}
        setShowModal={setShowModal}
      />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <ProfileSidebar
            user={user}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            uploadingAvatar={uploadingAvatar}
            onAvatarClick={handleAvatarClick}
            getInitials={getInitials}
          />

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
                >
                  <ProfileView
                    user={user}
                    onEditClick={() => setShowModal(true)}
                  />
                </motion.div>
              )}

              {activeTab === "activity" && (
                <motion.div
                  key="activity"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <FavoritesView />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
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
