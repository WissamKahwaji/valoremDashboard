import React, { useState } from "react";
import { OurServices } from "../../../../apis/out_services/type";
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
import DeleteServiceDialog from "../../dialogs/deleteService";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ service }: { service: OurServices }) => {
  const navigate = useNavigate();
  const [openDeleteServiceDialog, setOpenDeleteServiceDialog] =
    useState<boolean>(false);
  const handleOpenDeleteServiceDialog = () => {
    setOpenDeleteServiceDialog(true);
  };
  const handleCloseDeleteServiceDialog = () => {
    setOpenDeleteServiceDialog(false);
  };
  return (
    <Card>
      <CardHeader
        title={
          <Typography>
            {service.title.length > 20 ? (
              <>
                {service.title.slice(0, 20)}
                <Box component={"span"}>...</Box>
              </>
            ) : (
              service.title
            )}
          </Typography>
        }
        action={
          <IconButton color="error" onClick={handleOpenDeleteServiceDialog}>
            <Delete />
          </IconButton>
        }
      />
      <CardActionArea onClick={() => navigate(`/service/${service._id}`)}>
        <CardMedia component={"img"} src={service.img ?? ""} height={200} />
      </CardActionArea>
      <DeleteServiceDialog
        open={openDeleteServiceDialog}
        onClose={handleCloseDeleteServiceDialog}
        service={{ serviceId: service._id!, name: service.title }}
      />
    </Card>
  );
};

export default ServiceCard;
