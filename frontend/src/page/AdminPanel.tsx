const AdminPanel = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-md">
      <h1 className="text-gray-800 font-bold text-3xl mb-6">Admin Panel</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-600 font-medium mb-1">Title</label>
          <input
            type="text"
            placeholder="Enter title"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Description
          </label>
          <textarea
            placeholder="Enter description"
            cols={30}
            rows={5}
            className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Category
          </label>
          <select
            name="category"
            id="category"
            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="jewelery">Jewelry</option>
            <option value="others">Others</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Upload Image
          </label>
          <input
            type="file"
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-gray-600 font-medium mb-1">
              Rating
            </label>
            <input
              type="number"
              placeholder="e.g. 4.5"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-600 font-medium mb-1">
              Rating Count
            </label>
            <input
              type="number"
              placeholder="e.g. 200"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 rounded-md mt-4 hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;
