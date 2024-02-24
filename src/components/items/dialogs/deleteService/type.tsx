export type DeleteServiceDialogProps = {
  open: boolean;
  onClose: () => void;
  service: Service;
};
export type Service = {
  serviceId: string;
  name: string;
};
