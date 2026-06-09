import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/usercomponents/Header";
import Footer from "./components/usercomponents/Footer";
import Login from "./components/usercomponents/Login";
import Home from "./components/usercomponents/Home";
import Product from "./components/usercomponents/Product";
import Checkout from "./components/usercomponents/Checkout";
import Orderstatus from "./components/usercomponents/Orderstatus";
import Admindashboard from "./components/admincomponents/Admindashboard";
import Orderlist from "./components/admincomponents/Orderlist";
import Orderdetail from "./components/admincomponents/Orderdetail";
import Productcreation from "./components/admincomponents/Productcreation";
import Productlist from "./components/admincomponents/Productlist";
import { useLocation } from "react-router-dom";
import Adminheader from "./components/admincomponents/Adminheader";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { CartProvider } from "./components/usercomponents/tools/Cardcontext";
import { Socket } from "./components/Socket";

function App() {
  const location = useLocation();

  useEffect(() => {
    const role = localStorage.getItem("role");
    const roleId = localStorage.getItem("roleid");

    Socket.connect();

    Socket.on("connect", () => {
      console.log("Socket connected from App.js:", Socket.id);
      if (role === "admin") {
        Socket.emit("joinAdmin");
      } else {
        Socket.emit("joinOrderRoom", roleId);
      }
    });

    Socket.on("orderStatusUpdated", (data) => {
      console.log("Order update received:", data);

      toast.success(`Order ${data.orderid} is now ${data.status}`, {
        duration: 4000,position: "top-right"
      });
    });

    return () => {
      Socket.off("orderStatusUpdated"); 
    };

    
  }, []);

  return (
    <>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          {location.pathname.startsWith("/admin") ? (
            <Adminheader />
          ) : (
            <Header />
          )}
          <main className="flex-1">
            <Routes>
              {/* <Route path="/" element={<Login />} /> */}
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orderstatus" element={<Orderstatus />} />

              <Route path="/admin">
                <Route index element={<Login />} />
                <Route path="dashboard" element={<Admindashboard />} />
                <Route path="orderdetail" element={<Orderdetail />} />
                <Route path="productcreation" element={<Productcreation />} />
                <Route path="productupdate" element={<Productcreation />} />
                <Route path="productlist" element={<Productlist />} />
              </Route>
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      </CartProvider>
    </>
  );
}

export default App;
