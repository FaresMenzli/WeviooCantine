import {
  ColDef,
  FirstDataRenderedEvent,
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

import { Dish } from "../../Models/Dish";


// Row Data Interface

interface ICommandeLine {
  id: number;
  quantity: number;
  dish: Dish;
}
interface IAccount {
  name: string;
  account: number;
  calls: number;
  minutes: number;
  commandeLines: ICommandeLine[];
}
interface Props {}

// Create new GridExample component
const AgGrid: FunctionComponent<Props> = () => {
  // Row Data: The data to be displayed.
  const containerStyle = useMemo(
    () => ({ width: "80%", height: "100vh" }),
    []
  );
  const gridStyle = useMemo(() => ({ height: "80%", width: "80%" }), []);
  const [rowData, setRowData] = useState<IAccount[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    // group cell renderer needed for expand / collapse icons
    { field: "id", cellRenderer: "agGroupCellRenderer" },
    {
      field: "orderDate",
      cellRenderer: (data: any) => {
        return data.value ? new Date(data.value).toUTCString() : "";
      },
    },
    { field: "total" },
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
            cellRenderer: (params: any ) =>
            <img style={{height: '100px', width: '100px'}} src={params.data.dish.dishPhoto} alt="" />,
            cellRendererParams:{rendererImage:'dish.dishPhoto'},
            
          },
          { field: "dish.dishName", headerName: "dish Name" },
          { field: "quantity" },

          { field: "dish.dishPrice", headerName: "dish price" },
         
        ],
        defaultColDef: {
          flex: 1,
        },
        rowHeight:100
       
      },
      getDetailRowData: (params) => {
        params.successCallback(params.data.commandeLines);
        console.log(params);
      },
    } as IDetailCellRendererParams<IAccount, ICommandeLine>;
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch("http://localhost:5000/api/orders/user/1")
      .then((resp) => resp.json())
      .then((data: IAccount[]) => {
        setRowData(data);
      });
  }, []);

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
    // arbitrarily expand a row for presentational purposes
    setTimeout(() => {
      params.api.getDisplayedRowAtIndex(1)!.setExpanded(true);
    }, 0);
  }, []);

  // Container: Defines the grid's theme & dimensions.
  return (
    <div style={containerStyle}>
      <div style={gridStyle} className={"ag-theme-quartz"}>
        <AgGridReact<IAccount>
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          masterDetail={true}
          detailCellRendererParams={detailCellRendererParams}
          onGridReady={onGridReady}
          paginationAutoPageSize={true}
        />
      </div>
    </div>
  );
};
export default AgGrid;
