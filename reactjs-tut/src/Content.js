
import ItemList from "./ItemList";

const Content = ({items ,handleCheck , handleDelete}) => {
    
    return(
        <main className="content">
                {items.length ? (
               <ItemList 
               items={items}
               handleCheck={handleCheck}
               handleDelete={handleDelete}
               />
                ) : (
                    <p className="emptymessage">your list is empty</p>
                )}
        </main>
    )
}
export default Content;