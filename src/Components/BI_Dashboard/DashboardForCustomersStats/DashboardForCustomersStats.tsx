import { FC, useEffect, useState } from "react";
import WeviooSpinner from "../../WeviooSpinner/WeviooSpinner";
import axios from "axios";
import ElementorCounter from "../ElementorCounter/ElmentorCounter";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { User } from "../../../Models/User";
import { MakeOptional } from "@mui/x-charts/models/helpers";
import { BarChart, PieValueType, axisClasses } from "@mui/x-charts";
import { Typography } from "@mui/material";
import Podium from "../Podium";

interface DashboardForCustomersStatsProps {}
const average = (a: number, b: number) => {
  return Number((a / b).toFixed(2));
};
const percentage = (a: number, b: number) => {
  return Number(((a / b) * 100).toFixed(2));
};

const DashboardForCustomersStats: FC<DashboardForCustomersStatsProps> = () => {

  const palette = ['#ef6694', '#fb8c00', '#9ccc65','#ff5722','#512da8','#558b2f'];
   
  const valueFormatter = (value: number | null) => `${value} order`;

  const chartSetting = {
    yAxis: [
      {
        label: "orders",
      },
    ],
    series: [{ dataKey: "value", label: "Order by user", valueFormatter }],
    height: 300,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: "translateX(-10px)",
      },
    },
  };
  const transformData = (Data: any) => {
    console.log("first");
    console.log(Data);
    const t = Data.userStatsList;
    const seriesData = t.map(
      (item: { user: User; ordersNB: any }, index: number) => ({
        id: item.user.userId,
        value: item.ordersNB,
        label: item.user.userFirstName,
      })
    );

    settransformedData(seriesData);

    settransformedDataForBarChart(
      seriesData.map((item: { id: any; label: any; value: any }) => ({
        id: item.id,
        name: item.label,
        value: item.value,
      }))
    );

    console.log(transformedData);
  };
  const [Data, setData] = useState<any>();
  const [transformedData, settransformedData] = useState<
    MakeOptional<PieValueType, "id">[]
  >([]);

  const [transformedDataForBarChart, settransformedDataForBarChart] =
    useState();
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/userForDashboard")
      .then((res) => {
        setData(res.data);
        console.log(res.data)
        transformData(res.data);
      })

      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="topDashboardStatitsticContainer">
        <div className=" topDashboardStatitstic">
          {Loading ? (
            <div className="dashboardLoader">
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            <div>
              Orders
              <ElementorCounter
                initialValue={0}
                stopAt={Data.nbTotalOrders}
                delay={10}
              ></ElementorCounter>
              Order
            </div>
          )}
        </div>
        <div className=" topDashboardStatitstic">
          {Loading ? (
            <div className="dashboardLoader">
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            <div>
              nbTotalUsers
              <ElementorCounter
                initialValue={0}
                stopAt={Data.nbTotalUsers}
                delay={10}
              ></ElementorCounter>
              dishs
            </div>
          )}
        </div>
        <div className="topDashboardStatitstic">
          {Loading ? (
            <div className="dashboardLoader">
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            <div className="d-flex flex-column w-100 h-100">
              UsersOrderedAtLeast1Time
              <ElementorCounter
              gauge={true}
                initialValue={0}
                stopAt={percentage(
                  Data.nbUsersOrderedAtLeast1Time,
                  Data.nbTotalUsers
                )}
                delay={50}
              ></ElementorCounter>
            </div>
          )}
        </div>
        <div className=" topDashboardStatitstic">
          {Loading  ? (
            <div className="dashboardLoader">
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            <div className="d-flex flex-column w-100 h-100">
            UsersOrderedMoreThanOneTime
            <ElementorCounter
            gauge={true}
              initialValue={0}
              stopAt={percentage(
                Data.nbUsersOrderedMoreThan1Time,
                Data.nbTotalUsers
              )}
              delay={50}
            ></ElementorCounter>
          </div>
          )}
        </div>
        <div className=" topDashboardStatitstic">
          {Loading == null ? (
            <div className="dashboardLoader">
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            <div>
              Average amount per order
              <ElementorCounter
                initialValue={0}
                stopAt={6}
                delay={100}
              ></ElementorCounter>
              DNT
            </div>
          )}
        </div>
      </div>

      <div
        className="mt-3"
        style={{
          display: "grid",
          gridTemplateColumns: "45% 45%",
          justifyItems: "center",
          gap: "20px",
        }}
      >
        {Loading ? (
          <WeviooSpinner chart={true}></WeviooSpinner>
        ) : (
          <div className=" bg-light rounded-3 d-flex flex-column justify-content-center align-items-center w-100 h-100">
            <Typography mt={2} variant="h5" gutterBottom>
              Orders
            </Typography>
            <PieChart
            colors={palette}
              series={[
                {
                  data: transformedData.filter((x) => x.value > 0),

                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                  innerRadius: 10,
                },
              ]}
              width={500}
              height={200}
            />
          </div>
        )}

        {Loading ? (
          <WeviooSpinner chart={true}></WeviooSpinner>
        ) : (
          <div className="bg-light rounded-3 w-100 h-100">
            <BarChart
              colors={['#512da8']}
              dataset={transformedDataForBarChart}
              xAxis={[{ scaleType: "band", dataKey: "name" }]}
              {...chartSetting}
            />
          </div>
        )}

        {Loading ? (
          <WeviooSpinner chart={true}></WeviooSpinner>
        ) : (
          <div className=" bg-light rounded-3 w-100 h-100">
            <PieChart
              colors={palette}
              series={[
                {
                  startAngle: -90,
                  endAngle: 90,
                  paddingAngle: 5,

                  data: transformedData.filter((x) => x.value > 0),
                  innerRadius: 60,
                },
              ]}
              height={300}
            />
          </div>
        )}

        {Loading ? (
          <WeviooSpinner chart={true}></WeviooSpinner>
        ) : (
          <div className="bg-light rounded-3 w-100 h-100">
            <PieChart
              colors={palette}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: 'white',
                 
                },
              }}
              series={[
                {
                  arcLabel: (item) => `${item.label} (${item.value})`,
      arcLabelMinAngle: 60,
                  data: transformedData,
                },
              ]}
              width={400}
              height={200}
              slotProps={{ legend: { hidden: true } }}

            />
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardForCustomersStats;
