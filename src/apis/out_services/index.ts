import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import { OurServices } from "./type";

const getOurServicesInfo = async () => {
  const res = await publicInstance.get<OurServices[]>(
    API_ROUTES.OUR_SERVICES.GET
  );
  return res.data;
};

const getServiceById = async (id: string | undefined) => {
  const res = await publicInstance.get<OurServices>(
    API_ROUTES.OUR_SERVICES.GET_SERVICE_DETAILS(id)
  );
  return res.data;
};

const deleteService = async (serviceId: string) => {
  const res = await publicInstance.delete<OurServices>(
    API_ROUTES.OUR_SERVICES.DELETE(serviceId)
  );
  return res.data;
};

const addService = async (payload: OurServices) => {
  const data = createFormData(payload!);

  const res = await publicInstance.post<OurServices>(
    API_ROUTES.OUR_SERVICES.ADD,
    data
  );
  return res;
};
const editService = async (payload: OurServices) => {
  const data = createFormData(payload);
  const res = await publicInstance.put<OurServices>(
    API_ROUTES.OUR_SERVICES.EDIT(payload._id),
    data
  );
  return res.data;
};

export {
  getOurServicesInfo,
  deleteService,
  addService,
  getServiceById,
  editService,
};
