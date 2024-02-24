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
  imgs?: [];
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
