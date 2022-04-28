import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';
import React, { PureComponent } from 'react';


//Chart module, from Rechart.org
// passa in som props. Groups ska vara total av states..

const COLORS = ['#00c49f', '#ffbb00', '#39abde', '#fe7676'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.615; //ändra denna beroende hur långt ut du vill ha
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor= "middle" dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class Chartsummary extends PureComponent {

  static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';

  render() {
    return (

        <div className='container'>

          <div className='row'>
            <div className='col'>
                <h3 className='Chart-Header'> Daily Calorie Distribution</h3>
            </div>
          </div>

          <div className='row'> 
        
            <ResponsiveContainer width="100%" height={250}>
                <PieChart width={400} height={400}>
                <Pie
                    data={this.props.data} //data here, props
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {this.props.data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend />
                </PieChart>
            </ResponsiveContainer>
          
          </div>  

      </div>
    );
  }
}