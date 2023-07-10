import { useState, useEffect, useContext } from "react";
import { OcserverContext } from "../../context/OcserverContext";
import { Typography, Card, CardContent, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

const Signins = () => {
  const [numberInLast24H, setNumberInLast24H] = useState(0);
  const [details, setDetails] = useState([] as any);

  const ocserverContext = useContext(OcserverContext);
  const axiosInstance = ocserverContext?.axiosInstance;
  

  useEffect(() => {
    const fetchSignins = async () => {
      try {
        if (axiosInstance) {
          const res = await axiosInstance("read/usersWhoLoggedInLastDay");
          const { total, details } = res.data;
          setNumberInLast24H(total);
          setDetails(details);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchSignins();
  }, [axiosInstance]);
  return (
    <div>
      <Typography variant="h6">Number of Sign-ins in the Last 24 Hours: {numberInLast24H}</Typography>
      <Card>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {details.map((item: { id: String; user:string; date:string }) => (
                <TableRow key={item.id.toString()}>
                  <TableCell>{item.user?.toString()}</TableCell>
                  <TableCell>{item.date?.toString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
export default Signins;
