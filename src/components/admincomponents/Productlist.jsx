import TablePagination from '@mui/material/TablePagination';
import { FilePenLine } from 'lucide-react';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Productlist = () => {
  const loggedRole = localStorage.getItem("role")
  
  const navigate = useNavigate()
  const [table, setTable] = useState([]);
    useEffect(() => {
      getData();
    }, []);
    
    const getData = async () => {
      try {
        const senddats = await axios.post(
          "http://localhost:5000/admin/listproduct",
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
        <button type="button" className="bg-green-400 text-sm p-2 rounded-sm mt-2" onClick={() => {navigate('/admin/productcreation')}}>Add Product</button>

          <div className="table-auto py-2">
            <table className="table-auto border border-gray-400 border-separate rounded-md centerAligned w-full text-center ">
              <thead className="tablehead">
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Stock Qty</th>
                  {loggedRole == "admin" ? <th>Action</th> : ""}
                  
                </tr>
              </thead>
              <tbody>
                {table.length > 0 ? (
                  table.map((list, index) => (
                    <tr key={list._id || index}>
                      <td className="cellspacing">{index + 1}</td>
                      <td className="cellspacing">{list?.name}</td>
                      <td className="cellspacing">{list?.description}</td>
                      <td className="cellspacing">{list?.price}</td>
                      <td className="cellspacing">{list?.quantity}</td>
                      {loggedRole == "admin" ?
                      <td className="cellspacing">
                        <button className="text-center">
                          <FilePenLine onClick={() => navigate('/admin/productupdate',{ state: { product: list } })}/>
                        </button>
                      </td>
                      : ""
                      }
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
    )
}
 export default Productlist