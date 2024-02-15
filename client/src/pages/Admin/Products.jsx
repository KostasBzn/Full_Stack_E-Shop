import { useContext } from "react";
import { ProductContext } from "../../context/productContext";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const { allProducts, deleteProduct, findProduct } =
    useContext(ProductContext);
  const baseURL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const handleDelete = (productId) => {
    deleteProduct(productId);
  };

  const handleEdit = (productId) => {
    findProduct(productId);
    navigate("/admin/editproduct");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {allProducts?.map((product) => (
        <div key={product._id} className="border rounded-md p-4">
          <img
            src={baseURL + "/uploads/prdim/" + product.image}
            alt={product.title}
            className="w-full h-60 object-cover mb-2"
          />
          <h3 className="text-lg font-bold mb-2">{product.title}</h3>
          <p className="text-sm mb-2">{product.description}</p>
          <p className="text-sm mb-2">
            <b>Price:</b> {product.price} €
          </p>
          <p className="text-sm mb-2">
            {" "}
            <b>Quantity:</b> {product.quantity}
          </p>
          <p className="text-sm mb-2">
            {" "}
            <b>Category:</b>{" "}
            {product.category.charAt(0).toUpperCase() +
              product.category.slice(1)}
          </p>

          <div className="flex justify-between">
            <button
              onClick={() => handleEdit(product._id)}
              className="text-xl hover:text-blue-700 text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button
              onClick={() => handleDelete(product._id)}
              className="text-xl hover:text-red-700 text-red-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <i className="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
