import React from "react";
import styles from "./styles.module.css";
import { TrashIcon } from "@heroicons/react/outline";
import { useCart } from "../../Context/CartContext";
const Orders = () => {
  // const orders = localStorage.getItem('orders')
  const items = JSON.parse(localStorage.getItem("cart"));

  console.log("items", items);
  const orders = [
    {
      orderID: "asdca13asdcd",
      user_email: "admin@netsoltech.com",
      address: "some address",
      orderItems: [
        {
          id: 3,
          title: "Mens Cotton Jacket",
          price: 55.99,
          description:
            "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
          category: "men's clothing",
          image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
          rating: { rate: 4.7, count: 500 },
        },
        {
          id: 4,
          title: "Mens Casual Slim Fit",
          price: 15.99,
          description:
            "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
          category: "men's clothing",
          image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
          rating: { rate: 2.1, count: 430 },
        },
      ],
      created_at: Date.now(),
    },
    {
      orderID: "asdca13asdcd",
      user_email: "admin@netsoltech.com",
      address: "some address",
      orderItems: [
        {
          id: 3,
          title: "Mens Cotton Jacket",
          price: 55.99,
          description:
            "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
          category: "men's clothing",
          image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
          rating: { rate: 4.7, count: 500 },
        },
        {
          id: 4,
          title: "Mens Casual Slim Fit",
          price: 15.99,
          description:
            "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
          category: "men's clothing",
          image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
          rating: { rate: 2.1, count: 430 },
        },
      ],

      created_at: Date.now(),
    },
    {
      orderID: "asdca13asdcd133",
      user_email: "admin@netsoltech.com",
      address: "some address",
      orderItems: [
        {
          id: 3,
          title: "Mens Cotton Jacket",
          price: 55.99,
          description:
            "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
          category: "men's clothing",
          image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
          rating: { rate: 4.7, count: 500 },
        },
        {
          id: 3,
          title: "Mens Cotton Jacket",
          price: 55.99,
          description:
            "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
          category: "men's clothing",
          image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
          rating: { rate: 4.7, count: 500 },
        },
        {
          id: 3,
          title: "Mens Cotton Jacket",
          price: 55.99,
          description:
            "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
          category: "men's clothing",
          image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
          rating: { rate: 4.7, count: 500 },
        },
      ],
      created_at: Date.now(),
    },
  ];
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
