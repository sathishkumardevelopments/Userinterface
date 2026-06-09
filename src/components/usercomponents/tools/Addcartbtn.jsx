import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { PlusIcon } from "lucide-react";
import { Minus } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "./Cardcontext";

const Addcartbtn = (carddatas) => {
  const { updateCart } = useCart();
  const [cartcount, setCartcount] = useState([]);

  return (
    <>
      <ButtonGroup>
        <Button
          variant="outline"
          size="sm"
          className="rounded-sm"
          onClick={() => updateCart(carddatas?.product, "sub")}
        >
          -
        </Button>
        <Button
          variant="outline"
          size="icon-sm"
          className="rounded-sm"
          onClick={() => updateCart(carddatas?.product, "add")}
        >
          +
        </Button>
      </ButtonGroup>
    </>
  );
};

export default Addcartbtn;
