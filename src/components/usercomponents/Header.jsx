import "../../index.css";
import Searchbox from "../usercomponents/Searchbox";
import { CircleUser } from "lucide-react";
import Sidecart from "./tools/Sidecart";
import { useLocation, useNavigate } from "react-router-dom";
import { House } from "lucide-react";
import { Search } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userID = localStorage.getItem("roleid")
  const logOut = async() => {
    localStorage.clear();
    navigate('/')
  }
  return (
    <>
      <div className="mainthemecolor sticky top-0 z-50 bg-green-400 shadow-md">
        <div className="max-w-6xl mx-auto">
          <div className="headerdiv p-8 text-center">
            <h1>E-Commerce</h1>
            {/* <h3>Project</h3> */}
          </div>
        </div>
        {userID ?
        <div className="appcontainer flex flex-row justify-between gap-4 py-2">
          {location.pathname == "/home" ? <Searchbox /> : ""}

          <div className="flex justify-end gap-5">
            {/* <div className="px-2">
              <CircleUser />
            </div> */}
            <House onClick={() => navigate("/home")} />
            {location.pathname == "/checkout" ? (
              ""
            ) : (
              <div className="px-2">
                <Sidecart />
              </div>
            )}
            <button onClick={() => logOut()}>Logout</button>
          </div>
        </div>
        : "" }
      </div>
    </>
  );
};

export default Header;
