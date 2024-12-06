import { useState } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";

function PaymentMethod() {
  const [agreement, setAgreement] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    tags: "",
    mdfile: "", // Now it's a URL input, not a file input
  });

  const handleSetAgreement = () => setAgreement(!agreement);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the data to the API
    fetch("http://192.168.190.4:3000/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Sending JSON data
      },
      body: JSON.stringify(formData), // Sending form data as JSON
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Show API response
        if (data.message === "Content added successfully") {
          alert("Content added successfully!");
          setFormData({ title: "", tags: "", mdfile: "" }); // Reset form data
        }
      })
      .catch((error) => {
        console.error("Error adding content", error);
        alert("Error adding content");
      });
    }
  return (
    <Card id="add-content">
      <SoftBox p={3} mb={1} textAlign="center">
        <SoftTypography variant="h5" fontWeight="medium">
          Add Content
        </SoftTypography>
      </SoftBox>

      <SoftBox pt={6} pb={4} px={5}>
        <SoftBox component="form" role="form" onSubmit={handleSubmit}>
          {/* Title Input */}
          <SoftBox mb={2}>
            <SoftInput
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
            />
          </SoftBox>

          {/* Tags Input */}
          <SoftBox mb={2}>
            <SoftInput
              name="tags"
              placeholder="Tags"
              value={formData.tags}
              onChange={handleChange}
            />
          </SoftBox>

          {/* URL Input for Markdown File (mdfile) */}
          <SoftBox mb={2}>
            <SoftInput
              name="mdfile"
              placeholder="Markdown File URL"
              value={formData.mdfile}
              onChange={handleChange}
            />
          </SoftBox>

          {/* Terms Agreement */}
          <SoftBox display="flex" alignItems="center">
            <Checkbox checked={agreement} onChange={handleSetAgreement} />
            <SoftTypography
              variant="button"
              fontWeight="regular"
              onClick={handleSetAgreement}
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

          {/* Submit Button */}
          <SoftBox mt={4} mb={1}>
            <SoftButton variant="gradient" color="dark" fullWidth type="submit">
              Add Content
            </SoftButton>
          </SoftBox>

          {/* Link to update content */}
          <SoftBox mt={3} textAlign="center">
            <SoftTypography variant="button" color="text" fontWeight="regular">
              Need to update content?&nbsp;
              <SoftTypography
                component={Link}
                to="/content/update" // Adjust the link for updating content
                variant="button"
                color="dark"
                fontWeight="bold"
                textGradient
              >
                Update Content
              </SoftTypography>
            </SoftTypography>
          </SoftBox>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default PaymentMethod;
