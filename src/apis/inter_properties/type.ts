export type InterPropertyInfo = {
  _id?: string;
  name: string;
  img: string | null;
  coverImg: string | null;
  bio: string;
  description: string;
  location: string;
  price: number;
  propertyInterContent: InterPropertyContent[];
  gallery: string[] | null;
  paymentPlan: string;
  imgs?: [];
};

export type InterPropertyContent = {
  title: string;
  description: string;
  img: string;
};
