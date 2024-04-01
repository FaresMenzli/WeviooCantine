import { string, number } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
interface TopDishData {
    dishId: number;
    dishName: string;
    quantitySold: number;
}

const Dashboard: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [dataToShow , setDataToShow] = useState< (number | string)[][]>([])

  useEffect(() => {
    const keys = Object.keys(topDishes[0]) as (keyof TopDishData)[];

    // Mapping rawData to an array of arrays, including keys as the first row
    const transformedData: (number | string)[][] = [
        keys,
        ...topDishes.map(item => [item[keys[0]], item[keys[1]], item[keys[2]]])
    ];

    setDataToShow(transformedData)
    

    console.log(transformedData)
    console.log(dataToShow)
setDataToShow(
   [ ['dishName', 'quantitySold']
   , [ 'Fruit salad', 46]
    , [ 'Coffe', 3]
   , [ '22', 3]])



  }, [])
  

  const salesData = [
    ['Year', 'Sales', 'Expenses'],
    ['2014', 1000, 400],
    ['2015', 1170, 460],
    ['2016', 660, 1120],
    ['2017', 1030, 540],
  ];
 const topDishes:TopDishData[]= [
    {
    "dishId": 3,
    "dishName": "Fruit salad",
    "quantitySold": 46
    },
    {
    "dishId": 2,
    "dishName": "Coffe",
    "quantitySold": 3
    },
    {
    "dishId": 8,
    "dishName": "22",
    "quantitySold": 3
    }
    ]




  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div>
      <h2>Company Performance</h2>
      <div>
        <label htmlFor="yearSelect">Select Year: </label>
        <select id="yearSelect" value={selectedYear} onChange={handleYearChange}>
          <option value="">All Years</option>
          <option value="2014">2014</option>
          <option value="2015">2015</option>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
        </select>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Chart
          width={'50%'}
          height={'300px'}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={dataToShow}
          options={{
            chart: {
              title: 'Sales by Year',
            },
          }}
        />
        <Chart
          width={'50%'}
          height={'300px'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={dataToShow}
          options={{
            chart: {
              title: 'Sales Distribution',
            },
          }}
        />
        <Chart
          width={'50%'}
          height={'300px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={dataToShow}
          options={{
            chart: {
              title: 'Sales Trend',
            },
          }}
        />
        <Chart
          width={'50%'}
          height={'300px'}
          chartType="ScatterChart"
          loader={<div>Loading Chart</div>}
          data={dataToShow}
          options={{
            chart: {
              title: 'Sales Scatter',
            },
          }}
        />
        <Chart
          width={'50%'}
          height={'300px'}
          chartType="AreaChart"
          loader={<div>Loading Chart</div>}
          data={dataToShow}
          options={{
            chart: {
              title: 'Sales and Expenses Over Time',
            },
          }}
        />
        <Chart
          width={'50%'}
          height={'300px'}
          chartType="ComboChart"
          loader={<div>Loading Chart</div>}
          data={dataToShow}
          options={{
            chart: {
              title: 'Sales and Expenses Comparison',
            },
          }}
        />
        <Chart
          width={'50%'}
          height={'300px'}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={dataToShow}
          options={{
            chart: {
              title: 'Sales by Year',
            },
          }}
        />
        <Chart
          width={'50%'}
          height={'300px'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={dataToShow}
          options={{
            chart: {
              title: 'Sales Distribution',
            },
          }}
        />
        <Chart
          width={'50%'}
          height={'300px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={dataToShow}
          options={{
            chart: {
              title: 'Sales Trend',
            },
          }}
        />
        <Chart
          width={'50%'}
          height={'300px'}
          chartType="ScatterChart"
          loader={<div>Loading Chart</div>}
          data={dataToShow}
          options={{
            chart: {
              title: 'Sales Scatter',
            },
          }}
        />
             <Chart
             //order by BU
          width={'50%'}
          height={'300px'}
          chartType="Bar"
          loader={<div>Loading Chart</div>}
          data={dataToShow}
          options={{
            chart: {
              title: 'Sales Scatter',
            },
          }}
        />
            <Chart
            //most sold dish
          width={'50%'}
          height={'300px'}
          chartType="ColumnChart"
          loader={<div>Loading Chart</div>}
          data={dataToShow}
          options={{
            chart: {
              title: 'Sales Scatter',
            },
          }}
        />
           <Chart
            //top three dishes sold by day trough a week
          width={'50%'}
          height={'300px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={dataToShow}
          options={{
            chart: {
              title: 'Sales Scatter',
            },
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
