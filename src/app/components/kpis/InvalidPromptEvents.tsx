import { useState, useEffect, useContext } from "react";
import { OcserverContext } from "../../context/OcserverContext";

const InvalidPromptEvents = () =>{
  const [invalidPromptEvents, setInvalidPromptEvents] = useState([]);
  
  const ocserverContext = useContext(OcserverContext);
  const axiosInstance = ocserverContext?.axiosInstance;

  useEffect(() => {
    const fetchInvalidPromptEvents = async () => {
      try {
      if (axiosInstance) {
        const res = await axiosInstance("read/invalidPromptEvents");
          setInvalidPromptEvents(res.data.events);
        } 
      } catch (err) {
        console.log(err);
      }
    };
    fetchInvalidPromptEvents();
  }, [axiosInstance]);

return(
  <div>
 {invalidPromptEvents}
</div>

);
};






export default InvalidPromptEvents;
