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
    //window.location.replace("/userprofile");
  };

  const handleAddAddress = () => {
    navigate("/address");
  };

  const handleDeleteProfile = () => {
    navigate("/deleteuser");
  };

  return (
    <>
      <div
        className="container flex  justify-between"
        style={{ height: "600px" }}
      >
        <div className="w-1/2 p-4">
          <h2 className="text-xl font-bold mb-4 text-center">
            Profile informations
          </h2>

          <div className="bg-gray-100 p-4 rounded-md shadow-md p-10">
            <p className="mb-4 font-bold text-lg">
              Add your profile picture here:
            </p>
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
          </div>

          <hr className="my-8 mb-20 mt-16 border-black" />
          <div className=" bg-gray-100 rounded-md shadow-md p-10">
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
              <div className="bg-gray-100 p-10 rounded-md shadow-md">
                <p className="mb-3">
                  <b>Name:</b> {user.address.firstname} {user.address.lastname}
                </p>
                <p className="mb-3">
                  <b>Street:</b> {user.address.street}
                </p>
                <p className="mb-3">
                  <b>City:</b> {user.address.city}
                </p>
                <p className="mb-3">
                  <b>Postal code:</b> {user.address.postalCode}
                </p>
                <p>
                  <b>Country:</b> {user.address.country}
                </p>
              </div>
            ) : (
              // Render message if no address is added
              <p>No address added yet.</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-10">
        <button
          onClick={handleDeleteProfile}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Delete Profile
        </button>
      </div>
    </>
  );
};

export default UserProfile;
