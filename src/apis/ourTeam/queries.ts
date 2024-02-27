import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addTeamMember,
  deleteTeam,
  editTeamMember,
  getOurTeamInfo,
  reOrderTeam,
} from ".";
import { TeamMember } from "../../components/items/dialogs/deleteTeamMember/type";
import { toast } from "react-toastify";
import { TeamsInfo } from "./type";
import { useNavigate } from "react-router-dom";

const useGetOurTeamInfoQuery = () =>
  useQuery({ queryKey: ["teams-info"], queryFn: () => getOurTeamInfo() });

const useAddTeamMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-team-member"],
    mutationFn: (payload: TeamsInfo) => addTeamMember(payload),
    onSuccess(data, variable) {
      toast.success(`add ${variable.name} successfully.`);
      queryClient.invalidateQueries({ queryKey: ["teams-info"] });
      navigate("/our-teams", { replace: true });
    },
    onError(data, variable) {
      toast.error(`failed to add ${variable.name}`);
    },
  });
};
const useReOrderTeamMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["reorder-team"],
    mutationFn: (payload: TeamsInfo[]) => reOrderTeam(payload),
    onSuccess(data, variable) {
      toast.success(`re-order teams successfully.`);
      queryClient.invalidateQueries({ queryKey: ["teams-info"] });
      // navigate("/our-teams", { replace: true });
    },
    onError(data, variable) {
      toast.error(`failed to re-order teams`);
    },
  });
};

const useEditTeamMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-team-member"],
    mutationFn: (payload: TeamsInfo) => editTeamMember(payload),
    onSuccess(data, variable) {
      toast.success(`edit ${variable.name} successfully.`);
      queryClient.invalidateQueries({ queryKey: ["teams-info"] });
      navigate("/our-teams", { replace: true });
    },
    onError(data, variable) {
      toast.error(`failed to edit ${variable.name}`);
    },
  });
};
const useDeleteTeamMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-team"],
    mutationFn: ({ teamItemId }: TeamMember) => {
      return deleteTeam(teamItemId);
    },
    onSuccess(data, variable) {
      toast.success(`delete ${variable.name} successfully.`);
      queryClient.invalidateQueries({ queryKey: ["teams-info"] });
    },
    onError(data, variable) {
      toast.error(`failed to delete ${variable.name}`);
    },
  });
};

export {
  useGetOurTeamInfoQuery,
  useAddTeamMutation,
  useEditTeamMutation,
  useDeleteTeamMutation,
  useReOrderTeamMutation,
};
