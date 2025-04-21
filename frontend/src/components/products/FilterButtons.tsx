import React from "react";
import { motion } from "framer-motion";

interface FilterButtonsProps {
  selectedFilter: string;
  handleFilterChange: (filter: string) => void;
  setSelectedFilter: (filter: string) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  selectedFilter,
  handleFilterChange,
  setSelectedFilter,
}) => {
  const filters = ["men", "women", "jewelry", "others"];
  const buttonAnimation = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="flex flex-wrap gap-4 items-center py-4 px-6 mb-6">
      <span className="font-semibold text-lg w-full sm:w-auto">Filter by:</span>
      <motion.button
        whileHover="hover"
        whileTap="tap"
        variants={buttonAnimation}
        onClick={() => {
          setSelectedFilter("");
        }}
        className={`px-4 py-2 rounded-lg border border-gray-300 font-medium ${
          !selectedFilter ? "bg-sky-600 text-white" : "hover:bg-sky-100"
        }`}
      >
        All
      </motion.button>
      {filters.map((filter) => (
        <motion.button
          key={filter}
          whileHover="hover"
          whileTap="tap"
          variants={buttonAnimation}
          onClick={() => handleFilterChange(filter)}
          className={`px-4 py-2 rounded-lg border border-gray-300 font-medium ${
            selectedFilter === filter
              ? "bg-sky-600 text-white"
              : "hover:bg-sky-100"
          }`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </motion.button>
      ))}
    </div>
  );
};

export default FilterButtons;
