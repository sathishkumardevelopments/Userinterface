import {
  Sheet,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";


const Cartbtn = (canvasId) => {
    return(
        <>
    <SheetTrigger asChild>
        <Button variant="outline">Cart</Button>
    </SheetTrigger>
    </>
    )
    
    
}

export default Cartbtn