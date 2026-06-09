import Header from "../usercomponents/Header";
import Cartsummary from "./tools/Cartsummary"

const Checkout = () => {
    return (
        <>
         <div className="py-5">
            <div className="appcontainer bg-white rounded-sm">
                <div>
                    <Cartsummary />
                </div>
            </div>
         </div>
        </>
    )
}

export default Checkout