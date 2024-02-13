import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const ForgotPass = () => {
  const { forgotPass, errors } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleFormEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    forgotPass(email);
  };

  return (
    <form
      className="flex flex-col items-center justify-center min-h-screen"
      onSubmit={handleContinue}
    >
      <div className="p-4 bg-white rounded-md shadow-md max-w-sm w-full">
        <p className="mb-2 text-sm text-center">
          By typing your email here you will receive a link in your email
          address. Follow the instructions to change your password.
        </p>

        <input
          type="text"
          placeholder="Type here your email.."
          onChange={handleFormEmail}
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
            Send
          </button>
        </div>
      </div>
    </form>
  );
};

export default ForgotPass;
