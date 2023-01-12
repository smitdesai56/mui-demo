import { useEffect, useState } from "react";
import {
  Table,
  Paper,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Avatar,
} from "@mui/material";
import { userFields } from "../Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import styles from "./styles.module.scss";

export const ShowUser = () => {
  const [userDetails, setUserDetails] = useState<userFields>();
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setUserDetails(JSON.parse(user));
  }, []);
  return (
    <div className={styles.showUserContainer}>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <VisibilityIcon />
        </Avatar>
        <h3>Display User Information</h3>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>{userDetails?.firstName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Last Name</TableCell>
                <TableCell>{userDetails?.lastName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Date Of Birth</TableCell>
                <TableCell>{userDetails?.dob}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Gender</TableCell>
                <TableCell>{userDetails?.gender}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Address</TableCell>
                {userDetails?.address ? (
                  <TableCell>
                    {userDetails?.address.street} {userDetails?.address?.city} -{" "}
                    {userDetails?.address?.zip}, {userDetails?.address?.state},{" "}
                    {userDetails?.address?.country}.
                  </TableCell>
                ) : (
                  <TableCell></TableCell>
                )}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/dashboard");
          }}
        >
          Back
        </Button>
      </Paper>
    </div>
  );
};
