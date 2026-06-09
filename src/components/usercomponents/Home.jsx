import Header from "../usercomponents/Header";
import Productslist from "../usercomponents/Productslist";
import { toast } from "sonner";
import axios from "axios";
import { useState, useEffect } from "react";
import { useCart } from "../usercomponents/tools/Cardcontext";

const Home = () => {


  const { product } = useCart();
  
  return (
    <>
      <div className="">
        <div className="appcontainer py-5">
          <div className="bg-white rounded-sm px-2 py-5 ">
            <Productslist product={product} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
