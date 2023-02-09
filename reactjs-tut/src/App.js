import "./styles.css";
import Content from "./Content";
import Header from "./Header";
import AddItem from "./AddItem";
import Footer from "./Footer";
import { useState , useEffect } from "react";
import SearchItems from "./SearchItems";

function App() {

        // an empty array was created to prevent error
      const [items , setItems] = useState(JSON.parse(localStorage.getItem("shoppingList")) || [] );
      const [newItem , setNewItem] = useState("");
      const [search , setSearch] = useState("");

    useEffect(() =>{
      localStorage.setItem("shoppingList" , JSON.stringify(items));
    } ,[items])

  
      
      const addItem = (item) => {
        const id = items.length ? items[items.length - 1].id + 1 : 1;
        const myNewItem = { id, checked: false, item };
        const listItems = [...items, myNewItem];
        setItems(listItems);
      }
    
    

      const handleCheck = (id) => {
        const listItems = items.map((item) => item.id === id ? {...item ,checked : !item.checked} : item );
        setItems(listItems);
      }

      const handleDelete = (id) =>{
        const listItems = items.filter((item) => item.id !== id);
        setItems(listItems);
      }
      const handleSubmit = (e) =>{
        e.preventDefault();
        if(!newItem.trim()) return;
        addItem(newItem.trim());
        setNewItem("");
      }

  return (
    <div className="App">
      <Header title="Groceries" />

      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />

      <SearchItems
        search={search}
        setSearch={setSearch}
       />

{items.length ? (
  <Content
    items={items.filter((item) => (item.item.toLowerCase()).includes(search.toLowerCase()))}
    handleCheck={handleCheck}
    handleDelete={handleDelete}
  />
) : (
  <p>No items to display</p>
)}











      <Footer length={items.length} />

    </div>
  );
}

export default App;
