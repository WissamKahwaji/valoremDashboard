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
import { DeleteTeamDialogProps } from "./type";
import { useDeleteTeamMutation } from "../../../../apis/ourTeam/queries";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const DeleteTeamMemberDialog = ({
  open,
  onClose,
  teamMember,
}: DeleteTeamDialogProps) => {
  const { mutate: deleteTeam } = useDeleteTeamMutation();
  const handleDeleteTeamMember = () => {
    deleteTeam(teamMember);
  };

  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition}>
      <DialogContent>
        <DialogContentText>{`are you sure you want to delete ${teamMember.name}`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>cancel</Button>
        <Button variant="contained" onClick={handleDeleteTeamMember}>
          delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTeamMemberDialog;
