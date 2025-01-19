import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import { loginValidationSchema } from "../utils/loginValidation";
import { Button, TextField, Typography } from "@mui/material";
import { loginService } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const { access_token, refresh_token } = await loginService(
                values.email,
                values.password
              );
          
              if (access_token && refresh_token) {
                
                auth?.login(access_token, refresh_token);
                navigate("/profile");
              }
            } catch (error) {
              console.error("Login failed:", error);
            } finally {
              setSubmitting(false);
            }
          }}
          
        >
          {({
            handleChange,
            values,
            touched,
            errors,
            handleSubmit,
            isSubmitting
          }: FormikProps<{ email: string; password: string }>) => {
            const isFormEmpty = JSON.stringify(values) === JSON.stringify(initialValues);
            return (<Form onSubmit={handleSubmit}>
              <Typography variant="h4" className="text-center mb-4">
                Login
              </Typography>
              <Field
                as={TextField}
                label="Email"
                name="email"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={values.email}
                helperText={<ErrorMessage name="email" />}
                error={touched.email && !!errors.email}
              />

              <Field
                as={TextField}
                label="Password"
                name="password"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={values.password}
                helperText={<ErrorMessage name="password" />}
                error={touched.password && !!errors.password}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting || !!Object.keys(errors).length || isFormEmpty}
              >
                Login
              </Button>
            </Form>
          )}}
        </Formik>
      </div>
    </div>
  );
};
export default Login;
