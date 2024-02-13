import { useContext } from "react";

import { UserContext } from "../context/userContext";
import ShopProducts from "../components/ShopProducts";

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <div>
        <ShopProducts />
      </div>
    </>
  );
};

export default Home;
