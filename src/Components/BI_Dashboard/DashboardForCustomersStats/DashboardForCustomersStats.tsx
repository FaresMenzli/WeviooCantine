import {
  FC,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import WeviooSpinner from "../../WeviooSpinner/WeviooSpinner";
import axios from "axios";
import ElementorCounter from "../ElementorCounter/ElmentorCounter";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { User } from "../../../Models/User";
import { MakeOptional } from "@mui/x-charts/models/helpers";
import { BarChart, DefaultizedPieValueType, PieValueType, axisClasses } from "@mui/x-charts";
import { Typography } from "@mui/material";
import Podium from "../Podium";
import dayjs, { Dayjs } from "dayjs";
import { useBackendUrl } from "../../../Contexts/BackendUrlContext";
import DataTable from "../DataTable/DataTable";
import { UserStats } from "../../../Models/UserStats";
import StarIcon from '@mui/icons-material/Star';
import { Height } from "@mui/icons-material";
import { TopCsrData } from "../../../Models/TopCsrData";
import { TopDishData } from "../../../Models/TopDishData";



interface DashboardForCustomersStatsProps {
  selectedCustomer?: string;
  
}

export interface ChildComponentHandles {
  handleClick: (arg1: any, arg2: any) => void;
}

const DashboardForCustomersStats = forwardRef<
  ChildComponentHandles,
  DashboardForCustomersStatsProps
>(({ selectedCustomer}, ref) => {
  const average = (a: number, b: number) => {
    return Number((a / b).toFixed(2));
  };
  const percentage = (a: number, b: number) => {
    return Number(((a / b) * 100).toFixed(2));
  };
const [totalDishSelectedUser, setTotalDishSelectedUser] = useState(0)

  const getArcLabel = (params: DefaultizedPieValueType ) => {
    const percent = params.value /  totalDishSelectedUser;
    return `${(percent * 100).toFixed(0)}%`;
  };
  const { backendUrl } = useBackendUrl();
const [podiumByNbOrdersCsr, setpodiumByNbOrdersCsr] = useState<TopCsrData[]>([])
const [podiumByOrdersCoast, setpodiumByOrdersCoast] = useState([])
const [dishByCSR, setdishByCSR] = useState<TopDishData[]>([])
  const fetchDataWithDateIntervalle = (url: string) => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setData(res.data);

        setpodiumByNbOrdersCsr(
          res.data.userStatsList
            .sort((a: TopCsrData, b: TopCsrData) => {
              return b.ordersNB - a.ordersNB;
            })
            .slice(0, 3)
        );
       
        transformData(res.data);
        setuserStatsList(res.data.userStatsList)
        const transformedMonthlyOrderCounts = Object.entries(
          res.data.monthlyOrderCounts
        ).map(([month, orders]) => ({
          month: monthNames[parseInt(month) - 1],
          orders: orders,
        }));
        setOrderByMonth(transformedMonthlyOrderCounts);

        const transformedMonthlyOrderAVG = Object.entries(
          res.data.monthlyOrderAverageByCustomer
        ).map(([month, orders]) => ({
          month: monthNames[parseInt(month) - 1],
          orders: orders,
        }));
        setOrderByMonthAVG(transformedMonthlyOrderAVG);

        if (selectedCustomer != 'All'){
          const transformedMonthlyOrderByCustomer = Object.entries(
            res.data.monthlyOrderCountsForCustomer
          ).map(([month, orders]) => ({
            month: monthNames[parseInt(month) - 1],
            orders: orders,
          }));
          setdishByCSR(res.data.dishSalesDetailsList)
          setTransformedDataforDishByCSR(
            res.data.dishSalesDetailsList.map((item: TopDishData) => ({
              id: item.dishId,
              label: item.dishName,
              value: item.totalQuantitySoldAllDays,
            }))
          );
          setTransformedDataForBarChartforDishByCSR(
            res.data.dishSalesDetailsList.map((item: TopDishData) => ({
              id: item.dishId,
              name: item.dishName,
              value: item.totalQuantitySoldAllDays,
            }))
          );
         setTotalDishSelectedUser(res.data.dishSalesDetailsList.map((item : TopDishData) => item.totalQuantitySoldAllDays).reduce((a: number, b: number) => a + b, 0))
          setMonthlyOrderCountsForCustomer(transformedMonthlyOrderByCustomer);
                 }
        
      })

      .finally(() => setLoading(false));
  };
const [CombinedData, setCombinedData] = useState<{ month: number; count: any; AVG: number; }[]>([])
const [filtredCSR, setFiltredCSR] = useState("")
  useEffect(() => { 
      const fetchData = async () => {
        setFiltredCSR("All")
        setLoading(true)
        try {
          let url = `${backendUrl}/api/user/userForDashboard`;
          
       
          if (selectedCustomer !="All") {
            url += `/${selectedCustomer}`;
        }
  
          if (filtredDate){
            console.log(beginIntervalle)
            console.log(endIntervalle)
           url += `?start=${beginIntervalle}&end=${endIntervalle}`
          }
  
       
          
        await axios.get(url)
          .then((res) => {
            setData(res.data);
            console.log(res.data);
            transformData(res.data);
            setuserStatsList(res.data.userStatsList)
            console.log("first")
            setpodiumByNbOrdersCsr(
              res.data.userStatsList
                .sort((a: TopCsrData, b: TopCsrData) => {
                  return b.ordersNB - a.ordersNB;
                })
                .slice(0, 3)
            );
            const transformedMonthlyOrderCounts = Object.entries(
              res.data.monthlyOrderCounts
            ).map(([month, orders]) => ({
              month: monthNames[parseInt(month) - 1],
              orders: orders,
            }));
            setOrderByMonth(transformedMonthlyOrderCounts);
    
            const transformedMonthlyOrderAVG = Object.entries(
              res.data.monthlyOrderAverageByCustomer
            ).map(([month, orders]) => ({
              month: monthNames[parseInt(month) - 1],
              orders: orders,
            }));
            setOrderByMonthAVG(transformedMonthlyOrderAVG);

            if (selectedCustomer != 'All'){
            
             
            
              setFiltredCSR(res.data.userStatsList.filter((userStats : UserStats)=> userStats.user.userId==Number (selectedCustomer))[0].user.userFirstName+" "+res.data.userStatsList?.filter((userStats : UserStats)=> userStats.user.userId==Number (selectedCustomer))[0].user.userLastName )

              const transformedMonthlyOrderByCustomer = Object.entries(
                res.data.monthlyOrderCountsForCustomer
              ).map(([month, orders]) => ({
                month: monthNames[parseInt(month) - 1],
                orders: orders,
              }));
              setdishByCSR(res.data.dishSalesDetailsList)
              setTransformedDataforDishByCSR(
                res.data.dishSalesDetailsList.map((item: TopDishData) => ({
                  id: item.dishId,
                  label: item.dishName,
                  value: item.totalQuantitySoldAllDays,
                }))
              );
              setTransformedDataForBarChartforDishByCSR(
                res.data.dishSalesDetailsList.map((item: TopDishData) => ({
                  id: item.dishId,
                  name: item.dishName,
                  value: item.totalQuantitySoldAllDays,
                }))
              );
             setTotalDishSelectedUser(res.data.dishSalesDetailsList.map((item : TopDishData) => item.totalQuantitySoldAllDays).reduce((a: number, b: number) => a + b, 0))
              setMonthlyOrderCountsForCustomer(transformedMonthlyOrderByCustomer);
              console.log(res.data.dishSalesDetailsList)
              setCombinedData(Object.keys(res.data.combinedMap).map((key) => ({
                month: parseInt(key),
                count: res.data.combinedMap[key].count,
                AVG: parseFloat(res.data.combinedMap[key].AVG.toFixed(2)), 
              })))
                     }
            
          })
    
          .finally(() => setLoading(false));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
  
  }, [selectedCustomer]);

const [filtredDate, setfiltredDate] = useState(false)
const [userStatsList, setuserStatsList] = useState<UserStats[]>([])
  const [beginIntervalle, setbeginIntervalle] = useState("");
  const [endIntervalle, setendIntervalle] = useState("");
  const handleClick = (arg1: string, arg2: string) => {
    setbeginIntervalle(arg1);
    setendIntervalle(arg2);
    setLoading(true);
    if (selectedCustomer == "All") {
      let url = `${backendUrl}/api/user/userForDashboard?start=${arg1}&end=${arg2}`;
          
      fetchDataWithDateIntervalle(url)
    
    } else {

     console.log("selected+date")
      fetchDataWithDateIntervalle(`${backendUrl}/api/user/userForDashboard/${selectedCustomer}?start=${arg1}&end=${arg2}`)
 
    }
    setfiltredDate(true)
  };

  useImperativeHandle(ref, () => ({
    handleClick,
  }));

  const palette = [
    "#ef6694",
    "#fb8c00",
    "#9ccc65",
    "#ff5722",
    "#512da8",
    "#558b2f",
  ];

  const valueFormatter = (value: number | null) => `${value} order`;

  const chartSetting = {
    yAxis: [
      {
        label: "orders Number",
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
    const seriesData = Data.userStatsList.map(
      (item: { user: User; ordersNB: any }, index: number) => ({
        id: item.user.userId,
        value: item.ordersNB,
        label: item.user.userFirstName,
      })
    );
    settransformedDataforCoastPie(Data.userStatsList.map(
      (item: { user: User; ordersCoast: any }, index: number) => ({
        id: item.user.userId,
        value: item.ordersCoast,
        label: item.user.userFirstName,
      })
    ))
    
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
  const [transformedDataforCoastPie, settransformedDataforCoastPie] = useState<
  MakeOptional<PieValueType, "id">[]
>([]);
const [transformedDataforDishByCSR, setTransformedDataforDishByCSR] = useState<
MakeOptional<PieValueType, "id">[]
>([]);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [transformedDataForBarChart, settransformedDataForBarChart] =
    useState();
    const [transformedDataForBarChartforDishByCSR, setTransformedDataForBarChartforDishByCSR] =
    useState();
  const [orderByMonth, setOrderByMonth] = useState<any[]>([]);
  const [orderByMonthAVG, setOrderByMonthAVG] = useState<any[]>([]);
  const [monthlyOrderCountsForCustomer, setMonthlyOrderCountsForCustomer] = useState<any[]>([]);


  const [Loading, setLoading] = useState(true);
 

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
          {Loading ? (
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
          {Loading  ? (
            <div className="dashboardLoader">
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            <div>
              <div>Best Customer</div>
              <StarIcon sx={{ color: "#ffea00"}}></StarIcon>
           <div><b>{userStatsList[0].user.userFirstName} {userStatsList[0].user.userLastName}</b></div>
           <div>({userStatsList[0].ordersNB})</div>
            </div>
          )}
        </div>
      </div>

      <div
        className="mt-3"
        style={{
          display: "grid",
          gridTemplateColumns: "45% 45%",
          gridAutoRows:" 300px",
          justifyItems: "center",
          gap: "20px",
        }}
      >
    {Loading ? (
          <WeviooSpinner chart={true}></WeviooSpinner>
        ) : (
          <div className=" bg-light rounded-3 d-flex flex-column justify-content-center align-items-center w-100  ">
            <div className=" p-2 w-100 h-100" style={{
               display: "grid",
               gridTemplateColumns: "48% 48%",
               gridTemplateRows:"48% 48%",
              
               gap: "4%",
            }}>
              <div className=" shadow  bg-info rounded-3 text-center">
                Applied Filter <br />
              <b> Customer :</b>
   {filtredCSR}
              </div>
              <div className="shadow  bg-info rounded-3 text-center">Applied Filter <br /> { filtredDate?(<> <b>Date Intervalle :</b> <br />
           
           <div> from :{beginIntervalle} <br />
            To : {endIntervalle} <br /></div></>):(
             <><b>Date Intervalle :</b> All</> 
            )
          }</div>
              <div className=" shadow bg-info rounded-3 text-center">
              
            {  selectedCustomer=="All"?(<>
              <div>Best Customer (order Number)</div>
              <StarIcon sx={{ color: "#ffea00"}}></StarIcon>
           <div><b>{userStatsList[0].user.userFirstName} {userStatsList[0].user.userLastName}</b></div>
           <div>({userStatsList[0].ordersNB} orders)</div></>):
           (<>
           <div>Most ordered Dish By {userStatsList[0].user.userFirstName}</div>
           <StarIcon sx={{ color: "#ffea00"}}></StarIcon>
           <div><b>{dishByCSR[0]?.dishName}</b></div>
           <div>({dishByCSR[0]?.totalQuantitySoldAllDays} dishs)</div>
           </>)}
            </div>
              
              <div className="bg-info rounded-3 text-center">
              <div>Best Customer (order Coast)</div>
              <StarIcon sx={{ color: "#ffea00"}}></StarIcon>
           <div><b>{userStatsList[0].user.userFirstName} {userStatsList[0].user.userLastName}</b></div>
           <div>({userStatsList[0].ordersCoast} DNT)</div>
            </div>
            </div>  
          </div>
        )}


        {Loading ? (
          <WeviooSpinner chart={true}></WeviooSpinner>
        ) : selectedCustomer=="All"?(
         <></>
    /* <Podium data={podiumByNbOrdersCsr}></Podium> */
   

        ):(null)}
   {Loading ? (
    
          <WeviooSpinner chart={true}></WeviooSpinner>
        ) : (
          <div style={{height:'300px'}}  className=" bg-light rounded-3 d-flex flex-column justify-content-center align-items-center w-100 py-2 px-3">
    <DataTable DataType="userStats" data={userStatsList}></DataTable>
          </div>
        )}

{Loading ? (
    
    <WeviooSpinner chart={true}></WeviooSpinner>
  ) : selectedCustomer!="All"? (
    <div style={{height:'300px'}}  className=" bg-light rounded-3 d-flex flex-column justify-content-center align-items-center w-100 py-2 px-3">
<DataTable DataType="dishStats" data={dishByCSR}></DataTable>
    </div>
  ):(null)}
{Loading ? (
          <WeviooSpinner chart={true}></WeviooSpinner>
        ) : selectedCustomer!="All"?(
          <div className=" bg-light rounded-3 d-flex flex-column justify-content-center align-items-center w-100 h-100">
          <Typography mt={2} variant="h5" gutterBottom>
            Dishs By {userStatsList[0].user.userFirstName}
          </Typography>
    
               <PieChart
              colors={palette}
              series={[
                {
                  arcLabelMinAngle: 45,
                  data: transformedDataforDishByCSR,
// @ts-ignore
arcLabel: getArcLabel,
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: {
                    innerRadius: 60,
                    additionalRadius: -30,
                    color: "gray",
                  },
                  innerRadius: 60,
                },
              ]}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: 'white',
                  fontSize: 14,
                },
              }}
              slotProps={{
                legend: { hidden: true },
              }}
            />
        </div>
   

        ):(null)}
{/* 
{Loading ? (
          <WeviooSpinner chart={true}></WeviooSpinner>
        ) : selectedCustomer!="All" ? (
          <div className="bg-light rounded-3 w-100 h-100">
            <BarChart
              colors={["#512da8"]}
              dataset={transformedDataForBarChartforDishByCSR}
              xAxis={[{ scaleType: "band", dataKey: "name" ,tickPlacement:'middle'}]}
              yAxis= {[
                {
                  label: "orders Number",
                }
              ]}
              series={ [{ dataKey: "value", label: "Order by user" }]}
              height= {300}
              sx= {{
                [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
                  transform: "translateX(-10px)",
                },
              }}
            
            />
          </div>
        ):(null)} */}

        {Loading ? (
          <WeviooSpinner chart={true}></WeviooSpinner>
        ) : selectedCustomer=="All"?(
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
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: 'white',
                  fontSize: 14,
                },
              }}
             
            />
          </div>
        ):(null)}

{Loading ? (
          <WeviooSpinner chart={true}></WeviooSpinner>
        ) : selectedCustomer=="All" ?(
          <div className=" bg-light rounded-3 d-flex flex-column justify-content-center align-items-center w-100 h-100">
            <Typography mt={2} variant="h5" gutterBottom>
            Customer spending (DNT)
            </Typography>
            <PieChart
             
              series={[
                {
                  data: transformedDataforCoastPie.filter((x) => x.value > 0),

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
              height={300}
            />
          </div>
        ):(null)}

{Loading ? (
          <WeviooSpinner chart={true}></WeviooSpinner>
        ) : selectedCustomer!="All" ?(
          <div hidden={selectedCustomer=="All"} className=" bg-light rounded-3 d-flex flex-column justify-content-center align-items-center w-100 h-100">
           <BarChart 
      dataset={CombinedData}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      yAxis={ [
        {
          label: 'orders AVG',
        },
      ]}
     
      height= {300}
      sx= {{
        [`.${axisClasses.left} .${axisClasses.label}`]: {
          transform: 'translate(-20px, 0)',
        },
      }}
      series={[
        { dataKey: 'AVG', label: 'AVG' },
        { dataKey: 'count', label: 'orders By Selected CSR' },
  
      ]}
    
    />
          </div>
        ):(null)}









        {Loading ? (
          <WeviooSpinner chart={true}></WeviooSpinner>
        ) : selectedCustomer=="All" ? (
          <div className="bg-light rounded-3 w-100 h-100">
            <BarChart
              colors={["#512da8"]}
              dataset={transformedDataForBarChart}
              xAxis={[{ scaleType: "band", dataKey: "name" }]}
              {...chartSetting}
            />
          </div>
        ):(null)}

        {Loading ? (
          <WeviooSpinner chart={true}></WeviooSpinner>
        ) : selectedCustomer=="All" ? (
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
        ):(null)}
{/* 
        {Loading ? (
          <WeviooSpinner chart={true}></WeviooSpinner>
        ) : (
          <div className="bg-light rounded-3 w-100 h-100">
            <PieChart
              colors={palette}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: "white",
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
        )} */}
        {Loading ? (
          <WeviooSpinner chart={true}></WeviooSpinner>
        ) : (
          <div className="bg-light rounded-3 w-100 h-100">
            <BarChart
              dataset={orderByMonth}
              xAxis={[{ scaleType: "band", dataKey: "month" }]}
              yAxis={ [
                {
                  label: "Order number",
                },
              ]}
              series= {[{ dataKey: "orders", label: "all orders by Month" }]}
              height= {300}
              sx= {{
                [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
                  transform: "translateX(-10px)",
                },
              }}
            />
          </div>
        )}

{Loading ? (
          <WeviooSpinner chart={true}></WeviooSpinner>
        ) : (
          <div className="bg-light rounded-3 w-100 h-100">
            <BarChart
            colors={["orange"]}
              dataset={orderByMonthAVG}
              xAxis={[{ scaleType: "band", dataKey: "month" }]}
              yAxis={ [
                {
                  label: "Order AVG by Customer",
                },
              ]}
              series= {[{ dataKey: "orders", label: "AVG orders by Customer by Month" }]}
              height= {300}
              sx= {{
                [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
                  transform: "translateX(-10px)",
                },
              }}
            />
          </div>
        )}

{Loading ? (
          <WeviooSpinner chart={true}></WeviooSpinner>
        ) : (
        <div hidden={selectedCustomer=="All"} className="bg-light rounded-3 w-100 h-100">
            <BarChart
            colors={["blue"]}
              dataset={monthlyOrderCountsForCustomer}
              xAxis={[{ scaleType: "band", dataKey: "month" }]}
              yAxis={ [
                {
                  label: "Monthly Order by Customer",
                },
              ]}
              series= {[{ dataKey: "orders", label: " orders by Selected Customer by Month" }]}
              height= {300}
              sx= {{
                [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
                  transform: "translateX(-10px)",
                },
              }}
            />
          </div>
        )}
      </div>
    </>
  );
});

export default DashboardForCustomersStats;
