import React, { useState,useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
const Table = ({rowData, columnDefs}) => {
    const [gridApi, setGridApi] = useState(null);
    const [searchText, setSearchText] = useState('');


  // Framework component for the Print button
  const PrintButton = (props) => (
    <button onClick={() => handlePrint(props.data)}>Print</button>
  );





  // Default column definitions
  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
  };



  // Function to handle printing
  const handlePrint = (rowData) => {
    // Implement your print logic here
    console.log('Printing data:', rowData);
  };

  return (
    <div className="ag-theme-alpine" style={{ width: '100%' }}>

      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        domLayout='autoHeight'

      />
    </div>
  );
};
export default Table