import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { TrashIcon } from "@heroicons/react/outline";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";


const Orders = () => {
  const [orders,setOrders] = useState([])
  const { loggedIn } = useAuth();
  const navigate = useNavigate();


  useEffect(()=>
  {
    console.log("LoggedIn: ", loggedIn);
    if (loggedIn) {
      const  {email}  = JSON.parse(localStorage.getItem("user")) ;

      const header = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };

      axios
        .post(
          `https://${process.env.REACT_APP_API_GATEWAY_ID}.execute-api.us-east-2.amazonaws.com/dev/api/getOrders/${email}`,
          header
        )
        .then((res) => {
          console.log("Log in Place order Function", res.data);
        })
        .catch((err) =>
          console.log("Error during placing Order: ", err.message)
        );
    } else {
      navigate("/signin");
    }
  })

  return (
    <>
      <div className="flex flex-wrap max-w-7xl mx-auto my-4">
        <div className="flex flex-col flex-1">
          {orders.map((ord) => {
            return (
              <div
                className="w-full sm:w-2/2 md:w-2/2 xl:w-5/5 p-4 my-auto"
                key={ord.orderID}
              >
                <div className={styles.bgCart}>
                  <div className="flex flex-row h-40">
                    <div className="flex flex-col ml-2 mt-2">
                      <p className="mt-auto mb-4 font-extralight text-xl">
                        {ord.user_email}
                      </p>
                    </div>
                    <div>
                      {ord.orderItems.map((itm) => {
                        return (
                          <>
                            <li style={{ padding: "0.5rem", listStyle: "none", display:'flex' }}>
                            <tr>
                              <td style={{ padding: "0.5rem" }}>{itm.title}</td>
                              <td style={{ padding: "0.5rem" }}>
                                {" "}
                                $ {itm.price}
                              </td>
                            </tr>
                            <td>
                                <img className="w-16 px-2 "
                                src={itm.image}
                                alt="Itm image" />
                              </td>
                          </li>
                          </>
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
                        onClick={() => console.log("button was clicked! ")}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Orders;
