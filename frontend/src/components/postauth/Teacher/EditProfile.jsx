import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  makeStyles,
  Card,
  CardHeader,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontSize: "18px",
  },
  button: {
    margin: theme.spacing(2, 1, 1, 0),
  },
}));

export default function EditProfile() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleEdit = (e) => {
    const et = e.target;
    if (!!et.id) {
      setDetails({ ...details, [et.id]: et.value });
    } else {
      setDetails({ ...details, [et.name]: et.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(
      `http://localhost:8000/api/staff/update/${
        JSON.parse(sessionStorage.getItem("user")).reg_id
      }`,
      details,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("usertoken")}`,
        },
      }
    )
      .then((res) => {
        setDetails(details);
        let user = JSON.parse(sessionStorage.getItem("user"));
        user.firstName = details.firstName;
        user.lastName = details.lastName;
        user.email = details.email;
        sessionStorage.setItem("user", JSON.stringify(user));
        enqueueSnackbar("Update Successful", { variant: "success" });
      })
      .catch((err) => {
        console.log(err.message);
        enqueueSnackbar("Could not update", { variant: "error" });
      });
  };

  useEffect(() => {
    console.log(typeof JSON.parse(sessionStorage.getItem("user")));
    Axios.get(
      `http://localhost:8000/api/staff/${
        JSON.parse(sessionStorage.getItem("user")).reg_id
      }`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("usertoken")}`,
        },
      }
    ).then((res) => {
      let data = res.data.data[0];
      setDetails({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      });
    });
  }, []);

  return (
    <Grid item>
      <Card>
        <CardHeader
          title={<Typography variant="h5">Edit Your Profile Here</Typography>}
        ></CardHeader>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First name"
            name="firstName"
            autoComplete="firstName"
            value={details.firstName}
            autoFocus
            onChange={handleEdit}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last name"
            name="lastName"
            autoComplete="lastName"
            value={details.lastName}
            onChange={handleEdit}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={details.email}
            onChange={handleEdit}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update
          </Button>
        </form>
      </Card>
    </Grid>
  );
}
