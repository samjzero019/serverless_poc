import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { TrashIcon } from "@heroicons/react/outline";

import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState();

  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem("user"));

    const header = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };

    axios
      .get(
        `https://${process.env.REACT_APP_API_GATEWAY_ID}.execute-api.us-east-2.amazonaws.com/dev/api/getOrders/${email}`,
        header
      )
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log("Error during getting Order: ", err.message));
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    const { email } = JSON.parse(localStorage.getItem("user"));
    const ID = document.getElementById('orderid').innerHTML;

    const header = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };

    axios
      .delete(
        `https://${process.env.REACT_APP_API_GATEWAY_ID}.execute-api.us-east-2.amazonaws.com/dev/api/deleteOrder/${ID}?username=${email}`,
        header
      )
      .then((res) => {
        console.log("res.data", res.data);
        setOrders([])
        toast(" Order has been Deleted!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => console.log("Error during getting Order: ", err.message));
  };

  return (
    <>
      <div className="flex flex-wrap max-w-7xl mx-auto my-4">
        <div className="flex flex-col flex-1">
          {orders && orders.map((ord) => {
              return (
                <div
                  className="w-full sm:w-2/2 md:w-2/2 xl:w-5/5 p-4 my-auto" 
                  key={ord.OrderID}
                  >
                  <div className={styles.bgCart}>
                    <div className="flex flex-row ">
                      <div
                        className="flex flex-col ml-2 mt-2 px-2 "
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        
                      >
                        <strong> order-id:</strong> <span id="orderid">{ord.OrderID}</span>
                      </div>
                      <div className="p-1" style={{}}>
                        {ord.OrderItems.map((itm) => {
                          return (
                            <div id="order-items">
                              <li
                                style={{
                                  padding: "0.2rem",
                                  listStyle: "none",
                                  display: "flex",
                                }}
                              >
                                <tr>
                                  <td style={{ padding: "0.2rem" }}>
                                    {itm.title}
                                  </td>
                                  <td style={{ padding: "0.2rem" }}>
                                    {" "}
                                    <strong>$ {itm.price} </strong>
                                  </td>
                                </tr>
                              </li>
                            </div>
                          );
                        })}
                      </div>
                      <div
                        className="flex flex-row ml-auto justify-center align-center"
                        style={{ alignItems: "center" }}
                      >
                        <hr />
                        <button
                          className="w-5 h-5 ml-auto m-4 hover:text-red-500"
                          onClick={(e) => handleDelete(e)}
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }) || (<h1 style={{display:'flex', justifyContent:'center', padding:'2rem'}}><strong>No Orders Found</strong> </h1>)} 
        </div>
      </div>
    </>
  );
};

export default Orders;
