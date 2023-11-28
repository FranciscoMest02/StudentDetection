"use-client";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useRouter } from "next/navigation";

import "@/styles/pages/docentes_page.css";
import "tailwindcss/tailwind.css";

function GroupCards({ props }) {
  const router = useRouter();

  const handleCardClick = (id) => {
    router.push(`/pages/infoCurso/${props._id}`); // Programmatically navigate to the dynamic page with the specified ID
    console.log("clicked!", props._id);
  };

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
      <CardActions>
        <Button size="small" color="primary" onClick={handleCardClick}>
          Ver curso
        </Button>
      </CardActions>
    </Card>
  );
}

export default GroupCards;
