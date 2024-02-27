const PROPERTIES = {
  GET_ALL: "/property",
  GET_BY_ID: (id: string | undefined) => `property/${id}`,
  ADD: "/property/add",
  DELETE: (id: string | undefined) => `/property/delete/${id}`,
  EDIT: (propertyId: string | undefined) => `/property/edit/${propertyId}`,
};

const INTER_PROPERTIES = {
  GET_ALL: "/propertyInter",
  GET_BY_ID: (id: string | undefined) => `/propertyInter/${id}`,
  ADD: `/propertyInter/add`,
  DELETE: (id: string | undefined) => `/propertyInter/delete/${id}`,
  EDIT: (propertyId: string | undefined) => `/propertyInter/edit/${propertyId}`,
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

const OUR_TEAMS = {
  GET: "/our-team/teams",
  ADD: "/our-team/add-team-item",
  EDIT: (teamItemId: string | undefined) =>
    `/our-team/edit-team-item/${teamItemId}`,
  DELETE: (teamItemId: string | undefined) =>
    `/our-team/delete-team-item/${teamItemId}`,
  REORDER: `/our-team/reorder-team`,
};

const API_ROUTES = {
  PROPERTIES,
  CONTACT_US,
  OUR_SERVICES,
  ABOUT_US,
  AUTH,
  OUR_TEAMS,
  INTER_PROPERTIES,
};

export default API_ROUTES;
