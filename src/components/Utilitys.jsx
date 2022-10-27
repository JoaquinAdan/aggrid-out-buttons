import React, { useCallback, useState } from "react";
import Searcher from "./Searcher";

const Utilitys = ({ searcher, sortByMakeDesc, sortByMakeAsc, ascendente }) => {
  const [modal, setModal] = useState(false);

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  const onBtPrint = useCallback(() => {
    setTimeout(function () {
      print();
      setNormal(api);
    }, 1000);
  }, []);
  return (
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
  );
};

export default Utilitys;
