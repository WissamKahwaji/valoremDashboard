import React, { useState } from "react";
import {
  useGetOurTeamInfoQuery,
  useReOrderTeamMutation,
} from "../../apis/ourTeam/queries";
import {
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Avatar,
  Divider,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { TeamsInfo } from "../../apis/ourTeam/type";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import DeleteTeamMemberDialog from "../../components/items/dialogs/deleteTeamMember";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const OurTeamsInfoPage = () => {
  const { data: teamsInfo } = useGetOurTeamInfoQuery();
  const { mutate: reOrderTeam } = useReOrderTeamMutation();

  const navigate = useNavigate();
  const [openDeleteTeamDialog, setOpenDeleteTeamDialog] = useState<{
    [key: string]: boolean;
  }>({});

  const [teamsState, setTeamsState] = useState<TeamsInfo[]>(teamsInfo ?? []);

  const handleDragDrop = (result: any) => {
    const { source, destination, type } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const team = [...teamsState];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;
      const [removedTeam] = team.splice(sourceIndex, 1);
      team.splice(destinationIndex, 0, removedTeam);
      reOrderTeam(team);
      return setTeamsState(team);
    }
  };

  const handleOpenDeleteTeamDialog = (teamId: string) => {
    setOpenDeleteTeamDialog(prevState => ({
      ...prevState,
      [teamId]: true,
    }));
  };

  const handleCloseDeleteTeamDialog = (teamId: string) => {
    setOpenDeleteTeamDialog(prevState => ({
      ...prevState,
      [teamId]: false,
    }));
  };

  return (
    <DragDropContext onDragEnd={handleDragDrop}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={6} sx={{ mb: 5 }}>
          <Typography
            component={"h1"}
            sx={{
              fontSize: "2rem",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            Our Team
          </Typography>
        </Grid>
        <Grid item xs={6} textAlign="end">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/add-team")}
          >
            <AddIcon /> Add
          </Button>
        </Grid>
      </Grid>
      <Typography
        component={"h1"}
        sx={{
          textAlign: "center",
          fontSize: "1rem",
          textTransform: "capitalize",
          mb: 3,
        }}
      >
        You can drag and drop to re-order the team
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <List>
            <Droppable droppableId="ROOT" type="group">
              {provider => (
                <div {...provider.droppableProps} ref={provider.innerRef}>
                  {teamsState?.map((team: TeamsInfo, index: number) => (
                    <Draggable
                      draggableId={team._id!}
                      key={team._id}
                      index={index}
                    >
                      {provided => (
                        <div
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                              <Avatar alt={team.name} src={team.img ?? ""} />
                            </ListItemAvatar>
                            <ListItemText
                              primary={team.name}
                              secondary={
                                <>
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    color="white"
                                  >
                                    {team.jobTitle}
                                  </Typography>
                                  {/* <br /> */}
                                </>
                              }
                            />{" "}
                            <Box>
                              <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<ModeEditOutlineRoundedIcon />}
                                onClick={() =>
                                  navigate(`/edit-team/${team._id}`, {
                                    state: {
                                      team: team,
                                    },
                                  })
                                }
                              >
                                Edit
                              </Button>
                              <Button
                                variant="contained"
                                color="secondary"
                                sx={{
                                  ml: 2,
                                }}
                                startIcon={<DeleteIcon />}
                                onClick={() =>
                                  handleOpenDeleteTeamDialog(team._id ?? "")
                                }
                              >
                                Delete
                              </Button>
                            </Box>
                          </ListItem>
                          <Divider variant="inset" component="li" />
                          <DeleteTeamMemberDialog
                            open={openDeleteTeamDialog[team._id ?? ""] || false}
                            onClose={() =>
                              handleCloseDeleteTeamDialog(team._id ?? "")
                            }
                            teamMember={{
                              name: team.name,
                              teamItemId: team._id ?? "",
                            }}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </List>
        </Grid>
      </Grid>
    </DragDropContext>
  );
};

export default OurTeamsInfoPage;
