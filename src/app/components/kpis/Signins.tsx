import { useState, useEffect } from "react";
import axios from "axios";

const Signins = () => {
  const [numberInLast24H, setNumberInLast24H] = useState(0);
  const [details, setDetails] = useState();

  useEffect(() => {
    const fetchSignins = async () => {
      const res = await axios(
        "http://localhost:6777/read/usersWhoLoggedInLastDay"
      );
      const { total, details } = res.data;
      debugger;
      setNumberInLast24H(total);
    };
    fetchSignins();
  }, []);

  return <div>{numberInLast24H}</div>;
};
export default Signins;
