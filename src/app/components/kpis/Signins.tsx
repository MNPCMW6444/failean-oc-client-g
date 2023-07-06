import { useState, useEffect, useContext } from "react";
import { OcserverContext } from "../../context/OcserverContext";

const Signins = () => {
  const [numberInLast24H, setNumberInLast24H] = useState(0);
  //const [details, setDetails] = useState();

  const ocserverContext = useContext(OcserverContext);
  const axiosInstance = ocserverContext?.axiosInstance;
  debugger;

  useEffect(() => {
    const fetchSignins = async () => {
      try {
        if (axiosInstance) {
          const res = await axiosInstance("read/usersWhoLoggedInLastDay");
          const { total /*  details  */ } = res.data;
          setNumberInLast24H(total);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchSignins();
  }, [axiosInstance]);

  return <div>{numberInLast24H}</div>;
};
export default Signins;
