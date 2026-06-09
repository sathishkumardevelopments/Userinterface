import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const Productcreation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  
  const productToEdit = location.state?.product;

  const [forminput, setForminput] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    image: null,
  });

  
  useEffect(() => {
    if (productToEdit) {
      setForminput({
        name: productToEdit.name || "",
        description: productToEdit.description || "",
        price: productToEdit.price || "",
        quantity: productToEdit.quantity || "",
        image: null, 
      });
    }
  }, [productToEdit]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForminput((prev) => ({ ...prev, [name]: value }));
  };

  const imageHandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      setForminput((prev) => ({ ...prev, image: e.target.files[0] }));
    }
  };

  const submitForm = async () => {
    const { name, description, price, quantity, image } = forminput;

    if (!name || !description || !price || !quantity) {
      toast.error("Provide all details", { position: "top-right" });
      return;
    }

    if (price <= 0) {
      toast.error("Price must be greater than 0", { position: "top-right" });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    if (image) formData.append("image", image);

    
    if (productToEdit?._id) formData.append("_id", productToEdit._id);
    if (productToEdit?._id) formData.append("update", "true");


    const url = productToEdit
      ? "http://localhost:5000/admin/handleproduct"
      : "http://localhost:5000/admin/createproduct";

    try {
      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response?.data?.success) {
        toast.success(
          `Product ${productToEdit ? "updated" : "created"} successfully`,
          { position: "top-right" }
        );
        navigate("/admin/productlist");
      }else{
        toast.error(response?.data?.message, { position: "top-right" });  
        return;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="appcontainer">
      <h3>{productToEdit ? "Update Product" : "Create Product"}</h3>
      <br />
      <div className="pb-10">
        <form className="w-full max-w-lg formlayout centerAligned">
          <div className="flex flex-col">
            <div className="formfieldSet">
              <Label>Product Name</Label>
              <Input
                name="name"
                value={forminput.name}
                placeholder="Name"
                onChange={changeHandler}
              />
            </div>
            <div className="formfieldSet">
              <Label>Product Description</Label>
              <Input
                name="description"
                value={forminput.description}
                placeholder="Description"
                onChange={changeHandler}
              />
            </div>
            <div className="formfieldSet">
              <Label>Price</Label>
              <Input
                name="price"
                type="number"
                value={forminput.price}
                placeholder="Price"
                onChange={changeHandler}
              />
            </div>
            <div className="formfieldSet">
              <Label>Stock Qty</Label>
              <Input
                name="quantity"
                type="number"
                value={forminput.quantity}
                placeholder="Quantity"
                onChange={changeHandler}
              />
            </div>
            <div className="formfieldSet">
              <Label>Image Upload</Label>
              <br />
              <input type="file" name="image" onChange={imageHandler} />
            </div>
            <div className="formfieldSet">
              <Button
                type="button"
                className="rounded-sm mainthemecolor text-sm px-2 py-1"
                onClick={submitForm}
              >
                {productToEdit ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Productcreation;