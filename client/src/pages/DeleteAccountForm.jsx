import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

const DeleteAccForm = () => {
  const [formText, setFormText] = useState("");
  const { user, deleteUser } = useContext(UserContext);

  const handleFormText = (e) => {
    setFormText(e.target.value);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (formText === "delete-account") {
      deleteUser(user._id);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-backgroundColor">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <p className="text-center font-semibold mb-4">
          By deleting your account, you will lose all your history and stored
          data.
          <br />
          Please confirm by typing <b>"delete-account"</b> in the form below.
        </p>
        <form
          onSubmit={handleDelete}
          className="flex items-center mt-4 rounded-md overflow-hidden"
        >
          <input
            type="text"
            onChange={handleFormText}
            className="border border-gray-300 p-3 rounded-l-md focus:outline-none focus:border-gray-500 flex-1"
            placeholder="Type 'delete-account'"
          />
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-r-md transition duration-300 ease-in-out"
            type="submit"
          >
            Delete Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteAccForm;
