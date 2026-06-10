import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    getProducts()
  },[])

  const updateCart = (product, operator) => {
    const productId = product?._id;
    const productName = product?.name;
    const productAmount = product?.price
    
    setCart((prev) => {
      let found = false;

      let updated = prev.map((item) => {
        if (item.productId === productId) {
          found = true;

          if (operator === "add") {
            return { ...item, productNos: item.productNos + 1 };
          }

          if (operator === "sub") {
            return {
              ...item,
              productNos: Math.max(0, item.productNos - 1),
            };
          }
        }
        return item;
      });

      if (!found && operator === "add") {
        updated.push({
          productId,
          productName,
          productAmount,
          productNos: 1,
        });
      }

      return updated.filter((item) => item.productNos > 0);
    });
  };

  const removeFromCart = (id) => {
   setCart(prev => prev.filter(item => item.productId !== id));
  };

  const emptyCart = (id) => {
   setCart([]);
  };

  const searchProducts = async (search) => {
    const srcc = {
      search : search
    }
    console.log(srcc,"search----------")
    try{
      const senddats = await axios.post(import.meta.env.VITE_API_URL+"/users/fetchproducts", srcc);
      if(senddats?.data?.success){
        setProduct(senddats?.data?.result)
      }else{
        toast.error(senddats?.data?.message, { position: "top-right" });
        return;
      }
    }catch(err){
      console.log(err.message)
    }
  }

  const getProducts = async (search) => {
    
    try{
      const senddats = await axios.post(import.meta.env.VITE_API_URL+"/users/fetchproducts");
      if(senddats?.data?.success){
        setProduct(senddats?.data?.result)
      }else{
        toast.error(senddats?.data?.message, { position: "top-right" });
        return;
      }
    }catch(err){
      console.log(err.message)
    }
  }

 

  return (
    <CartContext.Provider value={{ cart, updateCart, removeFromCart, emptyCart, searchProducts, product, getProducts }}>
      {children}
    </CartContext.Provider>
  );
};
