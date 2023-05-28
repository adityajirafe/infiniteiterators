/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const validationSchema = Yup.object().shape({
  email1: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  /**
   *
   * @param {Object} values - The values from the form
   * @param {setStatus, setSubmitting} formikHelpers - helpers that formik provides
   */

  //@ts-ignore
  const onSubmit = async (values, { setStatus, setSubmitting }) => {
    setStatus();
    const username = values.email1;
    const { password } = values;

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );

      if (response) {
        console.log(response.user);
        console.log(auth.currentUser.email);
        navigate("/home");
      } else throw new Error("Login Failed");
    } catch (error) {
      console.log(error.code);

      switch (error.code) {
        case "auth/invalid-email":
          setErrorMsg("Invalid Email");
          break;
        case "auth/user-not-found":
          setErrorMsg("No account with that email was found");
          break;
        case "auth/wrong-password":
          setErrorMsg("Incorrect Password");
          break;
        default:
          setErrorMsg("Email or password was incorrect");
          break;
      }
    }
    setSubmitting(false);
  };

  return (
    <Box
      display="flex"
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: (theme) => theme.palette.background.secondary,
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap="32px"
      >
        <Typography variant="h2">Sign in</Typography>
        {/* <GoogleAppleSignin /> */}
        <Formik
          initialValues={{
            email1: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            errors,
            touched,
            isValid,
            dirty,
            handleSubmit,
            isSubmitting,
            status,
          }) => (
            <Form
              style={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <Field name="email1">
                {({ field }) => (
                  <TextField
                    {...field}
                    variant="filled"
                    placeholder="Email address"
                    autoComplete="off"
                    error={
                      touched.email1 &&
                      (typeof errors.email1 !== "undefined" ||
                        typeof status !== "undefined")
                    }
                    sx={{
                      width: "296px",
                    }}
                  />
                )}
              </Field>
              <ErrorMessage name="email1" data-testid="emailError">
                {(msg) => (
                  <Typography
                    variant="caption1"
                    sx={{ color: (theme) => theme.palette.error.main }}
                  >
                    {msg}
                  </Typography>
                )}
              </ErrorMessage>
              <Field name="password">
                {({ field }) => (
                  <TextField
                    {...field}
                    variant="filled"
                    placeholder="Password"
                    error={
                      touched.password &&
                      (typeof errors.password !== "undefined" ||
                        typeof status !== "undefined")
                    }
                    type="password"
                    sx={{
                      width: "296px",
                    }}
                  />
                )}
              </Field>
              <ErrorMessage name="password">
                {(msg) => (
                  <Typography
                    variant="caption1"
                    sx={{ color: (theme) => theme.palette.error.main }}
                  >
                    {msg}
                  </Typography>
                )}
              </ErrorMessage>
              {status && isValid && dirty && (
                <Typography
                  variant="caption1"
                  sx={{ color: (theme) => theme.palette.error.main }}
                >
                  {status}
                </Typography>
              )}
              <Button
                variant="contained"
                type="submit"
                disabled={!(isValid && dirty)}
                onClick={handleSubmit}
                sx={{
                  height: "48px",
                  width: "100%",
                }}
              >
                <Typography variant="button1">Sign in</Typography>
                {isSubmitting && (
                  <Box
                    sx={{
                      ml: "13px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress
                      size={14}
                      thickness={10}
                      sx={{
                        color: "#FCFCFC",
                      }}
                    />
                  </Box>
                )}
              </Button>
            </Form>
          )}
        </Formik>
        <Typography
          variant="body2Semibold"
          sx={{ color: (theme) => theme.palette.error.main }}
        >
          {errorMsg}
        </Typography>
        {/* <Box display="flex" gap="4px" width="100%">
          <Typography
            variant="body2Semibold"
            sx={{ color: (theme) => theme.palette.text.secondary }}
          >
            Forget password?
          </Typography>
          <Typography
            variant="body2Semibold"
            component={Link}
            to="/login/forgetpassword"
          >
            Reset
          </Typography>
        </Box> */}
        <Box display="flex" gap="4px" width="100%">
          <Typography
            variant="body2Semibold"
            sx={{ color: (theme) => theme.palette.text.secondary }}
          >
            Don&apos;t have an account
          </Typography>
          <Typography variant="body2Semibold" component={Link} to="/signup">
            Sign up
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
