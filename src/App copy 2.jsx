import React, { useState, useCallback, useRef, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import Searcher from "./components/Searcher";
import "./App.css";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const App = () => {
  const gridRef = useRef();
  const [search, setSearch] = useState("");
  const [ascendente, setAscendente] = useState(false);
  const [modal, setModal] = useState(false);

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

  const results = !search
    ? rowData
    : rowData.filter((dato) =>
        dato.make.toLowerCase().includes(search.toLocaleLowerCase())
      );

  const sortByMakeAsc = useCallback(() => {
    gridRef.current.columnApi.applyColumnState({
      state: [{ colId: "model", sort: "asc" }],
      defaultState: { sort: null },
    });
    setAscendente(true);
  }, []);

  const sortByMakeDesc = useCallback(() => {
    gridRef.current.columnApi.applyColumnState({
      state: [{ colId: "model", sort: "desc" }],
      defaultState: { sort: null },
    });
    setAscendente(false);
  }, []);

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  const onBtPrint = useCallback(() => {
    setTimeout(function () {
      print();
      setNormal(api);
    }, 1000);
  }, []);

  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
      suppressMovable: true,
    };
  }, []);

  return (
    <div>
      <div className="external-container">
        <Searcher searcher={searcher} />
        {!ascendente ? (
          <button onClick={sortByMakeAsc} className="button-sort">
            sort Model ascendente
          </button>
        ) : (
          <button onClick={sortByMakeDesc} className="button-sort">
            sort Model descendente
          </button>
        )}
        <button onClick={() => setModal(!modal)}>
          <img src="download.svg" alt="download" />
        </button>
        {modal ? (
          <div className="download-container">
            <div className="download-buttons">
              <button onClick={onBtnExport} className="download-button">
                CSV
              </button>
              <button onClick={onBtPrint} className="download-button">
                Imprimir
              </button>
            </div>
          </div>
        ) : null}
      </div>
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

export default App;
