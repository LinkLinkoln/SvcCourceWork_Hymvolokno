import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid2 from "@mui/material/Grid2";
import React from "react";
import "./blog.css";
import blog1 from "../../../img/blog/blog1.png";
import blog2 from "../../../img/blog/blog2.png";
import blog3 from "../../../img/blog/blog3.png";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#f4f6f8", 
  padding: theme.spacing(2),
  textAlign: "center",
  borderRadius: "12px", 
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease", 
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const Blog = () => {
  const blogs = [
    { image: blog1, text: "How Much Does Catering for a Party Cost?" },
    {
      image: blog2,
      text: "What is a Grazing Platter & Why Are They Trending?",
    },
    { image: blog3, text: "Spread Joy at the Workplace: Finger Platters" },
  ];

  return (
    <div
      className="blogContainer"
      style={{
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center", 
        width: "100%", 
        padding: "20px",
        backgroundColor: "#eaf2f8",
        borderRadius: "16px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
        boxSizing: "border-box", 
        marginBottom:"40px"
      }}
    >
      <p
        className="blogs"
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "30px",
          color: "#2c3e50",
        }}
      >
        Blog Posts
      </p>
      <Grid2
        container
        spacing={{ xs: 2, md: 4 }}
        justifyContent="center" 
        alignItems="center"
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          width: "100%",
          margin: "0 auto", 
        }}
      >
        {blogs.map((item, index) => (
          <Grid2 key={index} xs={4} sm={4} md={4}>
            <Item>
              <img
                src={item.image}
                alt="Blog"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "12px",
                  marginBottom: "16px",
                }}
              />
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#34495e",
                  margin: "0",
                  textAlign: "center",
                }}
              >
                {item.text}
              </p>
            </Item>
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
  
};

export default Blog;
