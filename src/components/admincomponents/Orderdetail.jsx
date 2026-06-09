import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";

const Orderdetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    if (location.state?.order) {
      setData(location.state.order);
      setSelectedStatus(location.state.order.status);
    } else {
      navigate("/admin/dashboard");
    }
  }, [location.state, navigate]);

  const sendData = {
    orderid: data?.orderid,
    status: selectedStatus,
  };

  const updateAll = async (datas, e) => {
    // e.preventDefault();

    try {
      const senddats = await axios.post(
        import.meta.env.VITE_API_URL+"/admin/handleorder",
        sendData,
      );

      if (senddats?.data?.success) {
        toast.success("Status updated successfully", { position: "top-right" });
      } else {
        toast.error(senddats?.data?.message, { position: "top-right" });
        return;
      }
    } catch (err) {
      toast.error(err.response.data.message, { position: "top-right" });
      return;
    }
  };

  const status = [
    "Order Placed",
    "Accepted by Admin",
    "Packed",
    "Out for Delivery",
    "Delivered",
  ];
  return (
    <>
      <div className="appcontainer">
        <h3>Order Details</h3>

        <br />
        <div className="pb-10">
          <form className="w-full max-w-lg formlayout centerAligned">
            <div className="flex flex-col">
              <div className="formfieldSet">
                <Label>Order ID</Label>
                <Input
                  name="name"
                  value={data?.orderid}
                  placeholder="Name"
                  readOnly
                />
              </div>
              <div className="formfieldSet">
                <Label>Total Amount</Label>
                <Input
                  name=""
                  value={data?.amount}
                  placeholder="Name"
                  readOnly
                />
              </div>

              <div className="formfieldSet">
                <Label>Status</Label>
                <Combobox
                  items={status}
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <ComboboxInput placeholder="Select status" />
                  <ComboboxContent>
                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                    <ComboboxList>
                      {(item) => (
                        <ComboboxItem key={item} value={item}>
                          {item}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </div>
            </div>
            <button
              type="button"
              className="mt-5 bg-green-400 rounded-sm text-sm p-2"
              onClick={() => updateAll()}
            >
              Update
            </button>
          </form>
        </div>
        <br />
        {/* <div className="w-full max-w-lg py-5 formlayout centerAligned">
          <div className="flex flex-col">
           
          </div>
        </div> */}
      </div>
    </>
  );
};
export default Orderdetail;
