import React from 'react';
import {DataGrid,GridRowProps } from '@mui/x-data-grid';
const Table = (props) => {
  console.log(props.product);
  const row = props.product;
 const column   = [
  { field: 'title', headerName: 'Title', width: 150 },
  { field: 'mrp', headerName: 'Mrp', width: 150 },
  { field: 'author', headerName: 'Author', width: 150 },
  { field: 'stock', headerName: 'Stock', width: 150 },
 ]

  return (
    <>
    <DataGrid rows={row} columns={column} getRowId={(row) => row._id}/>
    {/* <table className="w-full  text-gray-dark border-2">
            <tr>
              <th>S.no.</th>
              <th>Name</th>
              <th>Mrp</th>
              <th>Author</th>
              <th>Stock</th>
            </tr>
            {console.log(props)}
            {props.product.map((element,index) =>{
           return( <tr>
              <td>{index}</td>
              <td>{element.title}</td>
              <td>{element.mrp}</td>
              <td>{element.author}</td>
              <td>{element.stock}</td>
            </tr>
                 )
            })}

          </table> */}
          </>
  )
}

export default Table;