import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";
import curved6 from "assets/images/curved-images/curved14.jpg";
import axios from "axios"; // Optional: use Axios for API calls


import { useNavigate } from "react-router-dom";

function SignUp() {
  const [agreement, setAgremment] = useState(true);
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState(""); // State for error messages
  const [success, setSuccess] = useState(""); // State for success messages
  const navigate = useNavigate(); // Hook for navigation


  const handleSetAgremment = () => setAgremment(!agreement);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
  
    try {
      // Make the API call to the login endpoint
      const response = await axios.post("https://data-collect-nu.vercel.app/auth", {
        email,
        password,
      });
  
      // Check if login is successful and handle response
      if (response.data.success) {
        setSuccess("Login successful!");
        console.log("API Response:", response.data);
        
        // Store token in localStorage
        localStorage.setItem("authToken", response.data.payload.token); // Assuming the token is in response.data.token
  
        // Redirect to the dashboard upon successful login
        navigate("/dashboard"); // Replace with your dashboard route
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
      console.error("Error during login:", err);
    }
  };
  
  return (
    <BasicLayout
      title="Welcome!"
      description="Use these awesome forms to login or create a new account in your project for free."
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Sign In
          </SoftTypography>
        </SoftBox>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form" onSubmit={handleSubmit}>
            
            {/* Email Input */}
            <SoftBox mb={2}>
              <SoftInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </SoftBox>

            {/* Password Input */}
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </SoftBox>

            {/* Agreement Checkbox */}
            <SoftBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgremment} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree to the&nbsp;
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
              </SoftTypography>
            </SoftBox>

            {/* Error Message */}
            {error && (
              <SoftBox mt={2} color="error.main">
                <SoftTypography variant="body2" color="error">
                  {error}
                </SoftTypography>
              </SoftBox>
            )}

            {/* Success Message */}
            {success && (
              <SoftBox mt={2} color="success.main">
                <SoftTypography variant="body2" color="success">
                  {success}
                </SoftTypography>
              </SoftBox>
            )}

            {/* Submit Button */}
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="dark" fullWidth type="submit" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </SoftButton>
            </SoftBox>

            {/* Link to Sign In */}
            
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
