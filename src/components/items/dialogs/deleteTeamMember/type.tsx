export type DeleteTeamDialogProps = {
  open: boolean;
  onClose: () => void;
  teamMember: TeamMember;
};
export type TeamMember = {
  teamItemId: string;
  name: string;
};
