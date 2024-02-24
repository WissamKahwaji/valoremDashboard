import { Box, Hidden, ListItemIcon, Typography } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { NAV_LINKS } from "../../constants";

const SideBar = () => {
  const { pathname } = useLocation();
  const navLinks = NAV_LINKS;
  return (
    <Box
      sx={{
        backgroundColor: "#161d2f",
        padding: 2,
        borderRadius: 2,
        display: "flex",
        flexDirection: {
          xs: "row",
          lg: "column",
        },
        alignItems: "center",
        justifyContent: "space-between",
        width: {
          sm: "100%",
          lg: 200,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "row",
            lg: "column",
          },
          gap: 5,
          alignItems: {
            xs: "center",
            lg: "start",
          },
          width: "100%",
        }}
      >
        <Hidden smDown>
          {/* <Typography
            variant="h5"
            component="h1"
            my={2}
            fontWeight={4}
            fontSize={18}
          >
            Valorem
          </Typography> */}
          <img
            src={`https://i.imgur.com/RCTjuUc.png`}
            alt={"asda"}
            loading="lazy"
            style={{
              width: "160px",
              height: "50px",
            }}
          />
        </Hidden>
        <Box
          sx={{
            py: {
              xs: "0px",
              ls: "16px",
            },
            display: "flex",
            flexDirection: {
              xs: "row",
              lg: "column",
            },
            gap: 4,
          }}
        >
          {navLinks.map(item => (
            <Link
              key={item.name}
              to={item.link}
              style={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  color: "white",
                  textDecoration: "none",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 2,
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  <item.icon />
                </ListItemIcon>
                <Hidden mdDown>
                  <Typography
                    sx={{
                      "&:hover": {
                        color: "#C5A867",
                      },
                    }}
                  >
                    {item.name}
                  </Typography>
                </Hidden>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
