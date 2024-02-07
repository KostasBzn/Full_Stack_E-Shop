import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, errors } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, password);
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-backgroundColor ">
        <div className="max-w-md w-full bg-white shadow-md rounded px-8 py-6 ">
          <h2 className="text-2xl font-bold mb-4">Sign In</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2 text-left"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-0">
              <label
                className="block text-sm font-bold mb-2 text-left"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
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
            <div className="flex items-center mt-3  justify-between">
              <button
                className="bg-customColor hover:bg-customColor text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
              <a
                className="text-sm  text-customColor hover:text-customColor"
                href="#"
              >
                Forgot password?
              </a>
            </div>
            <div className="mt-4 text-sm text-gray-600 text-center">
              New to e-shop?{" "}
              <Link to="/" className="text-customColor hover:text-customColo">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
