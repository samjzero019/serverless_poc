import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
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
  },
  pos: {
    marginBottom: 12,
  },
  text: {
    width: 350,
    margin: "10px",
  },
});

export default function Details() {
  const classes = useStyles();
  const [address, setAddress] = useState("Dummy address");

  const {email} = JSON.parse(localStorage.getItem('user')) || "dummy@mail.com"
  useEffect(()=>
  {
    return ()=> localStorage.setItem('address', address )
  })
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          variant="h5"
          gutterBottom
        >
          Enter Your Details
        </Typography>
        <TextField
          id="filled-basic"
          value={ email ? email   : "username/email"}
          label="Username"
          variant="filled"
          className={classes.text}

        />
        <br />
        <TextField
          id="filled-basic"
          name="Address"
          value={address}
          variant="filled"
          multiline
          minRows={4}
          className={classes.text}
          onChange={(e)=> setAddress(e.target.value)}
        />
      </CardContent>
    </Card>
  );
}


