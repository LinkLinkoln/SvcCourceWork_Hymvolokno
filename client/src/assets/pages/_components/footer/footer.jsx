import React from "react";
import Logo from "../../../img/logo.png";
import { Box, Typography, TextField, Button, Divider, Link } from "@mui/material";
import Facebook from "../../../img/icons/facebook.svg";
import Instagram from "../../../img/icons/instagram.svg";
import LinkIcon from "../../../img/icons/link.svg";
import Card1 from "../../../img/pay/pay1.png";
import Card2 from "../../../img/pay/pay2.png";
import Card3 from "../../../img/pay/pay3.png";
import Card4 from "../../../img/pay/pay4.png";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#2c2c2c", padding: "40px 0", color: "#fff" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // Center all content
          alignItems: "flex-start",
          flexWrap: "wrap",
          columnGap: 40, // Add spacing between the sections
        }}
      >
        {/* Legal Section */}
        <Box sx={{ textAlign: "center", marginBottom:"50px" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Legal
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Orders & Shipping Policy
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Terms of Service
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Privacy Policy
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Refund Policy
          </Typography>
        </Box>

        {/* Newsletter Section */}
        <Box sx={{textAlign: "center",marginBottom:"50px" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Newsletter
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Subscribe to receive delicious weekly updates, access to exclusive deals, and more.
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Email..."
            sx={{
              backgroundColor: "#fff",
              borderRadius: "4px",
              marginBottom: "16px",
            }}
          />
          <Button variant="contained" color="primary" sx={{ width: "100%" }}>
            Subscribe
          </Button>
        </Box>

        {/* Logo & Contact Section */}
        <Box sx={{ minWidth: "200px", textAlign: "center" }}>
          <img src={Logo} alt="Logo" style={{ width: "150px" }} />
          <Typography variant="body1" sx={{ fontStyle: "italic", mt: 2 }}>
            IT'S ALL IN DETAILS
          </Typography>
          <Typography variant="body2">EMAIL: catering@gmail.com</Typography>
          <Typography variant="body2" sx={{ color: "rgb(234, 186, 144)" }}>
            Paris | France
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ margin: "40px ", backgroundColor: "#fff" }} />

      {/* Footer Bottom Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // Center the footer content
          alignItems: "center",
          flexWrap: "wrap",
          gap: 4, // Add spacing between sections
          textAlign: "center",
        }}
      >
        <Box sx={{ minWidth: "200px",  }}>
          <Typography variant="body2">© Catering Project</Typography>
        </Box>

        <Box sx={{ minWidth: "200px"}}>
          <Typography variant="body2">Follow Us</Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Link href="https://www.facebook.com" sx={{ marginRight: 2 }}>
              <img src={Facebook} alt="facebook" style={{ width: "24px" }} />
            </Link>
            <Link href="https://www.instagram.com" sx={{ marginRight: 2 }}>
              <img src={Instagram} alt="instagram" style={{ width: "24px" }} />
            </Link>
            <Link href="https://linkedin.com" sx={{ marginRight: 2 }}>
              <img src={LinkIcon} alt="linkedin" style={{ width: "24px" }} />
            </Link>
          </Box>
        </Box>

        <Box sx={{ minWidth: "200px" }}>
          <Typography variant="body2">We accept</Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <img src={Card1} alt="payment card" style={{ width: "50px", marginRight: "10px" }} />
            <img src={Card2} alt="payment card" style={{ width: "50px", marginRight: "10px" }} />
            <img src={Card3} alt="payment card" style={{ width: "50px", marginRight: "10px" }} />
            <img src={Card4} alt="payment card" style={{ width: "50px" }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
