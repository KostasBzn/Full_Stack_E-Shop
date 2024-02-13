import { useContext } from "react";
import { UserContext } from "../context/userContext";
import ShopProducts from "../components/ShopProducts";
import CategorySearch from "../components/CategorySearch";

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <div className="flex">
        <div className="bg-customColor1 w-56 border-t-2 pt-5 flex-none">
          <CategorySearch className="h-full pt-6 px-4" />
        </div>
        <div className="flex-grow p-5 max-w-full">
          <ShopProducts />
        </div>
      </div>
    </>
  );
};

export default Home;
