import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Params } from "./type";
import { TeamsInfo } from "../../apis/ourTeam/type";
import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import ImageDragDropField from "../../components/items/inputs/imageDragDropFeild";
import LoadingButton from "../../components/items/buttons/loadingButtons/LoadingButton";
import {
  useAddTeamMutation,
  useEditTeamMutation,
} from "../../apis/ourTeam/queries";

const AddEditTeamMember = () => {
  const { teamItemId } = useParams<Params>();
  const { state } = useLocation();
  const { team } = state ?? {};

  const { mutate: addTeamMember } = useAddTeamMutation();
  const { mutate: editTeamMember } = useEditTeamMutation();
  const initialValues: TeamsInfo = {
    ...(teamItemId && { _id: teamItemId }),
    name: team?.name ?? "",
    jobTitle: team?.jobTitle ?? "",
    brief: team?.brief ?? "",
    img: team?.img ?? "",
  };
  const handleSubmit = (
    values: TeamsInfo,
    { setSubmitting }: FormikHelpers<TeamsInfo>
  ) => {
    teamItemId
      ? editTeamMember(values, {
          onSettled() {
            setSubmitting(false);
          },
        })
      : addTeamMember(values, {
          onSettled() {
            setSubmitting(false);
          },
        });
  };
  return (
    <Box>
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
        Team member
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
                <ImageDragDropField
                  name="profile"
                  label="profile img"
                  oldImg={values.img ?? ""}
                />
              </Grid>
              <Grid xs={12} md={5}>
                <TextField
                  name="name"
                  fullWidth
                  label={"name"}
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
              <Grid xs={12} md={5}>
                <TextField
                  name="jobTitle"
                  fullWidth
                  label={"job Title"}
                  value={values.jobTitle}
                  onChange={handleChange}
                  error={touched.jobTitle && !!errors.jobTitle}
                  helperText={touched.jobTitle && errors.jobTitle}
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
              <Grid xs={12} md={5}>
                <TextField
                  name="brief"
                  fullWidth
                  label={"brief"}
                  multiline
                  value={values.brief}
                  onChange={handleChange}
                  error={touched.brief && !!errors.brief}
                  helperText={touched.brief && errors.brief}
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

export default AddEditTeamMember;
