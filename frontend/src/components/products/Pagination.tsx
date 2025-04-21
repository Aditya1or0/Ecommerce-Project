import React from "react";
import { motion } from "framer-motion";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

const buttonAnimation = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 },
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  paginate,
}) => {
  return (
    <motion.div
      className="flex justify-center mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <nav className="flex items-center">
        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={buttonAnimation}
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </motion.button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <motion.button
            key={number}
            whileHover="hover"
            whileTap="tap"
            variants={buttonAnimation}
            onClick={() => paginate(number)}
            className={`px-4 py-2 mx-1 rounded-md ${
              currentPage === number
                ? "bg-cyan-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {number}
          </motion.button>
        ))}

        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={buttonAnimation}
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </motion.button>
      </nav>
    </motion.div>
  );
};

export default Pagination;
