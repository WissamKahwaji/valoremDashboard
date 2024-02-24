export const createFormData = (data: object): FormData => {
  const formData = new FormData();

  const appendToFormData = (obj: any, parentKey?: string): void => {
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      const formKey = parentKey ? `${parentKey}[${key}]` : key;
      console.log("sdfsfoooooooooooooo");
      if (
        typeof value === "object" &&
        value !== null &&
        !(value instanceof File)
      ) {
        appendToFormData(value, formKey);
      } else {
        formData.append(formKey, value);
      }
    });
  };

  appendToFormData(data);

  return formData;
};
