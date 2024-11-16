import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import { getAllToDo, addToDo } from "./utils/HandleAPI";

function App() {
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1>PriorityPal</h1>

        <div className="top">
          <input
            type="text"
            placeholder="Add Tasks..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div
            className="add"
            onClick={() => addToDo(text, setText, setToDo)} // Fixed: Pass necessary arguments to addToDo
          >
            Add
          </div>

          <div className="list">
            {toDo.map((item) => (
              <ToDo key={item._id} text={item.text} /> // Fixed: Closing parentheses and component syntax
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
