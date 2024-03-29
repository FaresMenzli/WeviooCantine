import React, { useState } from 'react';
import { Chart } from 'react-google-charts';

const Dashboard: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>('');

  const salesData = [
    ['Year', 'Sales', 'Expenses'],
    ['2014', 1000, 400],
    ['2015', 1170, 460],
    ['2016', 660, 1120],
    ['2017', 1030, 540],
  ];

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
          data={salesData}
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
          data={[['Year', 'Sales'], ['2014', 1000], ['2015', 1170], ['2016', 660], ['2017', 1030]]}
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
          data={[['Year', 'Sales'], ['2014', 1000], ['2015', 1170], ['2016', 660], ['2017', 1030]]}
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
          data={[['Year', 'Sales'], ['2014', 1000], ['2015', 1170], ['2016', 660], ['2017', 1030]]}
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
          data={salesData}
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
          data={salesData}
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
          data={salesData}
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
          data={[['Year', 'Sales'], ['2014', 1000], ['2015', 1170], ['2016', 660], ['2017', 1030]]}
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
          data={[['Year', 'Sales'], ['2014', 1000], ['2015', 1170], ['2016', 660], ['2017', 1030]]}
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
          data={[['Year', 'Sales'], ['2014', 1000], ['2015', 1170], ['2016', 660], ['2017', 1030]]}
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
          data={[['Year', 'Sales'], ['2014', 1000], ['2015', 1170], ['2016', 660], ['2017', 1030]]}
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
          data={[['Year', 'Sales'], ['2014', 1000], ['2015', 1170], ['2016', 660], ['2017', 1030]]}
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
          data={[['Year', 'Sales'], ['2014', 1000], ['2015', 1170], ['2016', 660], ['2017', 1030]]}
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
