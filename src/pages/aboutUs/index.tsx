import React from "react";
import {
  useEditAboutUsInfoMutation,
  useGetAboutUsInfoQuery,
} from "../../apis/aboutUs/query";
import {
  Box,
  Grid,
  Stack,
  TextField,
  Typography,
  useTheme,
  Button,
} from "@mui/material";
import { Form, Formik, FieldArray, FormikHelpers } from "formik";
import {
  AboutUsInfo,
  AboutUsContent,
  OurValuesContent,
} from "../../apis/aboutUs/type";

const AboutUs = () => {
  const { data: aboutInfo, isLoading, isError } = useGetAboutUsInfoQuery();
  const { mutate: editAboutUsInfo } = useEditAboutUsInfoMutation();

  const theme = useTheme();

  if (isLoading || isError || !aboutInfo) return null;

  const { brief, content, ourValues } = aboutInfo;

  const initialValues: AboutUsInfo = {
    _id: aboutInfo._id ?? "",
    brief: brief ? { ...brief } : { title: "", description: "" },
    content: content ?? [],
    ourValues: ourValues ?? [],
  };
  const handleUpdateAboutUsInfo = (
    values: AboutUsInfo,
    { setSubmitting }: FormikHelpers<AboutUsInfo>
  ) => {
    editAboutUsInfo(values, {
      onSettled() {
        setSubmitting(false);
      },
    });
  };
  if (isLoading) return <></>;
  if (isError) return <></>;
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
        About Us
      </Typography>
      <Formik initialValues={initialValues} onSubmit={handleUpdateAboutUsInfo}>
        {({ values, setFieldValue }) => (
          <Form>
            <Grid container justifyContent="center" spacing={3}>
              <Grid item xs={12} md={8}>
                <Box
                  sx={{
                    border: "1px solid #C5A867",
                    padding: theme.spacing(2),
                    marginTop: theme.spacing(3),
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      marginBottom: theme.spacing(2),
                    }}
                  >
                    Who We Are
                  </Typography>
                  <TextField
                    fullWidth
                    name="brief.title"
                    label="Title"
                    value={values.brief.title}
                    onChange={e => setFieldValue("brief.title", e.target.value)}
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
                    name="brief.description"
                    label="Description"
                    value={values.brief.description}
                    onChange={e =>
                      setFieldValue("brief.description", e.target.value)
                    }
                    sx={{ marginTop: theme.spacing(2) }}
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
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <Box
                  sx={{
                    border: "1px solid #C5A867",
                    padding: theme.spacing(2),
                    marginTop: theme.spacing(3),
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      marginBottom: theme.spacing(2),
                    }}
                  >
                    Content
                  </Typography>
                  <FieldArray name="content">
                    {({ push, remove }) => (
                      <>
                        {values.content.map(
                          (contentItem: AboutUsContent, index: number) => (
                            <Box
                              key={index}
                              sx={{ marginBottom: theme.spacing(2) }}
                            >
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
                                sx={{ marginTop: theme.spacing(2) }}
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
                                        `content.${index}.img`,
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
                                    marginTop: theme.spacing(2),
                                    maxWidth: "100%",
                                  }}
                                />
                              )}
                              <Button
                                variant="contained"
                                onClick={() => remove(index)}
                                sx={{ marginTop: theme.spacing(2) }}
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
              <Grid item xs={12} md={8}>
                <Box
                  sx={{
                    border: "1px solid #C5A867",
                    padding: theme.spacing(2),
                    marginTop: theme.spacing(3),
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      marginBottom: theme.spacing(2),
                    }}
                  >
                    Our Values
                  </Typography>
                  <FieldArray name="ourValues">
                    {({ push, remove }) => (
                      <>
                        {values.ourValues.map(
                          (value: OurValuesContent, index: number) => (
                            <Box
                              key={index}
                              sx={{ marginBottom: theme.spacing(2) }}
                            >
                              <TextField
                                fullWidth
                                name={`ourValues.${index}.title`}
                                label="Title"
                                value={value.title}
                                onChange={e =>
                                  setFieldValue(
                                    `ourValues.${index}.title`,
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
                                name={`ourValues.${index}.description`}
                                label="Description"
                                value={value.description}
                                onChange={e =>
                                  setFieldValue(
                                    `ourValues.${index}.description`,
                                    e.target.value
                                  )
                                }
                                sx={{ marginTop: theme.spacing(2) }}
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
                                onClick={() => remove(index)}
                                sx={{ marginTop: theme.spacing(2) }}
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
                          Add Value
                        </Button>
                      </>
                    )}
                  </FieldArray>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ textAlign: "center", marginTop: theme.spacing(3) }}>
              <Button type="submit" variant="contained">
                Save Changes
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AboutUs;
