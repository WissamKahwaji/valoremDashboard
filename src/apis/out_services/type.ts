export type OurServices = {
  _id?: string;
  title: string;
  img: string | null;
  content: ServiceContent[];
};

export type ServiceContent = {
  title: string;
  description: string;
};
