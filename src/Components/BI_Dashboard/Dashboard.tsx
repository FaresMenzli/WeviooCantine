import dayjs from "dayjs";
import { string, number } from "prop-types";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import interceptor from "../../Interceptor/Interceptor";
import { useBackendUrl } from "../../Contexts/BackendUrlContext";
import axios from "axios";
import Podium from "./Podium";
import WeviooSpinner from "../WeviooSpinner/WeviooSpinner";
import {
  AdminLeftBar,
  Form,
  Label,
} from "../AdminDashboard/AdminDashboard.styled";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./Dashboard.css";
import ElementorCounter from "./ElementorCounter/ElmentorCounter";

interface SalesInfoData {
  dishSalesDetailsList: TopDishData[];
  totalPeriodAmount: number;
  totalPeriodQuantitySold: number;
}
interface Sales {
  date: string;
  dayQuantitySold: number;
  dayTotalAmount: number;
}

interface TopDishData {
  dishId: number;
  dishName: string;
  sales: Sales[];
  totalAmountAllDays: number;
  totalQuantitySoldAllDays: number;
}

const Dashboard: React.FC = () => {
  const [selectedOptionDish, setSelectedOptionDish] = useState("");
  const [selectedDashboard, setSelectedDashboard] = useState(1);
  const [podiumDishData, setPodiumDishData] = useState([]);
  const [chartLoading, setChartLoading] = useState(false);
  const [totalPeriodAmount, setTotalPeriodAmount] = useState(0);
  const [totalPeriodQuantitySold, setTotalPeriodQuantitySold] = useState(0);
  const [nbOrders, setNbOrders] = useState(0);
  const handleDashboardChange = (dashboard: React.SetStateAction<number>) => {
    setSelectedDashboard(dashboard);
  };
  const { data, error } = useSelector((state: RootState) => state.dishes);
  useEffect(() => {}, []);

  useEffect(() => {
    if (selectedDashboard == 3) {
      interceptor.get(`${backendUrl}/api/user/User`).then((response) => {
        console.log(response.data);
      });
    }
  }, [selectedDashboard]);

  useEffect(() => {
    if (selectedOptionDish != "") {
      if (
        soldDishs?.dishSalesDetailsList.find(
          (dish) => dish.dishId === Number(selectedOptionDish)
        ) !== undefined
      ) {
        const d = [
          ["dishName", "totalQuantitySoldAllDays"],
          ...soldDishs.dishSalesDetailsList
            .filter((x) => x.dishId == Number(selectedOptionDish))[0]
            .sales.map((item) => [item.date, item.dayQuantitySold]),
        ];
        setTotalPeriodQuantitySold(
          Number(
            soldDishs?.dishSalesDetailsList.find(
              (dish) => dish.dishId === Number(selectedOptionDish)
            )?.totalQuantitySoldAllDays
          )
        );
        setTotalPeriodAmount(
          Number(
            soldDishs?.dishSalesDetailsList.find(
              (dish) => dish.dishId === Number(selectedOptionDish)
            )?.totalAmountAllDays
          )
        );
        setDataToShow(d);
      } else {
        alert("no sales for this dish");
        setSelectedOptionDish("");
      }
    } else {
      setIntervalle();
    }

    //

    //
  }, [selectedOptionDish]);

  const today = dayjs();
  const [soldDishs, setSoldDishs] = useState<SalesInfoData>();
  const [beginIntervalle, setBeginIntervalle] = useState("2024-03-01");
  const [endIntervalle, setEndIntervalle] = useState<string>(
    today.format("YYYY-MM-DD")
  );
  const { backendUrl } = useBackendUrl();
  const [dataToShow, setDataToShow] = useState<null | (number | string)[][]>(
    null
  );
  /* 
  useEffect(() => {
    setIntervalle();
  }, []); */
  const getOrdersNumber = () => {
    interceptor
      .get(
        `${backendUrl}/api/orders/nbOrder?start=${beginIntervalle}&end=${endIntervalle}`
      )
      .then((res) => setNbOrders(res.data));
  };
  const handleBeginDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBeginIntervalle(event.target.value);
  };
  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndIntervalle(event.target.value);
  };
  const transformData = (soldDishs: SalesInfoData) => {
    const t = soldDishs.dishSalesDetailsList;
    console.log(soldDishs);
    console.log(t);
    const transformedData = [
      ["dishName", "totalQuantitySoldAllDays"],
      ...t.map((item) => [item.dishName, item.totalQuantitySoldAllDays]),
    ];

    return transformedData;
  };
  const average = (a: number, b: number) => {
    return Number((a / b).toFixed(2));
  };
  const setIntervalle = () => {
    setDataToShow(null);
    setTotalPeriodQuantitySold(0);
    setTotalPeriodAmount(0);
    getOrdersNumber();
    axios
      .get(
        `${backendUrl}/api/CommandLine/getSalesDetailsByDate?start=${beginIntervalle}&end=${endIntervalle}`
      )
      .then((response) => {
        setSoldDishs(response.data);

        if (selectedOptionDish === "") {
          setDataToShow(transformData(response.data));
          setPodiumDishData(
            response.data.dishSalesDetailsList
              .sort((a: TopDishData, b: TopDishData) => {
                return b.totalQuantitySoldAllDays - a.totalQuantitySoldAllDays;
              })
              .slice(0, 3)
          );
          setTotalPeriodQuantitySold(response.data.totalPeriodQuantitySold);
          setTotalPeriodAmount(response.data.totalPeriodAmount);
        } else {
          if (
            soldDishs?.dishSalesDetailsList.find(
              (dish) => dish.dishId === Number(selectedOptionDish)
            ) !== undefined
          ) {
            const quantitySoldbyDays = [
              ["dishName", "totalQuantitySoldAllDays"],
              ...response.data.dishSalesDetailsList
                .filter(
                  (x: { dishId: number }) =>
                    x.dishId == Number(selectedOptionDish)
                )[0]
                .sales.map((item: { date: any; dayQuantitySold: any }) => [
                  item.date,
                  item.dayQuantitySold,
                ]),
            ];
            console.log(
              response.data.dishSalesDetailsList.find(
                (dish: TopDishData) =>
                  dish.dishId === Number(selectedOptionDish)
              )
            );
            setTotalPeriodQuantitySold(
              Number(
                response.data.dishSalesDetailsList.find(
                  (dish: TopDishData) =>
                    dish.dishId === Number(selectedOptionDish)
                )?.totalQuantitySoldAllDays
              )
            );
            setTotalPeriodAmount(
              Number(
                response.data.dishSalesDetailsList.find(
                  (dish: TopDishData) =>
                    dish.dishId === Number(selectedOptionDish)
                )?.totalAmountAllDays
              )
            );
            setDataToShow(quantitySoldbyDays);
          } else {
            alert("no data found for this dish");
          }
        }
      });
  };

  const pieOptions = {
    title: "my awesome chart",
    is3D: true,
    pieHole: 0.3,
    slices: [
      {
        color: "#00a3e0",
      },
      {
        color: "#f2a900",
      },
      {
        color: "F16A21",
      },
      {
        color: "#e9a227",
      },
    ],
    legend: {
      position: "right",
      alignment: "center",
      textStyle: {
        color: "233238",
        fontSize: 14,
      },
    },
    tooltip: {
      showColorCode: true,
    },
    // chartArea: {
    //     left: 0,
    //     top: 0,
    //     width: '100%',
    //     height: '70%',
    // },
    fontName: "Roboto",
    fontSize: 20,
  };

  function handleSelectDishChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ): void {
    setSelectedOptionDish(event.target.value);
  }

  return (
    <div className="mt-3">
      <AdminLeftBar>
        <div className="ps-2 pt-5">
          <Form>
            <div className="fw-bold pb-2"> Orders :</div>
            <Label>
              <input
                type="radio"
                name="radio"
                onChange={() => handleDashboardChange(1)}
                checked={selectedDashboard == 1}
              />
              <span>Orders</span>
            </Label>
            <div hidden={selectedDashboard != 1} className="text-center ">
              <tr>
                <td>begin :</td>
                <td>
                  <input
                    type="date"
                    name=""
                    id=""
                    defaultValue={beginIntervalle}
                    onChange={handleBeginDateChange}
                  />
                </td>
              </tr>
              <tr>
                <td>end :</td>
                <td>
                  <input
                    type="date"
                    name=""
                    id=""
                    defaultValue={endIntervalle}
                    onChange={handleEndDateChange}
                  />
                </td>
              </tr>

              <input
                type="button"
                name=""
                id=""
                value="update time intervalle"
                onClick={() => setIntervalle()}
              />
            </div>
            <Label>
              <input
                type="radio"
                name="radio"
                onChange={() => handleDashboardChange(2)}
              />
            </Label>
            <div hidden={selectedDashboard != 1}>
              select a Dish
              <select
                value={selectedOptionDish}
                onChange={handleSelectDishChange}
              >
                <option value="">All</option>
                {data.map((dish) => (
                  <option value={dish.dishId}>{dish.dishName}</option>
                ))}
              </select>
            </div>
            <div className="fw-bold pb-2"> Customer :</div>
            <Label>
              <input
                type="radio"
                name="radio"
                onChange={() => handleDashboardChange(3)}
              />
              <span>Customers</span>
            </Label>
            <div hidden={selectedDashboard != 3}>
              from
              <input type="date" value="" />
              to
              <input type="date" name="" id="" />
            </div>
            <div hidden={selectedDashboard != 3}>
              select a customer
              <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </Form>
        </div>
      </AdminLeftBar>
      {/* {chartLoading ? <WeviooSpinner></WeviooSpinner> :  */}
      {/* ( */}
      <div className="pb-5 pt-5 mt-4" style={{ paddingLeft: "250px" }}>
        {selectedDashboard == 1 ? (
          <div>
            <div className="topDashboardStatitsticContainer">
              <div className=" topDashboardStatitstic">
                {dataToShow == null ? (
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
                      stopAt={nbOrders}
                      delay={10}
                    ></ElementorCounter>
                    Order
                  </div>
                )}
              </div>
              <div className=" topDashboardStatitstic">
                {dataToShow == null ? (
                  <div className="dashboardLoader">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  <div>
                    quantity sold
                    <ElementorCounter
                      initialValue={0}
                      stopAt={totalPeriodQuantitySold}
                      delay={10}
                    ></ElementorCounter>
                    dishs
                  </div>
                )}
              </div>
              <div className="topDashboardStatitstic">
                {dataToShow == null ? (
                  <div className="dashboardLoader">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  <div>
                    Amount realised
                    <ElementorCounter
                      initialValue={0}
                      stopAt={totalPeriodAmount}
                      delay={5}
                    ></ElementorCounter>
                    DNT
                  </div>
                )}
              </div>
              <div className=" topDashboardStatitstic">
                {dataToShow == null ? (
                  <div className="dashboardLoader">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  <div>
                    Average dish per order
                    <ElementorCounter
                      initialValue={0}
                      stopAt={average(totalPeriodQuantitySold, nbOrders)}
                      delay={100}
                      maxIncrement={1}
                    ></ElementorCounter>
                  </div>
                )}
              </div>
              <div className=" topDashboardStatitstic">
                {dataToShow == null ? (
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
                      stopAt={average(totalPeriodAmount, nbOrders)}
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
              {/*   add pourcentage of sold dish from all sold 
             unsold dishs  */}
              <div className="dashboaradItems">
                {dataToShow == null ? (
                  <WeviooSpinner chart={true}></WeviooSpinner>
                ) : (
                  <Chart
                    width={"100%"}
                    height={"300px"}
                    chartType="BarChart"
                    loader={<WeviooSpinner></WeviooSpinner>}
                    data={dataToShow || []}
                    options={{
                      title: `${
                        selectedOptionDish == ""
                          ? "dish order by quantity"
                          : `${
                              data.filter(
                                (x) => x.dishId == Number(selectedOptionDish)
                              )[0].dishName
                            } by time`
                      }`,
                    }}
                  />
                )}
              </div>

              {dataToShow == null ? (
                <WeviooSpinner chart={true}></WeviooSpinner>
              ) : (
                <Podium data={podiumDishData}></Podium>
              )}

              <div className="dashboaradItems">
                {dataToShow == null ? (
                  <WeviooSpinner chart={true}></WeviooSpinner>
                ) : (
                  <Chart
                    //most sold dish
                    width={"100%"}
                    height={"300px"}
                    chartType="ColumnChart"
                    loader={<WeviooSpinner></WeviooSpinner>}
                    data={dataToShow || []}
                    options={{
                      title: `${
                        selectedOptionDish == ""
                          ? "dish order by quantity"
                          : `${
                              data.filter(
                                (x) => x.dishId == Number(selectedOptionDish)
                              )[0].dishName
                            } by time`
                      }`,
                    }}
                  />
                )}
              </div>
              <div className="dashboaradItems">
                {dataToShow == null ? (
                  <WeviooSpinner chart={true}></WeviooSpinner>
                ) : (
                  <Chart
                    width={"100%"}
                    height={"300px"}
                    chartType="PieChart"
                    loader={<WeviooSpinner></WeviooSpinner>}
                    data={dataToShow || []}
                    options={pieOptions}
                  />
                )}
              </div>
              <div className="dashboaradItems">
                {dataToShow == null ? (
                  <WeviooSpinner chart={true}></WeviooSpinner>
                ) : (
                  <Chart
                    width={"100%"}
                    height={"300px"}
                    chartType="ScatterChart"
                    loader={<WeviooSpinner></WeviooSpinner>}
                    data={dataToShow || []}
                    options={{
                      chart: {
                        title: "Sales Scatter",
                      },
                    }}
                  />
                )}
              </div>
              {dataToShow == null ? (
                <WeviooSpinner chart={true}></WeviooSpinner>
              ) : (
                <Chart
                  width={"100%"}
                  height={"300px"}
                  chartType="PieChart"
                  loader={<WeviooSpinner></WeviooSpinner>}
                  data={dataToShow || []}
                  options={{
                    chart: {
                      title: "Sales Distribution",
                    },
                  }}
                />
              )}
              {/* {dataToShow == null ? (
              <WeviooSpinner chart={true}></WeviooSpinner>
            ) : (
              <Chart
                width={"100%"}
                height={"300px"}
                chartType="LineChart"
                loader={<WeviooSpinner></WeviooSpinner>}
                data={dataToShow || []}
                options={pieOptions}
              />
            )} */}
              {dataToShow == null ? (
                <WeviooSpinner chart={true}></WeviooSpinner>
              ) : (
                <Chart
                  width={"100%"}
                  height={"300px"}
                  chartType="AreaChart"
                  loader={<WeviooSpinner></WeviooSpinner>}
                  data={dataToShow || []}
                  options={{
                    chart: {
                      title: "Sales and Expenses Over Time",
                    },
                  }}
                />
              )}

              {dataToShow == null ? (
                <WeviooSpinner chart={true}></WeviooSpinner>
              ) : (
                <Chart
                  width={"100%"}
                  height={"300px"}
                  chartType="ComboChart"
                  loader={<WeviooSpinner></WeviooSpinner>}
                  data={dataToShow || []}
                  options={{
                    chart: {
                      title: "Sales and Expenses Comparison",
                    },
                  }}
                />
              )}
              {dataToShow == null ? (
                <WeviooSpinner chart={true}></WeviooSpinner>
              ) : (
                <Chart
                  width={"100%"}
                  height={"300px"}
                  chartType="AreaChart"
                  loader={<WeviooSpinner></WeviooSpinner>}
                  data={dataToShow || []}
                  options={{
                    chart: {
                      title: "Sales and Expenses Over Time",
                    },
                  }}
                />
              )}

              {dataToShow == null ? (
                <WeviooSpinner chart={true}></WeviooSpinner>
              ) : (
                <Chart
                  width={"100%"}
                  height={"300px"}
                  chartType="ComboChart"
                  loader={<WeviooSpinner></WeviooSpinner>}
                  data={dataToShow || []}
                  options={{
                    chart: {
                      title: "Sales and Expenses Comparison",
                    },
                  }}
                />
              )}

              {/* <Chart
              width={"100%"}
              height={"300px"}
              chartType="LineChart"
              loader={<WeviooSpinner></WeviooSpinner>}
              data={dataToShow || []}
              options={pieOptions}
            /> */}
              <Chart
                width={"100%"}
                height={"300px"}
                chartType="ScatterChart"
                loader={<WeviooSpinner></WeviooSpinner>}
                data={dataToShow || []}
                options={{
                  chart: {
                    title: "Sales Scatter",
                  },
                }}
              />
              <Chart
                width={"100%"}
                height={"300px"}
                chartType="AreaChart"
                loader={<WeviooSpinner></WeviooSpinner>}
                data={dataToShow || []}
                options={{
                  chart: {
                    title: "Sales and Expenses Over Time",
                  },
                }}
              />
              <Chart
                width={"100%"}
                height={"300px"}
                chartType="ComboChart"
                loader={<WeviooSpinner></WeviooSpinner>}
                data={dataToShow || []}
                options={{
                  chart: {
                    title: "Sales and Expenses Comparison",
                  },
                }}
              />
              <Chart
                width={"100%"}
                height={"300px"}
                chartType="BarChart"
                loader={<WeviooSpinner></WeviooSpinner>}
                data={dataToShow || []}
                options={{
                  chart: {
                    title: "Sales by Year",
                  },
                }}
              />

              <Chart
                width={"100%"}
                height={"300px"}
                chartType="LineChart"
                loader={<WeviooSpinner></WeviooSpinner>}
                data={dataToShow || []}
                options={{
                  chart: {
                    title: "Sales Trend",
                  },
                }}
              />
              <Chart
                width={"100%"}
                height={"300px"}
                chartType="ScatterChart"
                loader={<WeviooSpinner></WeviooSpinner>}
                data={dataToShow || []}
                options={{
                  chart: {
                    title: "Sales Scatter",
                  },
                }}
              />
              <Chart
                //order by BU
                width={"100%"}
                height={"300px"}
                chartType="Bar"
                loader={<WeviooSpinner></WeviooSpinner>}
                data={dataToShow || []}
                options={{
                  chart: {
                    title: "Sales Scatter",
                  },
                }}
              />

              <Chart
                //top three dishes sold by day trough a week
                width={"100%"}
                height={"300px"}
                chartType="LineChart"
                loader={<WeviooSpinner></WeviooSpinner>}
                data={dataToShow || []}
                options={{
                  chart: {
                    title: "Sales Scatter",
                  },
                }}
              />

              {/*         <Chart
              width={"100%"}
              height={"300px"}
              chartType="LineChart"
              loader={<WeviooSpinner></WeviooSpinner>}
              data={dataToShow || []}
              options={pieOptions}
            />
            <Chart
              width={"100%"}
              height={"300px"}
              chartType="ScatterChart"
              loader={<WeviooSpinner></WeviooSpinner>}
                            data={dataToShow || []}

              options={{
                chart: {
                  title: "Sales Scatter",
                },
              }}
            />
            <Chart
              width={"100%"}
              height={"300px"}
              chartType="AreaChart"
              loader={<WeviooSpinner></WeviooSpinner>}
                            data={dataToShow || []}

              options={{
                chart: {
                  title: "Sales and Expenses Over Time",
                },
              }}
            />
            <Chart
              width={"100%"}
              height={"300px"}
              chartType="ComboChart"
              loader={<WeviooSpinner></WeviooSpinner>}
                            data={dataToShow || []}

              options={{
                chart: {
                  title: "Sales and Expenses Comparison",
                },
              }}
            />
            <Chart
              width={"100%"}
              height={"300px"}
              chartType="BarChart"
              loader={<WeviooSpinner></WeviooSpinner>}
                            data={dataToShow || []}

              options={{
                chart: {
                  title: "Sales by Year",
                },
              }}
            />
         
            <Chart
              width={"100%"}
              height={"300px"}
              chartType="LineChart"
              loader={<WeviooSpinner></WeviooSpinner>}
                            data={dataToShow || []}

              options={{
                chart: {
                  title: "Sales Trend",
                },
              }}
            />
            <Chart
              width={"100%"}
              height={"300px"}
              chartType="ScatterChart"
              loader={<WeviooSpinner></WeviooSpinner>}
                            data={dataToShow || []}

              options={{
                chart: {
                  title: "Sales Scatter",
                },
              }}
            />
            <Chart
              //order by BU
              width={"100%"}
              height={"300px"}
              chartType="Bar"
              loader={<WeviooSpinner></WeviooSpinner>}
                            data={dataToShow || []}

              options={{
                chart: {
                  title: "Sales Scatter",
                },
              }}
            />
            <Chart
              //most sold dish
              width={"100%"}
              height={"300px"}
              chartType="ColumnChart"
              loader={<WeviooSpinner></WeviooSpinner>}
                            data={dataToShow || []}

              options={{
                chart: {
                  title: "Sales Scatter",
                },
              }}
            />
            <Chart
              //top three dishes sold by day trough a week
              width={"100%"}
              height={"300px"}
              chartType="LineChart"
              loader={<WeviooSpinner></WeviooSpinner>}
                            data={dataToShow || []}

              options={{
                chart: {
                  title: "Sales Scatter",
                },
              }}
            /> */}
            </div>
          </div>
        ) : selectedDashboard == 2 ? (
          <div
            className="mt-3"
            style={{
              display: "grid",
              gridTemplateColumns: "45% 45%",
              justifyItems: "center",
              gap: "20px",
            }}
          >
            {dataToShow == null ? (
              <WeviooSpinner chart={true}></WeviooSpinner>
            ) : (
              <Chart
                width={"100%"}
                height={"300px"}
                chartType="LineChart"
                loader={<WeviooSpinner></WeviooSpinner>}
                data={dataToShow || []}
                options={pieOptions}
              />
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
      {/* )} */}
    </div>
  );
};

export default Dashboard;
