import React, { useState } from 'react';
import Chart from "react-apexcharts";
import Text from './Text';

const LineChart = ({xLable , yLable , yMin , yMax , xValues , yValues}) => {
    const [State , setState] = useState({
          
        series: [
          {
            name:`${yLable}`,
            data: yValues
          }
        ],
        options: {
          chart: {
            height: 350,
            type: 'line',
            dropShadow: {
              enabled: true,
              color: '#000',
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.2
            },
            toolbar: {
              show: true
            }
          },
          colors: ['#77B6EA', '#545454'],
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: 'smooth'
          },
          grid: {
            borderColor: '#87A922',
            row: {
              colors: ['#FCDC2A', 'transparent'],
              opacity: 0.5
            },
          },
          markers: {
            size: 1
          },
          xaxis: {
            categories: xValues,
            title: {
              text:`${xLable}`,
              style:{
                fontSize: '25px',
                fontWeight: 400
              }
            }
          },
          yaxis: {
            title: {
              text:`${yLable}`,
              style:{
                fontSize: '25px',
                fontWeight: 400
              }
            },
            min: yMin,
            max: yMax
          },
        }
    })
  return (
    <div className='flex flex-col items-center justify-center mt-20'>
        <div>
            <Text content="Appointments Chart" color="black" size="45px" />
        </div>
        <div className='mt-8'>
            <Chart
                options={State.options}
                series={State.series}
                type="line"
                width="750"
            />
        </div>
    </div>
  )
}

export default LineChart
