import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import { TeamsInfo } from "./type";

const getOurTeamInfo = async () => {
  const res = await publicInstance.get<TeamsInfo[]>(API_ROUTES.OUR_TEAMS.GET);
  return res.data;
};

const addTeamMember = async (payload: TeamsInfo) => {
  const data = createFormData(payload!);
  const res = await publicInstance.post<TeamsInfo>(
    API_ROUTES.OUR_TEAMS.ADD,
    data
  );
  return res.data;
};

const editTeamMember = async (payload: TeamsInfo) => {
  const data = createFormData(payload);
  const res = await publicInstance.put<TeamsInfo>(
    API_ROUTES.OUR_TEAMS.EDIT(payload._id),
    data
  );
  return res.data;
};
const deleteTeam = async (teamItemId: string) => {
  const res = await publicInstance.delete<TeamsInfo>(
    API_ROUTES.OUR_TEAMS.DELETE(teamItemId)
  );
  return res.data;
};

const reOrderTeam = async (payload: TeamsInfo[]) => {
  // const data = createFormData(payload!);
  const res = await publicInstance.post<TeamsInfo>(
    API_ROUTES.OUR_TEAMS.REORDER,
    { team: payload }
  );
  return res.data;
};

export {
  getOurTeamInfo,
  addTeamMember,
  editTeamMember,
  deleteTeam,
  reOrderTeam,
};
