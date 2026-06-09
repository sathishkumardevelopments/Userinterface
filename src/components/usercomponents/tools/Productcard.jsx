import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Addcartbtn from './Addcartbtn'
import img from "@/assets/images/tv.jpg";
import { useCart } from "./Cardcontext";


const Productcard = (cardinner) => {
  let cartitemsss = JSON.parse(localStorage.getItem("cart"));
  const { cart } = useCart();
  
  const item = cart.find(
    (i) => i.productId === cardinner?.carddata?._id
  );
  
  return (
    <>
      <Card className="relative mx-auto w-full max-w-sm pt-0 rounded-sm">
        <div className="absolute inset-0 z-30 aspect-video" />
        <img
          src={img}
          alt="Event cover"
          className="relative z-20 aspect-video w-full object-contain"
        />
        <CardHeader>
          <CardAction>
            {cardinner?.carddata?.quantity > 0 ? 
              <Badge className='bg-green-400'>Available</Badge>
              :
              <Badge className='bg-red-400'>Not Available</Badge>
            }
            
          </CardAction>
          <CardTitle>{cardinner?.carddata?.name}</CardTitle>
          <CardDescription>
            <div>
                Price : {cardinner?.carddata?.price}
            </div>
            {cardinner?.carddata?.description}
          </CardDescription>
        </CardHeader>
        <CardFooter>
           {cardinner?.carddata?.quantity > 0 ? 
           <>
          <div className="flex flex-row gap-5 items-center">
            <div>
            <Addcartbtn product={cardinner?.carddata}/>
            </div>
            <div>
              
            <Badge className="bg-green-400 fontwhite rounded-sm">{item ? item.productNos : 0}</Badge>
            </div>
          </div>
          
          </>
          :
          ""
           }
        </CardFooter>
      </Card>
    </>
  );
};

export default Productcard;
