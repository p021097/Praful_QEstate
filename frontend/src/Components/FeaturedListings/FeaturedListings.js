import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FeaturedListings.css";
import config from "../../config";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import CardActions from "@mui/material/CardActions";

export default function FeaturedListings() {
  const [listingsData, setListingsData] = useState([]);

  async function fetchListings() {
    try {
      let response = await axios.get(
        `${config.backendEnpoint}/real-estate-data`
      );
      let data = response.data.listings;
      setListingsData(data.slice(0, 8));
    } catch (error) {
      setListingsData([]);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {listingsData === 0 ? (
          <Grid item>
            <div className="error-message"> No Featured Listings Found !</div>
          </Grid>
        ) : (
          listingsData.map((ele, idx) => (
            <Grid item xm={12} sm={6} md={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`/assets/real-estate-${idx}.jpg`}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography  className="property-name" gutterBottom variant="h5" component="div">
                      {ele.property_name.slice(0, 6)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <div className="listing-details">
                      <span className="property-price"> Rs {ele.price}</span>
                      <span className="property-city">
                        {ele.city.slice(0, 5)}
                      </span>
                    </div>
                  </CardActions>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        )}
        ;
      </Grid>
    </Box>
  );
}
