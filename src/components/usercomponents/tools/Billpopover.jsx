import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Socket } from "../../Socket";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useCart } from './Cardcontext'
import { useNavigate } from "react-router-dom";
import Orderstatus from "../Orderstatus"


const Billpopover = ({ data }) => {
  const { emptyCart } = useCart();
  const navigate = useNavigate();
  const [orders, setOrders] = useState({
    customername: "",
    customernumber: "",
    deliveryaddress: "",
    paymentmode: "cod",
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;

    setOrders((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentChange = (value) => {
    setOrders((prev) => ({
      ...prev,
      paymentmode: value,
    }));
  };

  const placeOrders = async () => {
    const { customername, customernumber, deliveryaddress, paymentmode } =
      orders;
    if (!customername || !customernumber || !deliveryaddress || !paymentmode) {
      toast.error("Provide valid details", { position: "top-right" });
      return;
    }
    try {
      let togive = {
        orders: orders,
        data: data,
      };
      const senddats = await axios.post(
        import.meta.env.VITE_API_URL+"/users/placeorder",
        togive,
      );

      if (senddats?.data?.success) {
        toast.success("Order placed successfully", { position: "top-right" });
        let setpre = {
          customername: "",
          customernumber: "",
          deliveryaddress: "",
          paymentmode: "cod",
        };
        setOrders(setpre);
        emptyCart();

        const cancelBtn = document.getElementById("cancelbox");
        if (cancelBtn) cancelBtn.click();

        const cancelBtns = document.getElementById("canvascloser");
        if (cancelBtns) cancelBtns.click();
        
        navigate("/orderstatus", { state: { order: senddats.data.result } });


      }else{
        toast.error(senddats?.data?.message, { position: "top-right" });
        return;
      }
    } catch (err) {
      toast.error("Unable to place order", { position: "top-right" });
      const cancelBtn = document.getElementById("cancelbox");
      if (cancelBtn) cancelBtn.click();
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Add address to proceed</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="rounded-md bg-green-400">
          <Card className="rounded-sm">
            <CardContent>
              <div className="pb-2">
                <Label>Name</Label>
                <Input
                  id="input-demo-api-key"
                  type="text"
                  placeholder="Name..."
                  name="customername"
                  value={orders?.customername}
                  onChange={changeHandler}
                />
              </div>
              <div className="pb-2">
                <Label>Contact Number</Label>
                <Input
                  id="input-demo-api-key"
                  type="text"
                  placeholder="Contact Number..."
                  name="customernumber"
                  value={orders?.customernumber}
                  onChange={changeHandler}
                />
              </div>
              <div>
                <Label>Address of delivery</Label>
                <Input
                  id="input-demo-api-key"
                  type="text"
                  placeholder="Address..."
                  name="deliveryaddress"
                  value={orders?.deliveryaddress}
                  onChange={changeHandler}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Label>Mode of payment</Label>
              <RadioGroup
                value={orders?.paymentmode}
                onValueChange={handlePaymentChange}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod">COD</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="online" id="online" />
                  <Label htmlFor="online">Online</Label>
                </div>
              </RadioGroup>
            </CardFooter>
          </Card>

          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-sm" id="cancelbox">
              Cancel
            </AlertDialogCancel>
            <Button
              className="rounded-sm bg-white fontblack"
              onClick={() => placeOrders()}
            >
              Place Order
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Billpopover;
