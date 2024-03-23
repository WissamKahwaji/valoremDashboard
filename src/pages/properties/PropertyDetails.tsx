import React from "react";
import { useParams } from "react-router-dom";
import { Params } from "./type";
import {
  useEditPropertyMutation,
  useGetPropertiesInfoByIdQuery,
} from "../../apis/properties/queries";
import LoadingPage from "../loadingPage/LoadingPage";
import {
  PropertyContent,
  PropertyInfo,
  subTypeProperty,
  PropertyInfo as TProperty,
  typeProperty,
} from "../../apis/properties/type";
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
import ImageDragDropField from "../../components/items/inputs/imageDragDropFeild";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from "../../components/items/buttons/loadingButtons/LoadingButton";
import MuiTypeRadioButton from "../../components/items/buttons/muiRadioButton/MuiTypeRadioButton";
import MuiSubTypeRadioButton from "../../components/items/buttons/muiRadioButton/MuiSubTypeRadioButton";

const PropertyDetails = () => {
  const { id } = useParams<Params>();
  const {
    data: property,
    isLoading,
    isFetching,
    isError,
  } = useGetPropertiesInfoByIdQuery(id);
  const { mutate: editPropertyInfo } = useEditPropertyMutation();

  if (isLoading && isFetching) return <LoadingPage />;
  if (isError) return <></>;

  const initialValues: TProperty = {
    ...(id && { _id: id }),
    name: property?.name ?? "",
    bio: property?.bio ?? "",
    description: property?.description ?? "",
    location: property?.location ?? "",
    price: property?.price ?? 0,
    propertyContent: property?.propertyContent ?? [],
    gallery: property?.gallery ?? [],
    bedrooms: property?.bedrooms ?? 0,
    bathrooms: property?.bathrooms ?? 0,
    space: property?.space ?? "",
    breifDetails: property?.breifDetails ?? [
      {
        title: "",
        value: "",
      },
    ],
    locationDetails: property?.locationDetails ?? "",
    connectivity: property?.connectivity ?? [
      {
        title: "",
        value: "",
      },
    ],
    paymentPlan: property?.paymentPlan ?? "",
    floorPlan: property?.floorPlan ?? "",
    masterPlan: property?.masterPlan ?? "",
    type: property?.type,
    subType: property?.subType,
  };
  const handleSubmit = (
    values: PropertyInfo,
    { setSubmitting }: FormikHelpers<PropertyInfo>
  ) => {
    editPropertyInfo(values, {
      onSettled() {
        setSubmitting(false);
      },
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        component={"h1"}
        sx={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          textTransform: "capitalize",
          mb: 6,
        }}
      >
        Property
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
            <Grid container justifyContent={"center"} spacing={3}>
              <Grid item xs={12} md={10}>
                <ImageDragDropField
                  name="img"
                  label="Property Image"
                  oldImg={property?.img! as string}
                />
              </Grid>
              <Grid item xs={12} md={10}>
                <ImageDragDropField
                  name="coverImg"
                  label="Property Cover Image"
                  oldImg={property?.coverImg! as string}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <MuiTypeRadioButton
                  label={"Property Type"}
                  val={values.type}
                  onChange={value => {
                    setFieldValue("type", value.toString());
                    if (value.toString() === typeProperty.COMMERCIAL) {
                      setFieldValue("subType", undefined);
                    }
                  }}
                  options={[
                    {
                      label: typeProperty.COMMERCIAL,
                      value: typeProperty.COMMERCIAL,
                    },
                    {
                      label: typeProperty.RESIDENTIAL,
                      value: typeProperty.RESIDENTIAL,
                    },
                  ]}
                />
              </Grid>
              {values.type === typeProperty.RESIDENTIAL && (
                <Grid item xs={12} md={6}>
                  <MuiSubTypeRadioButton
                    label={"Property SubType"}
                    val={values.subType}
                    onChange={value => {
                      setFieldValue("subType", value.toString());
                    }}
                    options={[
                      {
                        label: subTypeProperty.OFF_PLAN,
                        value: subTypeProperty.OFF_PLAN,
                      },
                      {
                        label: subTypeProperty.SECONDARY,
                        value: subTypeProperty.SECONDARY,
                      },
                    ]}
                  />
                </Grid>
              )}
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
                      Property Features & Aminities
                    </Typography>
                  </Grid>
                  <FieldArray name="propertyContent">
                    {({ push, remove }) => (
                      <>
                        {values.propertyContent.map(
                          (propertyItem: PropertyContent, index: number) => (
                            <Box
                              key={index}
                              sx={{
                                border: "1px solid #C5A867",
                                padding: 2,
                                marginBottom: 2,
                              }}
                            >
                              <TextField
                                fullWidth
                                name={`propertyContent.${index}.title`}
                                label="Title"
                                value={propertyItem.title}
                                onChange={e =>
                                  setFieldValue(
                                    `propertyContent.${index}.title`,
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
                              <TextField
                                fullWidth
                                multiline
                                name={`propertyContent.${index}.description`}
                                label="Description"
                                value={propertyItem.description}
                                onChange={e =>
                                  setFieldValue(
                                    `propertyContent.${index}.description`,
                                    e.target.value
                                  )
                                }
                                sx={{ marginTop: 2 }}
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
                              <Box sx={{ mt: 2 }}>
                                <Typography
                                  variant="h5"
                                  component="text"
                                  sx={{ mr: 2 }}
                                >
                                  choose images for this Features and aminities
                                </Typography>
                                <input
                                  type="file"
                                  name="imgs"
                                  accept="image/*"
                                  multiple
                                  onChange={event => {
                                    setFieldValue("imgs", event.target.files);
                                  }}
                                />
                              </Box>
                              <FieldArray
                                name={`propertyContent.${index}.details`}
                              >
                                {({ push, remove }) => (
                                  <Box
                                    key={index}
                                    sx={{
                                      border: "1px solid #C5A867",
                                      padding: 2,
                                      my: 2,
                                    }}
                                  >
                                    {propertyItem.details.map(
                                      (
                                        detailItem: {
                                          title: string;
                                        },
                                        indexx: number
                                      ) => (
                                        <Box
                                          key={indexx}
                                          sx={{
                                            padding: 2,
                                            marginBottom: 2,
                                          }}
                                        >
                                          <TextField
                                            fullWidth
                                            name={`propertyContent.${index}.details.${indexx}.title`}
                                            label="Title"
                                            value={detailItem.title}
                                            onChange={e =>
                                              setFieldValue(
                                                `propertyContent.${index}.details.${indexx}.title`,
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
                                          <Button
                                            variant="contained"
                                            onClick={() => remove(indexx)}
                                            sx={{ marginTop: 2 }}
                                          >
                                            Remove
                                          </Button>
                                        </Box>
                                      )
                                    )}
                                    <Button
                                      variant="contained"
                                      onClick={() => push({ title: "" })}
                                    >
                                      Add Content
                                    </Button>
                                  </Box>
                                )}
                              </FieldArray>
                            </Box>
                          )
                        )}
                      </>
                    )}
                  </FieldArray>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ mt: 3 }}>
              <Stack justifyContent={"center"}>
                <LoadingButton
                  isSubmitting={isSubmitting}
                  buttonText={"submit"}
                />
              </Stack>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default PropertyDetails;
