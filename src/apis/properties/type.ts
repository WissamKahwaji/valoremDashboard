export type PropertyInfo = {
  _id?: string;
  name: string;
  img?: string;
  coverImg?: string | undefined;
  bio: string;
  description: string;
  location: string;
  price: number;
  propertyType?: string;
  propertyContent: PropertyContent[];
  gallery?: string[];
  bedrooms: number;
  bathrooms: number;
  type?: typeProperty | undefined;
  subType?: subTypeProperty | undefined;
  space: string;
  breifDetails: [
    {
      title: string;
      value: string;
    }
  ];
  locationDetails: string;
  connectivity: [
    {
      title: string;
      value: string;
    }
  ];
  paymentPlan: string;
  floorPlan: string;
  masterPlan: string;
  imgs?: File[] | null;
};

export type PropertyContent = {
  title: string;
  description: string;
  details: [
    {
      title: string;
      icon: string;
    }
  ];
  imgs: string[];
};

export enum typeProperty {
  COMMERCIAL = "commercial",
  RESIDENTIAL = "residential",
}

export enum subTypeProperty {
  OFF_PLAN = "off plan",
  SECONDARY = "secondary projects",
}
