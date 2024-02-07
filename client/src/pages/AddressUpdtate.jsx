import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const AddressUpdate = () => {
  const { user, updateUser } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.address) {
      setFirstName(user.address.firstname);
      setLastName(user.address.lastname);
      setStreet(user.address.street);
      setCity(user.address.city);
      setPostalCode(user.address.postalCode);
      setCountry(user.address.country);
    }
  }, []);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleStreetChange = (e) => {
    setStreet(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      firstname: firstName,
      lastname: lastName,
      street: street,
      city: city,
      postalCode: postalCode,
      country: country,
    };
    console.log(updatedData);
    updateUser(user._id, { address: updatedData });
    navigate("/userprofile");
  };

  return (
    <>
      <div className="container mt-14 mb-14 mx-auto max-w-lg p-6 bg-gray-100 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Update Address</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name:
              </label>
              <input
                type="text"
                onChange={handleFirstNameChange}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name:
              </label>
              <input
                type="text"
                onChange={handleLastNameChange}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Street:
              </label>
              <input
                type="text"
                onChange={handleStreetChange}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City:
                </label>
                <input
                  type="text"
                  onChange={handleCityChange}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Postal code:
                </label>
                <input
                  type="text"
                  onChange={handlePostalCodeChange}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Country:
              </label>
              <input
                type="text"
                onChange={handleCountryChange}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-block bg-customColor text-white px-4 py-2 rounded"
            >
              Update Address
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default AddressUpdate;
