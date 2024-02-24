import React from "react";
import {
  useEditContactUsInfoMutation,
  useGetContactUsInfo,
} from "../../apis/contactUs/queries";
import { Form, Formik, FormikHelpers } from "formik";

import { ContactUsInfo } from "../../apis/contactUs/type";
import {
  Box,
  Grid,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import LoadingButton from "../../components/items/buttons/loadingButtons/LoadingButton";

const ContactUs = () => {
  const { data: contactInfo, isLoading, isError } = useGetContactUsInfo();
  const { mutate: editContactUsInfo } = useEditContactUsInfoMutation();
  const theme = useTheme();
  if (isLoading) return <></>;
  if (isError) return <></>;
  const handleUpdateContactInfo = (
    values: ContactUsInfo,
    { setSubmitting }: FormikHelpers<ContactUsInfo>
  ) => {
    editContactUsInfo(values, {
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
        contact us
      </Typography>
      <Formik
        initialValues={{
          _id: contactInfo?._id!,
          title: contactInfo?.title!,
          content: contactInfo?.content!,
        }}
        onSubmit={handleUpdateContactInfo}
      >
        {({ values, handleChange, touched, errors, isSubmitting }) => (
          <Form>
            <Grid container justifyContent={"center"} gap={6}>
              <Grid item xs={12} md={5}>
                <Stack gap={3}>
                  <TextField
                    name="title"
                    fullWidth
                    label={"title"}
                    value={values.title}
                    onChange={handleChange}
                    error={touched.title && !!errors.title}
                    helperText={touched.title && errors.title}
                    InputProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                  />
                  <TextField
                    name="content.email"
                    fullWidth
                    label={"email"}
                    value={values.content?.email}
                    onChange={handleChange}
                    error={touched.content?.email && !!errors.content?.email}
                    helperText={touched.content?.email && errors.content?.email}
                    InputProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                  />
                  <TextField
                    name="content.phoneNumber"
                    fullWidth
                    label={"phone number"}
                    value={values.content.phoneNumber}
                    onChange={handleChange}
                    error={
                      touched.content?.phoneNumber &&
                      !!errors.content?.phoneNumber
                    }
                    helperText={
                      touched.content?.phoneNumber &&
                      errors.content?.phoneNumber
                    }
                    InputProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                  />{" "}
                  <TextField
                    name="content.mobileOne"
                    fullWidth
                    label={"another phone number"}
                    value={values.content.mobileOne}
                    onChange={handleChange}
                    error={
                      touched.content?.mobileOne && !!errors.content?.mobileOne
                    }
                    helperText={
                      touched.content?.mobileOne && errors.content?.mobileOne
                    }
                    InputProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                  />{" "}
                  <TextField
                    name="content.location"
                    fullWidth
                    label={"location"}
                    value={values.content.location}
                    onChange={handleChange}
                    error={
                      touched.content?.location && !!errors.content?.location
                    }
                    helperText={
                      touched.content?.location && errors.content?.location
                    }
                    InputProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                  />{" "}
                  <TextField
                    name="content.whatsApp"
                    fullWidth
                    label={"whatsApp"}
                    value={values.content?.whatsApp}
                    onChange={handleChange}
                    error={
                      touched.content?.whatsApp && !!errors.content?.whatsApp
                    }
                    helperText={
                      touched.content?.whatsApp && errors.content?.whatsApp
                    }
                    InputProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={5}>
                <Stack gap={3}>
                  <TextField
                    name="content.faceBook"
                    fullWidth
                    label={"faceBook"}
                    value={values.content?.faceBook}
                    onChange={handleChange}
                    error={
                      touched.content?.faceBook && !!errors.content?.faceBook
                    }
                    helperText={
                      touched.content?.faceBook && errors.content?.faceBook
                    }
                    InputProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                  />{" "}
                  <TextField
                    name="content.instagram"
                    fullWidth
                    label={"instagram"}
                    value={values.content?.instagram}
                    onChange={handleChange}
                    error={
                      touched.content?.instagram && !!errors.content?.instagram
                    }
                    helperText={
                      touched.content?.instagram && errors.content?.instagram
                    }
                    InputProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                  />{" "}
                  <TextField
                    name="content.linkedIn"
                    fullWidth
                    label={"linkedIn"}
                    value={values.content?.linkedIn}
                    onChange={handleChange}
                    error={
                      touched.content?.linkedIn && !!errors.content?.linkedIn
                    }
                    helperText={
                      touched.content?.linkedIn && errors.content?.linkedIn
                    }
                    InputProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                  />{" "}
                  <TextField
                    name="content.youtube"
                    fullWidth
                    label={"youtube"}
                    value={values.content?.youtube}
                    onChange={handleChange}
                    error={
                      touched.content?.youtube && !!errors.content?.youtube
                    }
                    helperText={
                      touched.content?.youtube && errors.content?.youtube
                    }
                    InputProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                  />{" "}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack justifyContent={"center"}>
                  <LoadingButton
                    isSubmitting={isSubmitting}
                    buttonText={"submit"}
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.primary.main,
                    }}
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

export default ContactUs;
