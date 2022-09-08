import React from "react"
const List = ({ newName, handlename, number, handlenumber, onsubmit }) =>{

return ( 
       <form onSubmit={onsubmit}> 
          Name:
       <input type={'text'}  value={newName} onChange={handlename} /> <br />
       Number:
       <input  type={'number'} value={number} onChange={handlenumber} /> <br />
       <button type="submit">add</button>
     </form>
)
}
export default List