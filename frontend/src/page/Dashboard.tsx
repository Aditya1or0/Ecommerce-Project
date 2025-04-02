import React, { useEffect } from "react";
import {
  User,
  ShieldCheck,
  Calendar,
  Mail,
  Phone,
  Bell,
  Shield,
} from "lucide-react";
import { motion, useAnimation } from "framer-motion";

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  dob: string;
}

const UserInfoCard: React.FC<{ user: UserInfo }> = ({ user }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    });
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const iconBoxMotion = {
    rest: { scale: 1 },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-md transform hover:shadow-xl border border-gray-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Card Header with Gradient */}
      <motion.div
        className="bg-gradient-to-r from-cyan-500 to-blue-600 p-6 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-full shadow-md border-4 border-white"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        >
          <motion.div
            className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full p-3"
            whileHover={{ rotate: 10, scale: 1.05 }}
          >
            <User size={36} className="text-white" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Card Content */}
      <motion.div
        className="pt-16 pb-8 px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <motion.h2
          className="text-2xl font-bold text-center text-gray-800 mb-1"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {user.name}
        </motion.h2>
        <motion.p
          className="text-center text-gray-500 mb-6 flex items-center justify-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <ShieldCheck size={16} className="text-green-500" />
          <span>Verified User</span>
        </motion.p>

        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg transition-all hover:bg-gray-100"
            variants={itemVariants}
            whileHover="hover"
            initial="rest"
          >
            <motion.div
              className="bg-blue-100 p-2 rounded-lg"
              variants={iconBoxMotion}
            >
              <Mail size={20} className="text-blue-600" />
            </motion.div>
            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="font-medium text-gray-800">{user.email}</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg transition-all hover:bg-gray-100"
            variants={itemVariants}
            whileHover="hover"
            initial="rest"
          >
            <motion.div
              className="bg-green-100 p-2 rounded-lg"
              variants={iconBoxMotion}
            >
              <Phone size={20} className="text-green-600" />
            </motion.div>
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="font-medium text-gray-800">{user.phone}</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg transition-all hover:bg-gray-100"
            variants={itemVariants}
            whileHover="hover"
            initial="rest"
          >
            <motion.div
              className="bg-purple-100 p-2 rounded-lg"
              variants={iconBoxMotion}
            >
              <Calendar size={20} className="text-purple-600" />
            </motion.div>
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-medium text-gray-800">{user.dob}</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Card Footer */}
      <motion.div
        className="border-t border-gray-100 p-4 bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.button
          className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg transition-all hover:opacity-90"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Edit Profile
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

const Dashboard: React.FC = () => {
  const user: UserInfo = {
    name: "Aditya Sharma",
    email: "a@xyz.com",
    phone: "+91 9876543210",
    dob: "01-Apr-1995",
  };

  // Animation for progress bars
  const ProgressBar: React.FC<{
    value: number;
    color: string;
    delay: number;
  }> = ({ value, color, delay }) => {
    const controls = useAnimation();

    useEffect(() => {
      controls.start({
        width: `${value}%`,
        transition: { duration: 1.5, delay, ease: "easeOut" },
      });
    }, [controls, value, delay]);

    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <motion.div
          className={`${color} h-2.5 rounded-full`}
          initial={{ width: "0%" }}
          animate={controls}
        />
      </div>
    );
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header with Animation */}
      <motion.div
        className="w-full max-w-4xl mb-10 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          My{" "}
          <motion.span
            className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Dashboard
          </motion.span>
        </motion.h1>
        <motion.p
          className="text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Welcome back, Aditya! Your personal dashboard awaits.
        </motion.p>
      </motion.div>

      <motion.div
        className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {/* Main User Card */}
        <UserInfoCard user={user} />

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 gap-4 h-fit"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3
              className="text-lg font-semibold text-gray-700 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Activity Summary
            </motion.h3>
            <div className="space-y-3">
              <motion.div
                className="flex justify-between items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <span className="text-gray-600">Login Streak</span>
                <span className="font-medium text-green-600">8 days</span>
              </motion.div>
              <ProgressBar value={80} color="bg-green-600" delay={1} />

              <motion.div
                className="flex justify-between items-center mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <span className="text-gray-600">Profile Completion</span>
                <span className="font-medium text-blue-600">85%</span>
              </motion.div>
              <ProgressBar value={85} color="bg-blue-600" delay={1.2} />
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            whileHover={{ y: -5 }}
          >
            <motion.h3
              className="text-lg font-semibold text-gray-700 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              Recent Notifications
            </motion.h3>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <motion.div
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
              >
                <motion.div
                  className="bg-blue-100 p-2 rounded-full mt-1"
                  whileHover={{ scale: 1.2 }}
                >
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </motion.div>
                <div>
                  <p className="text-gray-800 font-medium">Security Update</p>
                  <p className="text-gray-500 text-sm">
                    Your password was changed 5 days ago
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                <motion.div
                  className="bg-green-100 p-2 rounded-full mt-1"
                  whileHover={{ scale: 1.2 }}
                >
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </motion.div>
                <div>
                  <p className="text-gray-800 font-medium">Account Verified</p>
                  <p className="text-gray-500 text-sm">
                    Your account was successfully verified
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
