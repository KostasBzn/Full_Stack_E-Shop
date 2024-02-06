import { useContext } from "react";
import Navbar from "../components/Navbar";
import MainPage from "../components/MainPage";
import Footer from "../components/Footer";
import { UserContext } from "../context/userContext";

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <div>This is the home</div>
      {user ? <p>Hello {user.username}</p> : <p>loading user..</p>}
    </>
  );
};

export default Home;
