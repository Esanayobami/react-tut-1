import "./styles.css";
import Content from "./Content";
import Header from "./Header";
import AddItem from "./AddItem";
import Footer from "./Footer";
import { useState , useEffect } from "react";
import SearchItems from "./SearchItems";


const API_URL = "http://localhost:3500/items";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");

  const fetchItems = async () => {
    try {
      const response = await fetch(API_URL);
      const listItems = await response.json();
      setItems(listItems);
    } catch (err) {
      console.log(err.stack);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = item => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);
  }

  

  const handleCheck = id => {
    const listItems = items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
  };

  const handleDelete = id => {
    const listItems = items.filter(item => item.id !== id);
    setItems(listItems);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!newItem.trim()) return;
    addItem(newItem.trim());
    setNewItem("");
  };

  return (
    <div className="App">
      <Header title="Groceries" />

      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />

      <SearchItems search={search} setSearch={setSearch} />

      {items.length ? (
        <Content
          items={items.filter(item =>
            (item.item.toLowerCase()).includes(search.toLowerCase())
          )}
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


