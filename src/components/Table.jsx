import React, { useState, useCallback, useRef, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Utilitys from "./Utilitys";

const Table = () => {
  const gridRef = useRef();
  const [search, setSearch] = useState("");
  const [ascendente, setAscendente] = useState(false);
  const [rowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
  ]);
  const [columnDefs] = useState([
    { field: "make" },
    { field: "model", sortable: true },
    { field: "price" },
  ]);

  const searcher = (e) => {
    setSearch(e.target.value);
    // console.log(e.target.value)
  };

  //* Sort descendente a travez del header model
  const sortByMakeAsc = useCallback(() => {
    gridRef.current.columnApi.applyColumnState({
      state: [{ colId: "model", sort: "asc" }],
      defaultState: { sort: null },
    });
    setAscendente(true);
  }, []);

  //* Sort ascendente a travez del header model
  const sortByMakeDesc = useCallback(() => {
    gridRef.current.columnApi.applyColumnState({
      state: [{ colId: "model", sort: "desc" }],
      defaultState: { sort: null },
    });
    setAscendente(false);
  }, []);

  //* Barra de busqueda externa
  const results = !search
    ? rowData
    : rowData.filter((dato) =>
        dato.make.toLowerCase().includes(search.toLocaleLowerCase())
      );

  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
      suppressMovable: true,
    };
  }, []);

  return (
    <div>
      <Utilitys
        searcher={searcher}
        sortByMakeDesc={sortByMakeDesc}
        sortByMakeAsc={sortByMakeAsc}
        ascendente={ascendente}
      />
      <div className="ag-theme-alpine" style={{ height: 400, width: 620 }}>
        <AgGridReact
          ref={gridRef}
          rowData={results}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default Table;