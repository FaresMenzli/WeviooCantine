import {
  ColDef,
  GridReadyEvent,
  IDetailCellRendererParams,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-enterprise";

import { AgGridReact } from "ag-grid-react";
import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Dish } from "../../../Models/Dish";
import styles from "./orderHistory.module.css";
import interceptor from "../../../Interceptor/Interceptor";
import { useAuth } from "../../../Contexts/AuthContext";

interface ICommandeLine {
  id: number;
  quantity: number;
  dish: Dish;
}
interface IOrderHistory {
  id: number;
  orderDate: Date;
  total: number;
  commandeLines: ICommandeLine[];
}
interface Props {}

// Create new GridExample component
const OrderHistory: FunctionComponent<Props> = () => {
  // Row Data: The data to be displayed.
  const containerStyle = useMemo(() => ({ width: "60%", height: "90%" }), []);
  const [style, setStyle] = useState({
    height: "100%",
    width: "100%",
  });
  const { user } = useAuth();
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState<IOrderHistory[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    // group cell renderer needed for expand / collapse icons
    { field: "id", cellRenderer: "agGroupCellRenderer", maxWidth: 200 },
    {
      field: "orderDate",
      cellRenderer: (data: any) => {
        return data.value ? new Date(data.value).toUTCString() : "";
      },
    },
    { field: "total", maxWidth: 200 },
    { field: "reorder" },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
    };
  }, []);
  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        columnDefs: [
          {
            field: "dish.dishPhoto",
            headerName: "dish Image",
            cellRenderer: (params: any) => (
              <img
                style={{ height: "100px", width: "100px" }}
                src={params.data.dish.dishPhoto}
                alt=""
              />
            ),
            cellRendererParams: { rendererImage: "dish.dishPhoto" },
          },
          { field: "dish.dishName", headerName: "dish Name" },
          { field: "quantity" },

          { field: "dish.dishPrice", headerName: "dish price" },
        ],
        defaultColDef: {
          flex: 1,
        },
        rowHeight: 100,
      },
      getDetailRowData: (params) => {
        params.successCallback(params.data.commandeLines);
        console.log(params);
      },
    } as IDetailCellRendererParams<IOrderHistory, ICommandeLine>;
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    interceptor
      .get(`http://localhost:5000/api/orders/user/${user?.userId}`)
      .then((res) => setRowData(res.data));
  }, []);

  // Container: Defines the grid's theme & dimensions.
  return (
    <div style={containerStyle} className="mt-5">
      <div style={gridStyle} className={`ag-theme-quartz ${styles.ag} `}>
        <AgGridReact<IOrderHistory>
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          masterDetail={true}
          detailCellRendererParams={detailCellRendererParams}
          onGridReady={onGridReady}
          paginationAutoPageSize={true}
          rowClass={`text-center `}
        />
      </div>
    </div>
  );
};
export default OrderHistory;
