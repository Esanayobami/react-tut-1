import "./styles.css";
import Content from "./Content";
import Header from "./Header";
import AddItem from "./AddItem";
import Footer from "./Footer";
import { useState } from "react";
import SearchItems from "./SearchItems";

function App() {
        const [items , setItems] = useState(
        JSON.parse(localStorage.getItem("shoppinglist"))
          
      );
      const [newItem , setNewItem] = useState(" ");
      const [search , setSearch] = useState(" ");

      const setAndSaveItems = (newItems) => {
        setItems(newItems);
        localStorage.setItem("shoppinglist" , JSON.stringify(newItems));
      }
      
      const addItem = (item) => {
        const id = items.length ? items[items.length - 1].id + 1 : 1;
        const myNewItem = { id, checked: false, item };
        const listItems = [...items, myNewItem];
        setAndSaveItems(listItems);
      }
    
    

      const handleCheck = (id) => {
        const listItems = items.map((item) => item.id === id ? {...item ,checked : !item.checked} : item );
        setAndSaveItems(listItems);
      }

      const handleDelete = (id) =>{
        const listItems = items.filter((item) => item.id !== id);
        setAndSaveItems(listItems);
      }
      const handleSubmit = (e) =>{
        e.preventDefault();
        if(!newItem) return;
        addItem(newItem);
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
     
     <Content
        items={items.filter(item=>((item.item).toLowerCase()).includes(search.toLowerCase()) )}
        // please work
        setItems={setItems}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />

      <Footer length={items.length} />

    </div>
  );
}

export default App;
