import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import succlogo from "../Assets/animat-checkmark.gif";

const useStyles = makeStyles({
  root: {
    minWidth: 400,
    margin: "20px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
    textAlign: "center",
  },
  pos: {
    marginBottom: 12,
  },
  text: {
    width: 350,
    margin: "10px",
  },
  img: { width: "200px" },
  con: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function Success() {
  const classes = useStyles();
  const { items, emptyCart } = useCart();
  const { loggedIn } = useAuth();
  const navigate = useNavigate();

  const placeOrder = () => {
    if (loggedIn) {
      const cardDetails = JSON.parse(localStorage.getItem("cardDetails"));
      const address = localStorage.getItem("address");
      const { email } = JSON.parse(localStorage.getItem("user"));

      const header = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };

      const payload = {
        username: email,
        orderItems: items,
        address: address,
        payment: cardDetails,
        orderDate: Date.now(),
      };

      axios
        .post(
          `https://${process.env.REACT_APP_API_GATEWAY_ID}.execute-api.us-east-2.amazonaws.com/dev/api/placeOrder`,
          payload,
          header
        )
        .then((res) => {
          console.log("Log in Place order Function", res.data);
          if (loggedIn) {
            emptyCart();
            toast(" Order Request has been submitted!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            navigate("/");
          } else {
            alert("Please Login First to place order!");
          }
        })
        .catch((err) => {
          console.log("Error during placing Order: ", err.message);
          toast(`Error: ${err.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    } else {
      navigate("/signin");
    }
  };

  useEffect(() => {
    return () => placeOrder();
  });

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.con}>
          <img src={succlogo} alt="loading..." className={classes.img} />
        </div>
        <Typography
          className={classes.title}
          variant="h2"
          color="primary"
          gutterBottom
        >
          <b> Order Confirmed </b>
        </Typography>
      </CardContent>
    </Card>
  );
}
