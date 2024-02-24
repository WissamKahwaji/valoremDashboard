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
import { DeletePropertyDialogProps } from "./type";
import { useDeletePropertyMutation } from "../../../../apis/properties/queries";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const DeletePropertyDialog = ({
  open,
  onClose,
  property,
}: DeletePropertyDialogProps) => {
  const { mutate: deleteProperty } = useDeletePropertyMutation();
  const handleDeleteProduct = () => {
    deleteProperty(property);
  };

  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition}>
      <DialogContent>
        <DialogContentText>{`are you sure you want to delete ${property.name}`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>cancel</Button>
        <Button variant="contained" onClick={handleDeleteProduct}>
          delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePropertyDialog;
