import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { OurServices } from "../../apis/out_services/type";
import ImageDragDropField from "../../components/items/inputs/imageDragDropFeild";
import LoadingButton from "../../components/items/buttons/loadingButtons/LoadingButton";
import { useAddServiceMutation } from "../../apis/out_services/queries";

const AddServicePage = () => {
  const { mutate: addService } = useAddServiceMutation();
  const initialValues: OurServices = {
    title: "",
    img: null,
    content: [],
  };

  const handleSubmit = (
    values: OurServices,
    { setSubmitting }: FormikHelpers<OurServices>
  ) => {
    addService(values, {
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
          mb: 3,
        }}
      >
        add service
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
            <Grid container justifyContent={"center"} gap={3}>
              <Grid xs={12} md={10.2}>
                <ImageDragDropField name="img" label="service img" />
              </Grid>
              <Grid xs={12} md={5}>
                {" "}
                <TextField
                  name="title"
                  fullWidth
                  label={"service title"}
                  value={values.title}
                  onChange={handleChange}
                  error={touched.title && !!errors.title}
                  helperText={touched.title && errors.title}
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

export default AddServicePage;
