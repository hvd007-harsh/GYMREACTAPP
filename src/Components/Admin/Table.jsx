import React from 'react'

const Table = (props) => {
  return (
    <table className="w-full  text-gray-dark border-2">
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

          </table>
  )
}

export default Table;