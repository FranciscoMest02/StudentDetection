import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import "@/styles/pages/docentes_page.css";
import "tailwindcss/tailwind.css";

function GroupCards({ props }) {
  console.log("item props from the componenet", props);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={props.image_url} title="maths" />
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.teacher}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default GroupCards;
