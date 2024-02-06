import { Link } from "react-router-dom";

const ConfirmedUser = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <p className="text-center font-semibold">
          Your email is successfully confirmed! Click{" "}
          <Link
            to="/signin"
            className="text-customColor font-bold hover:underline"
          >
            here
          </Link>{" "}
          to sign in!
        </p>
      </div>
    </div>
  );
};

export default ConfirmedUser;
