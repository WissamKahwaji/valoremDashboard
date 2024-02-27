import React from "react";
import { useParams } from "react-router-dom";
import { Params } from "./type";
import {
  useAddInterPropertyMutation,
  useEditInterPropertyMutation,
  useGetInterPropertiesInfoByIdQuery,
} from "../../apis/inter_properties/queries";
import LoadingPage from "../loadingPage/LoadingPage";
import {
  InterPropertyContent,
  InterPropertyInfo,
} from "../../apis/inter_properties/type";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { FieldArray, Form, Formik, FormikHelpers } from "formik";
import ImageDragDropField from "../../components/items/inputs/imageDragDropFeild";
import LoadingButton from "../../components/items/buttons/loadingButtons/LoadingButton";

const InterPropertyDetails = () => {
  const { id } = useParams<Params>();
  const {
    data: property,
    isLoading,
    isFetching,
    isError,
  } = useGetInterPropertiesInfoByIdQuery(id);
  const { mutate: editInterPropertyInfo } = useEditInterPropertyMutation();
  const { mutate: addInterPropertyInfo } = useAddInterPropertyMutation();

  if (isLoading && isFetching) return <LoadingPage />;
  if (isError) return <></>;

  const initialValues: InterPropertyInfo = {
    ...(id && { _id: id }),
    name: property?.name ?? "",
    img: property?.img ?? null,
    coverImg: property?.coverImg ?? null,
    bio: property?.bio ?? "",
    description: property?.description ?? "",
    location: property?.location ?? "",
    price: property?.price ?? 0,
    propertyInterContent: property?.propertyInterContent ?? [],
    gallery: property?.gallery ?? [],
    paymentPlan: property?.paymentPlan ?? "",
  };

  const handleSubmit = (
    values: InterPropertyInfo,
    { setSubmitting }: FormikHelpers<InterPropertyInfo>
  ) => {
    id
      ? editInterPropertyInfo(values, {
          onSettled() {
            setSubmitting(false);
          },
        })
      : addInterPropertyInfo(values, {
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
        international Property
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
              <Grid xs={12} md={10} sx={{ marginBottom: 2 }}>
                <ImageDragDropField
                  name="profile"
                  label="Property Image"
                  oldImg={values.img ?? ""}
                />
              </Grid>
              <Grid xs={12} md={10}>
                <ImageDragDropField
                  name="intercoverImg"
                  label="Property Cover Image"
                  oldImg={values.coverImg ?? ""}
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
              <Grid item xs={12} md={8}>
                <Box
                  sx={{
                    border: "1px solid #C5A867",
                    padding: 2,
                    marginTop: 3,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      marginBottom: 2,
                    }}
                  >
                    Content
                  </Typography>
                  <FieldArray name="propertyInterContent">
                    {({ push, remove }) => (
                      <>
                        {values.propertyInterContent.map(
                          (contentItem: InterPropertyContent, index) => (
                            <Box key={index} sx={{ padding: 2 }}>
                              <TextField
                                fullWidth
                                name={`propertyInterContent.${index}.title`}
                                label="Title"
                                value={contentItem.title}
                                onChange={e =>
                                  setFieldValue(
                                    `propertyInterContent.${index}.title`,
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
                                name={`propertyInterContent.${index}.description`}
                                label="Description"
                                value={contentItem.description}
                                onChange={e =>
                                  setFieldValue(
                                    `propertyInterContent.${index}.description`,
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
                              <input
                                type="file"
                                accept="image/*"
                                onChange={e => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = event => {
                                      setFieldValue(
                                        `propertyInterContent.${index}.img`,
                                        event.target?.result as string
                                      );
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                              {contentItem.img && (
                                <img
                                  src={contentItem.img}
                                  alt={`Content ${index + 1}`}
                                  style={{
                                    marginTop: 2,
                                    maxWidth: "100%",
                                  }}
                                />
                              )}
                              <Button
                                variant="contained"
                                onClick={() => remove(index)}
                                sx={{ marginTop: 2 }}
                              >
                                Remove
                              </Button>
                            </Box>
                          )
                        )}
                        <Button
                          variant="contained"
                          onClick={() => push({ title: "", description: "" })}
                        >
                          Add Content
                        </Button>
                      </>
                    )}
                  </FieldArray>
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

                  <Grid item xs={12} md={6}>
                    <ImageDragDropField
                      name="imgs"
                      label="Property Profile Image"
                    />
                  </Grid>
                </Box>
              </Grid>
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

export default InterPropertyDetails;
