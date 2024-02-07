import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const UserProfile = () => {
  const { user, updateUser } = useContext(UserContext);

  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profileImage", file);
    updateUser(user._id, formData);
  };

  const handleAddAddress = () => {
    navigate("/address");
  };

  return (
    <div className="container flex justify-between" style={{ height: "500px" }}>
      <div className="w-1/2 p-4">
        <h2 className="text-xl font-bold mb-4 text-center">
          Profile informations
        </h2>
        <p className="mb-4 font-bold text-lg">Add your profile picture here:</p>
        <form onSubmit={handleUpload}>
          <input
            type="file"
            name="profileImage"
            className="mb-4"
            onChange={handleFileChange}
          />
          <button className="bg-customColor text-white px-4 py-2 rounded">
            Upload
          </button>
        </form>
        <hr className="my-8 mb-20 mt-16 border-black" />
        <div className=" pb-4">
          <p className="font-bold text-lg">
            Edit your shipping information here:
          </p>
          <button
            className="mt-4 bg-customColor  text-white px-4 py-2 rounded"
            onClick={handleAddAddress}
          >
            Edit Address
          </button>
        </div>
      </div>
      <div className="w-1/2 flex p-4 justify-center">
        <div>
          <h2 className="text-xl font-bold mb-4 text-center">
            Address Information
          </h2>
          {user?.address ? (
            // Render user's address if available
            <p>{user.address.firstname}</p>
          ) : (
            // Render message if no address is added
            <p>No address added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
