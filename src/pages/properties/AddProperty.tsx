import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FieldArray, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { PropertyInfo } from "../../apis/properties/type";
import ImageDragDropField from "../../components/items/inputs/imageDragDropFeild";
import LoadingButton from "../../components/items/buttons/loadingButtons/LoadingButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAddPropertyMutation } from "../../apis/properties/queries";
import MultipleImageDragDropField from "../../components/items/inputs/multipleImageDragDrop";

const AddProperty = () => {
  const { mutate: addProperty } = useAddPropertyMutation();

  const initialValues: PropertyInfo = {
    name: "",
    bio: "",
    description: "",
    location: "",
    price: 0,
    propertyContent: [],
    gallery: [""],
    bedrooms: 0,
    bathrooms: 0,
    space: "",
    breifDetails: [
      {
        value: "",
        title: "",
      },
    ],
    locationDetails: "",
    connectivity: [
      {
        title: "",
        value: "",
      },
    ],
    paymentPlan: "",
    floorPlan: "",
    masterPlan: "",
  };
  const handleSubmit = (
    values: PropertyInfo,
    { setSubmitting }: FormikHelpers<PropertyInfo>
  ) => {
    addProperty(values, {
      onSettled() {
        setSubmitting(false);
      },
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h1"
        sx={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          textTransform: "capitalize",
          mb: 3,
        }}
      >
        Add Property
      </Typography>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          setFieldValue,
        }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <ImageDragDropField name="img" label="Property Profile Image" />
              </Grid>
              <Grid item xs={12} md={6}>
                <ImageDragDropField
                  name="coverImg"
                  label="Property Cover Image"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  fullWidth
                  label="Property Name"
                  value={values.name}
                  onChange={handleChange}
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  InputLabelProps={{
                    sx: {
                      color: "white",
                    },
                  }}
                  InputProps={{
                    sx: {
                      color: "white",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="bio"
                  fullWidth
                  label="Property Bio"
                  multiline
                  minRows={3}
                  value={values.bio}
                  onChange={handleChange}
                  error={touched.bio && !!errors.bio}
                  helperText={touched.bio && errors.bio}
                  InputLabelProps={{
                    sx: {
                      color: "white",
                    },
                  }}
                  InputProps={{
                    sx: {
                      color: "white",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="description"
                  fullWidth
                  label="Property description"
                  multiline
                  minRows={3}
                  value={values.description}
                  onChange={handleChange}
                  error={touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                  InputLabelProps={{
                    sx: {
                      color: "white",
                    },
                  }}
                  InputProps={{
                    sx: {
                      color: "white",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="location"
                  fullWidth
                  label="Property location"
                  value={values.location}
                  onChange={handleChange}
                  error={touched.location && !!errors.location}
                  helperText={touched.location && errors.location}
                  InputLabelProps={{
                    sx: {
                      color: "white",
                    },
                  }}
                  InputProps={{
                    sx: {
                      color: "white",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="price"
                  fullWidth
                  label="Price"
                  type="number"
                  value={values.price}
                  onChange={handleChange}
                  error={touched.price && !!errors.price}
                  helperText={touched.price && errors.price}
                  InputLabelProps={{
                    sx: {
                      color: "white",
                    },
                  }}
                  InputProps={{
                    sx: {
                      color: "white",
                    },
                  }}
                />
              </Grid>
              <Grid
                container
                spacing={3}
                sx={{
                  p: 3,
                }}
              >
                <Grid item xs={12} md={4}>
                  <TextField
                    name="bedrooms"
                    fullWidth
                    label="Bedrooms"
                    type="number" // Set type to number
                    value={values.bedrooms}
                    onChange={handleChange}
                    error={touched.bedrooms && !!errors.bedrooms}
                    helperText={touched.bedrooms && errors.bedrooms}
                    InputLabelProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                    InputProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    name="bathrooms"
                    fullWidth
                    label="Bathrooms"
                    type="number" // Set type to number
                    value={values.bathrooms}
                    onChange={handleChange}
                    error={touched.bathrooms && !!errors.bathrooms}
                    helperText={touched.bathrooms && errors.bathrooms}
                    InputLabelProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                    InputProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    name="space"
                    fullWidth
                    label="Space of property"
                    value={values.space}
                    onChange={handleChange}
                    error={touched.space && !!errors.space}
                    helperText={touched.space && errors.space}
                    InputLabelProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                    InputProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={3}
                sx={{
                  p: 3,
                }}
              >
                <Grid item xs={12} md={6}>
                  <TextField
                    name="paymentPlan"
                    fullWidth
                    label="paymentPlan of property"
                    multiline
                    minRows={1}
                    value={values.paymentPlan}
                    onChange={handleChange}
                    error={touched.paymentPlan && !!errors.paymentPlan}
                    helperText={touched.paymentPlan && errors.paymentPlan}
                    InputLabelProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                    InputProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="floorPlan"
                    fullWidth
                    label="floor Plan of property"
                    multiline
                    minRows={1}
                    value={values.floorPlan}
                    onChange={handleChange}
                    error={touched.floorPlan && !!errors.floorPlan}
                    helperText={touched.floorPlan && errors.floorPlan}
                    InputLabelProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                    InputProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="masterPlan"
                    fullWidth
                    label="master Plan of property"
                    multiline
                    minRows={1}
                    value={values.masterPlan}
                    onChange={handleChange}
                    error={touched.masterPlan && !!errors.masterPlan}
                    helperText={touched.masterPlan && errors.masterPlan}
                    InputLabelProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                    InputProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="locationDetails"
                    fullWidth
                    label="location Details "
                    multiline
                    minRows={1}
                    value={values.locationDetails}
                    onChange={handleChange}
                    error={touched.locationDetails && !!errors.locationDetails}
                    helperText={
                      touched.locationDetails && errors.locationDetails
                    }
                    InputLabelProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                    InputProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h1"
                  sx={{
                    textAlign: "center",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    mb: 3,
                  }}
                >
                  Add your details like For Booking, Payment Plan, Handover
                  Date, Starting Price
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    border: "1px solid #C5A867",
                    padding: 2,
                    marginBottom: 2,
                  }}
                >
                  <Grid item xs={12}>
                    <FieldArray name="breifDetails">
                      {({ push, remove }) => (
                        <>
                          {values.breifDetails.map(
                            (
                              item: { title: string; value: string },
                              index: number
                            ) => (
                              <Box
                                key={index}
                                sx={{
                                  border: "1px solid #C5A867",
                                  padding: 2,
                                  marginBottom: 2,
                                }}
                              >
                                <Grid container spacing={2}>
                                  <Grid item xs={12} md={4}>
                                    <TextField
                                      fullWidth
                                      name={`breifDetails.${index}.title`}
                                      label="Title"
                                      value={item.title}
                                      onChange={e =>
                                        setFieldValue(
                                          `breifDetails.${index}.title`,
                                          e.target.value
                                        )
                                      }
                                      InputLabelProps={{
                                        sx: {
                                          color: "white",
                                        },
                                      }}
                                      InputProps={{
                                        sx: {
                                          color: "white",
                                        },
                                      }}
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={7}>
                                    <TextField
                                      fullWidth
                                      multiline
                                      name={`breifDetails.${index}.value`}
                                      label="Value"
                                      value={item.value}
                                      onChange={e =>
                                        setFieldValue(
                                          `breifDetails.${index}.value`,
                                          e.target.value
                                        )
                                      }
                                      InputLabelProps={{
                                        sx: {
                                          color: "white",
                                        },
                                      }}
                                      InputProps={{
                                        sx: {
                                          color: "white",
                                        },
                                      }}
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={1}>
                                    <IconButton
                                      sx={{ color: "red" }}
                                      onClick={() => remove(index)}
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </Grid>
                                </Grid>
                              </Box>
                            )
                          )}
                          <Button
                            variant="contained"
                            onClick={() => push({ title: "", value: "" })}
                          >
                            Add Content
                          </Button>
                        </>
                      )}
                    </FieldArray>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h1"
                  sx={{
                    textAlign: "center",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    mb: 3,
                  }}
                >
                  Property Connectivity
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    border: "1px solid #C5A867",
                    padding: 2,
                    marginBottom: 2,
                  }}
                >
                  <Grid item xs={12}>
                    <FieldArray name="connectivity">
                      {({ push, remove }) => (
                        <>
                          {values.connectivity.map(
                            (
                              item: { title: string; value: string },
                              index: number
                            ) => (
                              <Box
                                key={index}
                                sx={{
                                  border: "1px solid #C5A867",
                                  padding: 2,
                                  marginBottom: 2,
                                }}
                              >
                                <Grid container spacing={2}>
                                  <Grid item xs={12} md={4}>
                                    <TextField
                                      fullWidth
                                      name={`connectivity.${index}.title`}
                                      label="Title"
                                      value={item.title}
                                      onChange={e =>
                                        setFieldValue(
                                          `connectivity.${index}.title`,
                                          e.target.value
                                        )
                                      }
                                      InputLabelProps={{
                                        sx: {
                                          color: "white",
                                        },
                                      }}
                                      InputProps={{
                                        sx: {
                                          color: "white",
                                        },
                                      }}
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={7}>
                                    <TextField
                                      fullWidth
                                      multiline
                                      name={`connectivity.${index}.value`}
                                      label="Value"
                                      value={item.value}
                                      onChange={e =>
                                        setFieldValue(
                                          `connectivity.${index}.value`,
                                          e.target.value
                                        )
                                      }
                                      InputLabelProps={{
                                        sx: {
                                          color: "white",
                                        },
                                      }}
                                      InputProps={{
                                        sx: {
                                          color: "white",
                                        },
                                      }}
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={1}>
                                    <IconButton
                                      sx={{ color: "red" }}
                                      onClick={() => remove(index)}
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </Grid>
                                </Grid>
                              </Box>
                            )
                          )}
                          <Button
                            variant="contained"
                            onClick={() => push({ title: "", value: "" })}
                          >
                            Add Content
                          </Button>
                        </>
                      )}
                    </FieldArray>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    border: "1px solid #C5A867",
                    padding: 2,
                    marginBottom: 2,
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Gallery
                  </Typography>
                  {/* <input
                    type="file"
                    name="imgs"
                    accept="image/*"
                    multiple
                    onChange={event => {
                      setFieldValue("imgs", event.target.files);
                    }}
                  /> */}
                  <Grid item xs={12} md={6}>
                    <ImageDragDropField
                      name="imgs"
                      label="Property Profile Image"
                    />
                  </Grid>
                  {/* <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={e => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        const formData = new FormData();
                        Array.from(files).forEach(file => {
                          formData.append("imgs", file);
                        });
                        setFieldValue("imgs", formData);
                      }
                    }}
                  /> */}
                </Box>
              </Grid>
              {/* Add more fields as needed */}
              <Grid item xs={12}>
                <Stack justifyContent={"center"}>
                  <LoadingButton
                    isSubmitting={isSubmitting}
                    buttonText={"submit"}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddProperty;
