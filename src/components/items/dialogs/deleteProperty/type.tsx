export type DeletePropertyDialogProps = {
  open: boolean;
  onClose: () => void;
  property: Property;
};
export type Property = {
  id: string;
  name: string;
};
