import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addProperty,
  deleteProperty,
  editProperty,
  getPropertyById,
  getPropertyInfo,
} from ".";
import { Property as TProperty } from "../../components/items/dialogs/deleteProperty/type";
import { toast } from "react-toastify";
import { PropertyInfo } from "./type";
import { useNavigate } from "react-router-dom";
const useGetPropertiesInfoQuery = () =>
  useQuery({
    queryKey: ["properties-info"],
    queryFn: () => getPropertyInfo(),
  });

const useGetPropertiesInfoByIdQuery = (id: string | undefined) =>
  useQuery({
    queryKey: ["properties-info-by-id"],
    queryFn: () => getPropertyById(id),
    enabled: !!id,
  });

const useAddPropertyMutation = () => {
  return useMutation({
    mutationKey: ["add-property"],
    mutationFn: (payload: PropertyInfo) => addProperty(payload),
    onSuccess(data, variable) {
      toast.success(`add ${variable.name} successfully.`);
    },
    onError(data, variable) {
      toast.error(`failed to add ${variable.name}`);
    },
  });
};
const useEditPropertyMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-property"],
    mutationFn: (payload: PropertyInfo) => editProperty(payload),
    onSuccess(data, variable) {
      toast.success(`edit ${variable.name} successfully.`);
      queryClient.invalidateQueries({ queryKey: ["properties-info"] });
      navigate("/properties", { replace: true });
    },
    onError(data, variable) {
      toast.error(`failed to edit ${variable.name}`);
    },
  });
};

const useDeletePropertyMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-property"],
    mutationFn: ({ id }: TProperty) => {
      return deleteProperty(id);
    },
    onSuccess(data, variable) {
      toast.success(`delete ${variable.name} successfully.`);
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
    onError(data, variable) {
      toast.error(`failed to delete ${variable.name}`);
    },
  });
};

export {
  useGetPropertiesInfoQuery,
  useGetPropertiesInfoByIdQuery,
  useAddPropertyMutation,
  useEditPropertyMutation,
  useDeletePropertyMutation,
};
