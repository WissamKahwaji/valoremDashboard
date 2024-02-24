import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addService,
  deleteService,
  editService,
  getOurServicesInfo,
  getServiceById,
} from ".";
import { Service } from "../../components/items/dialogs/deleteService/type";
import { toast } from "react-toastify";
import { OurServices } from "./type";
import { useNavigate } from "react-router-dom";

const useGetOurServicesInfoQuery = () =>
  useQuery({
    queryKey: ["our-servies-info"],
    queryFn: () => getOurServicesInfo(),
  });

const useGetServiceDetailsQuery = (id: string | undefined) =>
  useQuery({
    queryKey: ["service-details"],
    queryFn: () => getServiceById(id),
  });

const useDeleteServiceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-service"],
    mutationFn: ({ serviceId }: Service) => {
      return deleteService(serviceId);
    },
    onSuccess(data, variable) {
      toast.success(`delete ${variable.name} successfully.`);
      queryClient.invalidateQueries({ queryKey: ["our-servies-info"] });
    },
    onError(data, variable) {
      toast.error(`failed to delete ${variable.name}`);
    },
  });
};

const useAddServiceMutation = () => {
  return useMutation({
    mutationKey: ["add-service"],
    mutationFn: (payload: OurServices) => addService(payload),
    onSuccess(data, variable) {
      toast.success(`add ${variable.title} successfully.`);
    },
    onError(data, variable) {
      toast.error(`failed to add ${variable.title}`);
    },
  });
};

const useEditServiceMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-service"],
    mutationFn: (payload: OurServices) => editService(payload),
    onSuccess(data, variable) {
      toast.success(`edit ${variable.title} successfully.`);
      queryClient.invalidateQueries({ queryKey: ["service-details"] });
      navigate("/services", { replace: true });
    },
    onError(data, variable) {
      toast.error(`failed to edit ${variable.title}`);
    },
  });
};

export {
  useGetOurServicesInfoQuery,
  useDeleteServiceMutation,
  useAddServiceMutation,
  useGetServiceDetailsQuery,
  useEditServiceMutation,
};
