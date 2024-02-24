import {
  Box,
  Grid,
  TextField,
  Typography,
  IconButton,
  Button,
  Stack,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { Params } from "./type";
import {
  useEditServiceMutation,
  useGetServiceDetailsQuery,
} from "../../apis/out_services/queries";
import { Form, Formik, FieldArray, FormikHelpers } from "formik";
import {
  OurServices as TService,
  ServiceContent,
} from "../../apis/out_services/type";
import LoadingPage from "../loadingPage/LoadingPage";
import ImageDragDropField from "../../components/items/inputs/imageDragDropFeild";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from "../../components/items/buttons/loadingButtons/LoadingButton";

const ServiceDetails = () => {
  const { id } = useParams<Params>();
  const {
    data: service,
    isLoading,
    isFetching,
    isError,
  } = useGetServiceDetailsQuery(id);

  const { mutate: editService } = useEditServiceMutation();
  if (isLoading && isFetching) return <LoadingPage />;
  if (isError) return <></>;
  const initialValues: TService = {
    ...(id && { _id: id }),
    title: service?.title ?? "",
    img: null,
    content: service?.content ?? [],
  };
  const handleSubmit = async (
    values: TService,
    { setSubmitting }: FormikHelpers<TService>
  ) => {
    editService(values, {
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
        Service
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
                  label="Service Image"
                  oldImg={service?.img! as string}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  name="title"
                  fullWidth
                  label="Service Title"
                  onChange={handleChange}
                  value={values.title}
                  InputLabelProps={{ sx: { color: "white" } }}
                  InputProps={{ sx: { color: "white" } }}
                />
              </Grid>
            </Grid>
            <Typography
              component={"h1"}
              sx={{
                textAlign: "center",
                fontSize: "2rem",
                textTransform: "capitalize",
                mb: 3,
                mt: 6,
              }}
            >
              Content
            </Typography>
            <FieldArray name="content">
              {({ push, remove }) => (
                <>
                  {values.content.map(
                    (contentItem: ServiceContent, index: number) => (
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
                              name={`content.${index}.title`}
                              label="Title"
                              value={contentItem.title}
                              onChange={e =>
                                setFieldValue(
                                  `content.${index}.title`,
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
                              name={`content.${index}.description`}
                              label="Description"
                              value={contentItem.description}
                              onChange={e =>
                                setFieldValue(
                                  `content.${index}.description`,
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
                    onClick={() => push({ title: "", description: "" })}
                  >
                    Add Content
                  </Button>
                </>
              )}
            </FieldArray>
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

export default ServiceDetails;
