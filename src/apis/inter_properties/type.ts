export type InterPropertyInfo = {
  _id?: string;
  name: string;
  img: string | null;
  coverImg: string | null;
  bio: string;
  description: string;
  location: string;
  price: number;
  type?: typeProperty | undefined;
  subType?: subTypeProperty | undefined;
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
export enum typeProperty {
  COMMERCIAL = "commercial",
  RESIDENTIAL = "residential",
}

export enum subTypeProperty {
  OFF_PLAN = "off plan",
  SECONDARY = "secondary projects",
}
