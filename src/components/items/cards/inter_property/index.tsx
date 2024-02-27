import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { InterPropertyInfo } from "../../../../apis/inter_properties/type";
import DeleteInterPropertyDialog from "../../dialogs/deleteInterProperty";

const InterPropertyCard = ({ property }: { property: InterPropertyInfo }) => {
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
      <CardActionArea
        onClick={() => navigate(`/inter-properties/${property._id}`)}
      >
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
      <DeleteInterPropertyDialog
        open={openDeletePropertyDialog}
        onClose={handleCloseDeletePropertyDialog}
        property={{ id: property._id!, name: property.name }}
      />
    </Card>
  );
};

export default InterPropertyCard;
