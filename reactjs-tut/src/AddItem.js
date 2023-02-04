import { FaPlus } from "react-icons/fa";
import { useRef } from "react";

const Additem = ( {newItem , setNewItem , handleSubmit}) => {
    const inputRef = useRef();
    return (  
        <form className="addForm" onSubmit={(e) =>handleSubmit(e)}>
            <label htmlFor="addItem">Add item</label>
            <input 
            
            ref={inputRef}
            type="text"
            id="addItem"
            autoFocus
            required
            placeholder="add item" 
            value={newItem}
            onChange={(e) =>setNewItem(e.target.value)}
            />

            <button
            type="submit"
            aria-label="Add Item"
            onClick={()=> inputRef.current.focus()}
            >
            <FaPlus />
            </button>   
        </form>
       
    )
}
 
export default Additem;
