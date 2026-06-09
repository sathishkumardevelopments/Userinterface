import Sidebaradmin from "./tools/Sidebaradmin";
import { Link } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useLocation, useNavigate } from "react-router-dom";

const Adminheader = () => {
  const navigate = useNavigate()
  


  const logOut = async() => {
    localStorage.clear();
    navigate('/admin')
  }
  const location = useLocation();
  return (
    <>
      <div className="mainthemecolor sticky top-0 z-50 bg-green-400 shadow-md">
        <div className="max-w-6xl mx-auto">
          <div className="headerdiv p-8 text-center">
            <h1>E-Commerce</h1>
            <h3>Project</h3>
          </div>
          {location?.pathname == "/admin" ? "" : <div className="text-end" onClick={() => logOut()}>Logout</div>}
          

        </div>
      </div>
      <div>
        {(location.pathname != "/admin" && location.pathname != "/admin/") ? 
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link to="/admin/dashboard">Dashboard</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link to="/admin/productlist">Products</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          
        </NavigationMenuList>
      </NavigationMenu>
      : ""}
      </div>
    </>
  );
};

export default Adminheader;
