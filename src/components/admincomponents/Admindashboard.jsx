import Adminhome from "./Adminhome";
import TablePagination from "@mui/material/TablePagination";
import { FilePenLine } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Socket } from "../Socket";
const Admindashboard = () => {
  const [table, setTable] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    getData();
    Socket.emit("joinAdmin");
      

    const handleNewOrder = (order) => {
    console.log("NEW ORDER RECEIVED:", order);
    
    toast.success(`New order placed: ${order.orderid}`, { position: "top-right" });
    setTable(prev => [order, ...prev]);
  };

    Socket.on("newOrderPlaced", handleNewOrder);

    return () => {
      Socket.off("newOrderPlaced", handleNewOrder); 
    };

  }, []);

  const getData = async () => {
    try {
      const senddats = await axios.post(
        "http://localhost:5000/admin/listorder",
      );

      if (senddats?.data?.success) {
        setTable(senddats?.data?.result);
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
      <div>
        <div className="appcontainer">
          <div className="table-auto py-2">
            <table className="table-auto border border-gray-400 border-separate rounded-md centerAligned w-full text-center ">
              <thead className="tablehead">
                <tr>
                  <th>S.No</th>
                  <th>Order ID</th>
                  <th>Qty</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {table.length > 0 ? (
                  table.map((list, index) => (
                    <tr key={list._id || index}>
                      <td className="cellspacing">{index + 1}</td>
                      <td className="cellspacing">{list?.orderid}</td>
                      <td className="cellspacing">{list?.orderlist?.length}</td>
                      <td className="cellspacing">{list?.amount}</td>
                      <td className="cellspacing">{list?.status}</td>
                      <td className="cellspacing">
                        <button className="text-center" onClick={() => navigate('/admin/orderdetail',{ state: { order: list } })}>
                          <FilePenLine />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center">
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* <div>
            <TablePagination
              component="div"
              count={100}
              page={0}
              onPageChange={0}
              rowsPerPage={10}
              onRowsPerPageChange={0}
            />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Admindashboard;
