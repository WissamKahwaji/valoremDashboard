import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addInterProperty,
  deleteInterProperty,
  editInterProperty,
  getInterPropertyById,
  getInterPropertyInfo,
} from ".";
import { InterProperty } from "../../components/items/dialogs/deleteInterProperty/type";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { InterPropertyInfo } from "./type";

const useGetInterPropertiesInfoQuery = () =>
  useQuery({
    queryKey: ["inter-properties-info"],
    queryFn: () => getInterPropertyInfo(),
  });
const useGetInterPropertiesInfoByIdQuery = (id: string | undefined) =>
  useQuery({
    queryKey: ["inter-properties-info-by-id"],
    queryFn: () => getInterPropertyById(id),
    enabled: !!id,
  });

const useEditInterPropertyMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-inter-property"],
    mutationFn: (payload: InterPropertyInfo) => editInterProperty(payload),
    onSuccess(data, variable) {
      toast.success(`edit ${variable.name} successfully.`);
      queryClient.invalidateQueries({ queryKey: ["inter-properties-info"] });
      navigate("/inter-properties", { replace: true });
    },
    onError(data, variable) {
      toast.error(`failed to edit ${variable.name}`);
    },
  });
};
const useAddInterPropertyMutation = () => {
  return useMutation({
    mutationKey: ["addinter--property"],
    mutationFn: (payload: InterPropertyInfo) => addInterProperty(payload),
    onSuccess(data, variable) {
      toast.success(`add ${variable.name} successfully.`);
    },
    onError(data, variable) {
      toast.error(`failed to add ${variable.name}`);
    },
  });
};

const useDeleteInterPropertyMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-inter-property"],
    mutationFn: ({ id }: InterProperty) => {
      return deleteInterProperty(id);
    },
    onSuccess(data, variable) {
      toast.success(`delete ${variable.name} successfully.`);
      queryClient.invalidateQueries({ queryKey: ["inter-properties-info"] });
    },
    onError(data, variable) {
      toast.error(`failed to delete ${variable.name}`);
    },
  });
};

export {
  useGetInterPropertiesInfoQuery,
  useGetInterPropertiesInfoByIdQuery,
  useDeleteInterPropertyMutation,
  useEditInterPropertyMutation,
  useAddInterPropertyMutation,
};
