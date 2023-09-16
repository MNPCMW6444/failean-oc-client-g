import {BarChart} from '@mui/x-charts/BarChart';
import {useState, useEffect} from "react";
import axios from "axios"


const ABTEST = () => {

    const [a, sa] = useState(0);
    const [b, sb] = useState(0);
    const [c, sc] = useState(0);

    useEffect(() => {
        const fr = async () => {
            try {
                const res = await axios.get("https://mainserver.failean.com/abtestg");
                sa(res.data.a)
                sb(res.data.b)
                sc(res.data.c)
            } catch (e) {
                console.log(e)
            }
        }
        fr();
    }, []);


    return (
        <BarChart
            xAxis={[
                {
                    id: 'abtest',
                    data: ['failean.com', 'scailean.com', "other"],
                    scaleType: 'band',
                },
            ]}
            series={[
                {
                    data: [a, b, c],
                },
            ]}
            width={500}
            height={300}
        />
    );
};

export default ABTEST;
