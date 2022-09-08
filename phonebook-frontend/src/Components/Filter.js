
const Filter = ({value , onchange}) =>{

    return(
        <div>
          filter shown with
          <input  value={value} onChange={onchange} />
        </div>
    )
}
export default Filter