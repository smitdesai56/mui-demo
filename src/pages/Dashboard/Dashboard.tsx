import { useState } from "react";
import {
  TextField,
  Box,
  Button,
  Avatar,
  Grid,
  MenuItem,
  Alert,
  Collapse,
  IconButton,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./styles.module.scss";

interface userFields {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: number;
    country: string;
  };
}

export const Dashboard = () => {
  const schema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    dob: Yup.string().required("Date of birth is required "),
    gender: Yup.string().required("Gender is required"),
    address: Yup.object().shape({
      street: Yup.string().required("Street is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string(),
      zip: Yup.string()
        .required("Zip/Postal is Required")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(6, "Must be exactly 6 digits")
        .max(6, "Must be exactly 6 digits"),
      country: Yup.string(),
    }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm<userFields>({ resolver: yupResolver(schema) });
  const values = getValues();
  const [open, setOpen] = useState(false);
  const onSubmitHandler = (data: userFields) => {
    //Make API call
    console.log(data);
    reset();
    setOpen(true);
  };
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.userForm}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AccountCircleIcon />
        </Avatar>
        <h3>User Information</h3>
        <Box component="form" onSubmit={handleSubmit(onSubmitHandler)}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                fullWidth
                label="First Name *"
                error={errors.firstName ? true : false}
                helperText={errors.firstName?.message}
                variant="standard"
                multiline
                {...register("firstName")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                fullWidth
                label="Last Name *"
                error={errors.lastName ? true : false}
                helperText={errors.lastName?.message}
                variant="standard"
                multiline
                {...register("lastName")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label="Date of Birth"
                  inputFormat="MM/DD/YYYY"
                  value={values.dob}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      variant="standard"
                      error={errors.dob ? true : false}
                      helperText={errors.dob?.message}
                    />
                  )}
                  {...register("dob")}
                  onChange={(newValue) => setValue("dob", newValue!)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="standard"
                {...register("gender")}
                label="Gender *"
                select
                error={errors.gender ? true : false}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Female">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                label="Street *"
                error={errors.address?.street ? true : false}
                helperText={errors.address?.street?.message}
                variant="standard"
                multiline
                {...register("address.street")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                fullWidth
                label="City *"
                error={errors.address?.city ? true : false}
                helperText={errors.address?.city?.message}
                variant="standard"
                multiline
                {...register("address.city")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                fullWidth
                label="State"
                error={errors.address?.state ? true : false}
                helperText={errors.address?.state?.message}
                variant="standard"
                multiline
                {...register("address.state")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                fullWidth
                label="Zip/Postal *"
                type="number"
                error={errors.address?.zip ? true : false}
                helperText={errors.address?.zip?.message}
                variant="standard"
                {...register("address.zip")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                fullWidth
                label="Country"
                error={errors.address?.country ? true : false}
                helperText={errors.address?.country?.message}
                variant="standard"
                multiline
                {...register("address.country")}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
        </Box>
        <Collapse in={open}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Successfully Submited!!
          </Alert>
        </Collapse>
      </div>
    </div>
  );
};
