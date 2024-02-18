import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function ChangePass() {
  const { token } = useParams();
  const [newPass, setNewPass] = useState("");
  const [newPassRepeat, setNewPassRepeat] = useState("");
  const { errors, changePass } = useContext(UserContext);
  const navigate = useNavigate();

  const handleNewPass = (e) => {
    setNewPass(e.target.value);
  };

  const handleNewPassRepeat = (e) => {
    setNewPassRepeat(e.target.value);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPass === newPassRepeat) {
      console.log("pass", newPass);
      console.log("token", token);
      //changePass(newPass, token);
      setNewPass("");
      setNewPassRepeat("");
    } else alert("Password inputs don't match");
  };

  return (
    <form
      className="flex flex-col items-center justify-center min-h-screen"
      onSubmit={handleChangePassword}
    >
      <div className="p-4 bg-white rounded-md shadow-md max-w-sm w-full">
        <p className="mb-2 text-ms text-center">Type your new password</p>

        <input
          type="password"
          placeholder="Type here your new password.."
          onChange={handleNewPass}
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:shadow-outline"
        />
        <input
          type="password"
          placeholder="Repeat your new password.."
          onChange={handleNewPassRepeat}
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:shadow-outline"
        />
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
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full mt-3 py-3 text-white bg-customColor rounded focus:outline-none focus:shadow-outline"
            style={{ width: "40%" }} // Narrower button width
          >
            Change Password
          </button>
        </div>
      </div>
    </form>
  );
}
