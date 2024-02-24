import { Property } from "../../components/items/dialogs/deleteProperty/type";
import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import { PropertyInfo } from "./type";

const getPropertyInfo = async () => {
  const res = await publicInstance.get<PropertyInfo[]>(
    API_ROUTES.PROPERTIES.GET_ALL
  );
  return res.data;
};

const getPropertyById = async (id: string | undefined) => {
  const res = await publicInstance.get<PropertyInfo>(
    API_ROUTES.PROPERTIES.GET_BY_ID(id)
  );
  return res.data;
};

const deleteProperty = async (id: string) => {
  const res = await publicInstance.delete<Property>(
    API_ROUTES.PROPERTIES.DELETE(id)
  );
  return res.data;
};

const addProperty = async (payload: PropertyInfo) => {
  const data = createFormData(payload!);

  const res = await publicInstance.post<PropertyInfo>(
    API_ROUTES.PROPERTIES.ADD,
    data
  );
  return res;
};

const editProperty = async (payload: PropertyInfo) => {
  const data = createFormData(payload!);
  const res = await publicInstance.put<PropertyInfo>(
    API_ROUTES.PROPERTIES.EDIT(payload._id),
    data
  );
  return res.data;
};

export {
  getPropertyInfo,
  getPropertyById,
  addProperty,
  editProperty,
  deleteProperty,
};
