import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import Billpopover from "./Billpopover";
import { useCart } from "./Cardcontext";

const Cartsummary = () => {
  const { cart } = useCart();
  const { removeFromCart } = useCart();

  let allItems = [];
  let totalAmt = 0;
  console.log(cart, "-------cart--------");
  if (cart.length > 0) {
    cart.forEach((item, index) => {
      let tempcal = Number(item?.productNos) * Number(item?.productAmount);
      let temp = {
        productName: item?.productName,
        productNos: item?.productNos,
        productId: item?.productId,
        productAmount: item?.productAmount,
        totalAmount: tempcal,
      };
      allItems.push(temp);
      totalAmt = Number(totalAmt) + Number(tempcal);
    });
  }

  localStorage.setItem("finalizeCart", JSON.stringify(allItems));
  localStorage.setItem("finalizeAmt", JSON.stringify(totalAmt));

  const getFinals = {
    allItems : allItems,
    totalAmt : totalAmt
  }

  return (
    <>
      <div className="py-5 px-2 h-full overflow-auto">
        {cart.length > 0
          ? cart.map((side) => {
              return (
                <div className="grid gap-3 py-2">
                  <Card htmlFor="sheet-demo-name" className="rounded-sm px-2">
                    <div className="flex justify-between">
                      <div>{side?.productName}</div>
                      <div>x {side?.productNos}</div>
                      <div>Price : {side?.productAmount}</div>
                      <div>
                        Total :{" "}
                        {Number(side?.productNos) * Number(side?.productAmount)}
                      </div>
                      <div>
                        <CircleX
                          onClick={() => removeFromCart(side?.productId)}
                        />
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })
          : ""}
      </div>
      <div>
        <div className="grid gap-3 px-2 ">
          <Card className="w-full w-full rounded-sm">
            <CardHeader>
              <CardTitle>Bill Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <div>Total Value</div>
                <div>{totalAmt ?? 0}</div>
              </div>
            </CardContent>
            <CardFooter>
              {/* <Button
                variant="outline"
                size="sm"
                className="w-full mainthemecolor fontwhite rounded-sm"
              > */}
              <Billpopover data={getFinals}/>

              {/* </Button> */}
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Cartsummary;
