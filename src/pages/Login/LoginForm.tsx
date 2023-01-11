import { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Box,
  Grid,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router";

interface formFields {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Not a valid email"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password length should be at least 8 characters"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formFields>({ resolver: yupResolver(schema) });
  const onSubmitHandler = (data: formFields) => {
    //Make API call
    console.log(data);
    navigate("/dashboard");
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  console.log("dfsdfsd", errors);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formBox}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <h3>Sign In</h3>
        <Box component="form" onSubmit={handleSubmit(onSubmitHandler)}>
          <TextField
            margin="normal"
            fullWidth
            label="Email Address"
            autoComplete="email"
            error={errors.email ? true : false}
            helperText={errors.email?.message}
            {...register("email")}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={errors.password ? true : false}
            helperText={errors.password?.message}
            {...register("password")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container spacing={1} sx={{ mt: 1 }}>
            <Grid item sm={12} md={6}>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item sm={12} md={6}>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};
