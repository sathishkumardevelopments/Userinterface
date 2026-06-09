import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ShoppingCart } from "lucide-react";
import { CircleX } from "lucide-react";
import Cartsummary from "./Cartsummary"
import {useCart} from "./Cardcontext"
const Sidecart = () => {
  const { cart } = useCart();
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <ShoppingCart />
        </SheetTrigger>
        
        <SheetContent>
          <SheetHeader className="mainthemecolor">
            <SheetTitle>Cart Items</SheetTitle>
            <SheetDescription>Review your cart holdings here</SheetDescription>
          </SheetHeader>
          {cart.length === 0 ? <div className="text-center py-35">Add products to cart</div> : <Cartsummary />}
          
          <SheetFooter>
            <SheetClose asChild>
              <Button className="rounded-sm" id="canvascloser" variant="outline">
                Close
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidecart;
