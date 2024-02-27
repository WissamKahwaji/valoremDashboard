import { InterProperty } from "../../components/items/dialogs/deleteInterProperty/type";
import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import { InterPropertyInfo } from "./type";

const getInterPropertyInfo = async () => {
  const res = await publicInstance.get<InterPropertyInfo[]>(
    API_ROUTES.INTER_PROPERTIES.GET_ALL
  );
  return res.data;
};

const getInterPropertyById = async (id: string | undefined) => {
  const res = await publicInstance.get<InterPropertyInfo>(
    API_ROUTES.INTER_PROPERTIES.GET_BY_ID(id)
  );
  return res.data;
};

const addInterProperty = async (payload: InterPropertyInfo) => {
  const data = createFormData(payload!);

  const res = await publicInstance.post<InterPropertyInfo>(
    API_ROUTES.INTER_PROPERTIES.ADD,
    data
  );
  return res;
};

const editInterProperty = async (payload: InterPropertyInfo) => {
  const data = createFormData(payload!);
  const res = await publicInstance.put<InterPropertyInfo>(
    API_ROUTES.INTER_PROPERTIES.EDIT(payload._id),
    data
  );
  return res.data;
};

const deleteInterProperty = async (id: string) => {
  const res = await publicInstance.delete<InterProperty>(
    API_ROUTES.INTER_PROPERTIES.DELETE(id)
  );
  return res.data;
};

export {
  getInterPropertyById,
  getInterPropertyInfo,
  deleteInterProperty,
  editInterProperty,
  addInterProperty,
};
