export type AboutUsInfo = {
  _id: string;

  brief: {
    title: string;
    description: string;
  };
  content: AboutUsContent[];
  ourValues: OurValuesContent[];
};

export type AboutUsContent = {
  title: string;
  description: string;
  img: string;
};

export type OurValuesContent = {
  title: string;
  description: string;
};
