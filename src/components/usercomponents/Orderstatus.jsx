import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Socket } from "../Socket"
import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";

const Orderstatus = () => {
  const location = useLocation();

  const orderss = location.state?.order;
  
  const [order, setOrder] = useState(orderss);

  useEffect(() => {
    if (!order?.orderid) return; 

    
    if (!Socket.connected) {
      Socket.connect();
    }

    
    Socket.emit("joinOrderRoom", order.orderid);

    
    const handleOrderUpdate = (updatedOrder) => {
      console.log("Realtime order update received:", updatedOrder);
      setOrder(updatedOrder); 
    };

    Socket.on("orderStatusUpdated", handleOrderUpdate);

    
    return () => {
      Socket.off("orderStatusUpdated", handleOrderUpdate);
      Socket.disconnect();  
    };
  }, [order?.orderid]);
  
  console.log(order,"--------order--------")
  return (
    <>
      <div>
        <div className="appcontainer py-5">
          <div>
            <Card className="rounded-md">
              <CardHeader>
                <CardTitle>Order Status </CardTitle>
                <div>
                    <div className="flex flex-row gap-5">
                        <div>Order ID - {order?.orderid}</div>
                        <div>Payment Status - {order?.status}</div>
                        <div>Estimated Delivery Time - 15 mins</div>

                        
                    </div>
                </div>
                <hr/>
              </CardHeader>
              <CardContent>
                <Timeline position="alternate">
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot className={order?.status == "Order Placed" ? "animate-ping" : ""} color="success" />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>Order Placed</TimelineContent>
                  </TimelineItem>

                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot className={order?.status == "Accepted by Admin" ? "animate-ping" : ""} color="success" />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>Accepted By Admin</TimelineContent>
                  </TimelineItem>

                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot className={order?.status == "Packed" ? "animate-ping" : ""} color="success" />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>Packed</TimelineContent>
                  </TimelineItem>

                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot className={order?.status == "Out for Delivery" ? "animate-ping" : ""} color="success" />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>Out Of Delivery</TimelineContent>
                  </TimelineItem>

                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot className={order?.status == "Delivered" ? "animate-ping" : ""} color="success" />
                      
                    </TimelineSeparator>
                    <TimelineContent>Delivered</TimelineContent>
                  </TimelineItem>

                </Timeline>
              </CardContent>
              
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orderstatus;
