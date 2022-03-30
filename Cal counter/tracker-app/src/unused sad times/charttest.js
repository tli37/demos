import { Line, LineChart } from 'recharts';

const Charttest = (props) => {

    const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400},
    
    {name: 'Page B', uv: 360, pv: 2000, amt: 2400} ];

    return (
        <LineChart width={400} height={400} data={data}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        </LineChart>
    )
}

export {Charttest};