const PROPERTIES = {
  GET_ALL: "/property",
  GET_BY_ID: (id: string | undefined) => `property/${id}`,
  ADD: "/property/add",
  DELETE: (id: string | undefined) => `/property/delete/${id}`,
  EDIT: (propertyId: string | undefined) => `/property/edit/${propertyId}`,
};

const CONTACT_US = {
  GET: "/contact",
  Edit: (id: string | undefined) => `contact/edit-contact-data/${id}`,
};

const ABOUT_US = {
  GET: "/about-us",
  EDIT: "/about-us/edit",
};

const OUR_SERVICES = {
  GET: "/services",
  GET_SERVICE_DETAILS: (id: string | undefined) => `services/${id}`,
  DELETE: (serviceId: string | undefined) => `/services/delete/${serviceId}`,
  ADD: "/services/add",
  EDIT: (serviceId: string | undefined) => `/services/edit/${serviceId}`,
};
const AUTH = {
  SIGNIN: "/auth/signin",
};

const API_ROUTES = {
  PROPERTIES,
  CONTACT_US,
  OUR_SERVICES,
  ABOUT_US,
  AUTH,
};

export default API_ROUTES;
