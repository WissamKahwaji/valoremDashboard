import React, { useState } from "react";
import { PropertyInfo } from "../../../../apis/properties/type";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import DeletePropertyDialog from "../../dialogs/deleteProperty";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property }: { property: PropertyInfo }) => {
  const [openDeletePropertyDialog, setOpenDeletePropertyDialog] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const handleOpenDeletePropertyDialog = () => {
    setOpenDeletePropertyDialog(true);
  };
  const handleCloseDeletePropertyDialog = () => {
    setOpenDeletePropertyDialog(false);
  };

  return (
    <Card>
      <CardHeader
        title={
          <Typography>
            {property.name.length > 20 ? (
              <>
                {property.name.slice(0, 20)}
                <Box component={"span"}>...</Box>
              </>
            ) : (
              property.name
            )}
          </Typography>
        }
        action={
          <IconButton color="error" onClick={handleOpenDeletePropertyDialog}>
            <Delete />
          </IconButton>
        }
      />
      <CardActionArea onClick={() => navigate(`/properties/${property._id}`)}>
        <CardMedia component={"img"} src={property.img!} height={200} />
      </CardActionArea>
      <CardContent sx={{ minHeight: 110 }}>
        <Typography>
          {property.bio.length > 80 ? (
            <>
              {property.bio.slice(0, 80)}
              <Box component={"span"}>...</Box>
            </>
          ) : (
            property.bio
          )}
        </Typography>
      </CardContent>
      <DeletePropertyDialog
        open={openDeletePropertyDialog}
        onClose={handleCloseDeletePropertyDialog}
        property={{ id: property._id!, name: property.name }}
      />
    </Card>
  );
};

export default PropertyCard;
