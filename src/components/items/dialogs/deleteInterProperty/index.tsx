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
import { DeleteInterPropertyDialogProps } from "./type";
import { useDeleteInterPropertyMutation } from "../../../../apis/inter_properties/queries";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const DeleteInterPropertyDialog = ({
  open,
  onClose,
  property,
}: DeleteInterPropertyDialogProps) => {
  const { mutate: deleteInterProperty } = useDeleteInterPropertyMutation();
  const handleDeleteInterProduct = () => {
    deleteInterProperty(property);
  };

  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition}>
      <DialogContent>
        <DialogContentText>{`are you sure you want to delete ${property.name}`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>cancel</Button>
        <Button variant="contained" onClick={handleDeleteInterProduct}>
          delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteInterPropertyDialog;
