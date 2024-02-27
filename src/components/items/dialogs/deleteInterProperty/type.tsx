export type DeleteInterPropertyDialogProps = {
  open: boolean;
  onClose: () => void;
  property: InterProperty;
};
export type InterProperty = {
  id: string;
  name: string;
};
