import React from "react";

const Searcher = ({ searcher }) => {

  return (
    <div className="searcher-container">
      <input
        onChange={searcher}
        type="text"
        placeholder="Buscar por Make"
        className="form-control"
      />
    </div>
  );
};

export default Searcher;
