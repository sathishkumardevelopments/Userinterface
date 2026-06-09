import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [forminput, setForminput] = useState({});
  const navigate = useNavigate();
  const changeHandler = (event) => {
    const { name, value } = event.target;

    setForminput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = async (datas) => {
    
    const {userid,password} = forminput

    if(!userid || !password){
      toast.error("Enter login credentials", { position: "top-right" });
      return;
    }
    try {
      const senddats = await axios.post(import.meta.env.VITE_API_URL+"/login", forminput);
      
      if (senddats?.data?.success) {
        
        localStorage.setItem("role",senddats?.data?.result?.role);
        localStorage.setItem("roleid",senddats?.data?.result._id);
        
        toast.success("Login successfull", { position: "top-right" });
        if(senddats?.data?.result?.role == "admin"){
          navigate("/admin/dashboard")
        }else{
          navigate("/home ")
        }
      }else{
        toast.error(senddats?.data?.message, { position: "top-right" });
      return;  
      }
    } catch (err) {
      toast.error(err.response.data.message, { position: "top-right" });
      return;
    }
  };

  return (
    <>
      <div className="appcontainer">
        <br />
        <div className="pb-10">
          <form className="w-full max-w-sm formlayout centerAligned">
            <div className="flex flex-col">
              <div className="formfieldSet py-3">
                <Label>Used ID</Label>
                <Input
                  type="text"
                  name="userid"
                  value={forminput?.userid}
                  placeholder="User ID"
                  onChange={changeHandler}
                />
              </div>
              <div className="formfieldSet py-3">
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={forminput?.password}
                  placeholder="Password"
                  onChange={changeHandler}
                />
              </div>

              <div className="formfieldSet text-center">
                <button
                  className="rounded-sm mainthemecolor text-sm px-2 py-1"
                  type="button"
                  onClick={() => submitForm()}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
