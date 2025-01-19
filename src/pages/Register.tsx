import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ErrorMessage, Field, Formik, FormikProps } from "formik";
import { Button, TextField } from "@mui/material";
import { registerValidationSchema } from "../utils/registerValidation";
import { registerService } from "../services/authService";
import { useNavigate } from "react-router-dom";

// Registration form
const Register = () => {
  const auth = useContext(AuthContext);
const navigate = useNavigate();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerValidationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const response = await registerService(values.username, values.email, values.password);
      
          if (response) {
            navigate("/login"); 
          }
        } catch (error) {
          console.error("Registration failed:", error);
        } finally {
          setSubmitting(false); 
        }
      }}
      
    >
      {({ handleChange, handleSubmit,values, touched, errors }: FormikProps<{ username: string; email: string; password: string; confirmPassword: string }>) => (
   
        <form onSubmit={handleSubmit}>
          <Field
            as={TextField}
            label="Username"
            name="username"
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={handleChange}
            value={values.username}
            error={touched.username && Boolean(errors.username)}
            helperText={<ErrorMessage name="username" />}
          />
          <Field
            as={TextField}
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleChange}
            value={values.email}
            error={touched.email && Boolean(errors.email)}
            helperText={<ErrorMessage name="email" />}
          />
          <Field
            as={TextField}
            label="Password"
            name="password"
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={handleChange}
            value={values.password}
            error={touched.password && Boolean(errors.password)}
            helperText={<ErrorMessage name="password" />}
          />
          <Field
            as={TextField}
            label="Confirm Password"
            name="confirmPassword"
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={handleChange}
            value={values.confirmPassword}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            helperText={<ErrorMessage name="confirmPassword" />}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="mt-4"
          >
            Register
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default Register;
