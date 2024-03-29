import { useContext, useState } from "react";
import { ProductContext } from "../../context/productContext";

const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");

  const { addProduct, errors } = useContext(ProductContext);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFullDescriptionChange = (e) => {
    setFullDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("fullDescription", fullDescription);
    formData.append("price", price);
    formData.append("productImage", image);
    formData.append("category", category);
    formData.append("quantity", quantity);

    addProduct(formData);
  };
  return (
    <div className="max-w-md mt-10 mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Make the form wider in general but not the inputs */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="title"
            type="text"
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="description"
            type="text"
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="fullDescription"
          >
            Full Description:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="fullDescription"
            onChange={handleFullDescriptionChange}
            required
            style={{ height: "200px" }} // Make the textarea have a fixed height around 200px
          />
        </div>
        <div className="flex mb-4 justify-between">
          <div className="w-1/2 mr-2">
            {" "}
            {/* Make this input with less width */}
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="price"
              type="text"
              onChange={handlePriceChange}
              required
            />
          </div>
          <div className="w-1/2 ml-2">
            {" "}
            {/* Put the quantity next to it */}
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="quantity"
            >
              Quantity:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="quantity"
              type="text"
              onChange={handleQuantityChange}
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="category"
          >
            Category:
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="category"
            onChange={handleCategoryChange}
            required
          >
            <option value="">Select category</option>
            <option value="parts">Parts</option>
            <option value="frames">Frames</option>
            <option value="accessories">Accessories</option>
            <option value="bikes">Bikes</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="productImage"
          >
            Image:
          </label>
          <input
            className="block w-full"
            name="productImage"
            type="file"
            onChange={handleImageChange}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-customColor hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Product
          </button>
        </div>
      </form>
      <div className="flex items-left">
        {errors ? (
          <ul className="text-red-500 list-none list-inside text-left">
            {errors.map((err, i) => (
              <li className="py-1 text-sm" key={i}>
                - {err.message}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;
