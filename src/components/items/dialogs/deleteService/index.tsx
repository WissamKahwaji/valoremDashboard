import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
} from "@mui/material";
import React from "react";

import { TransitionProps } from "@mui/material/transitions";
import { useDeletePropertyMutation } from "../../../../apis/properties/queries";
import { DeleteServiceDialogProps } from "./type";
import { useDeleteServiceMutation } from "../../../../apis/out_services/queries";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const DeleteServiceDialog = ({
  open,
  onClose,
  service,
}: DeleteServiceDialogProps) => {
  const { mutate: deleteService } = useDeleteServiceMutation();
  const handleDeleteService = () => {
    deleteService(service);
  };

  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition}>
      <DialogContent>
        <DialogContentText>{`are you sure you want to delete ${service.name}`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>cancel</Button>
        <Button variant="contained" onClick={handleDeleteService}>
          delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteServiceDialog;
