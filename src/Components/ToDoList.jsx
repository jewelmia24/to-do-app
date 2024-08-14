import { useCallback } from "react";
import { useReducer } from "react";
import { useState } from "react";
import SingleToDo from "./SingleToDo";

const toDoReduser = (state, action) => {
  switch (action.type) {
    case "Add":
      return [...state, action.payload];
    case 'Update':
      return state.map(toDo=> toDo.id == action.payload.id? {...toDo, text:action.payload.text}:toDo );
    case "Delete" :
        return state.filter(toDo => toDo.id !== action.payload.id)
  }
};

const instantToDo = [{ id: 1, text: "Bangladesh 2.0" }];

const ToDoList = () => {
  const [toDos, dispatch] = useReducer(toDoReduser, instantToDo);
  const [tempState, setTempState] = useState("");
  const [editId,setEditId]=useState()
  

  console.log(tempState);
  const handleAddTodos = useCallback(() => {
    dispatch({ type: "Add", payload: { id: Date.now(), text: tempState } });
    setTempState('');
  }, [tempState]);

  const handleUpdate = useCallback((id)=>{
      dispatch({type:'Update',payload: {id, text:tempState}})
      setTempState('')
      setEditId(null)
  },[tempState])

  const handleDelete = useCallback((id) => {
    dispatch({ type: 'Delete', payload: { id } });
  }, []);

  return (
    <div className="max-w-md mx-auto border border-rose-400 rounded-md mt-3">
      <div className="max-w-sm mx-auto my-6 ">
        <h3 className="text-center text-3xl font-semibold text-rose-400 ">To Do List</h3>
        <div className="mt-6 flex">
          <input
            className="border py-3 pl-2 focus:outline-none focus:border-rose-400 flex-grow border-rose-400 text-rose-400 rounded-l-md"
            type="text"
            onChange={(e) => setTempState(e.target.value)}
          />
          <button
            onClick={handleAddTodos}
            className="bg-rose-400 text-white hover:bg-white hover:text-rose-400 border border-rose-400 px-5 rounded-r-md"
          >
            Add
          </button>
        </div>
        <div className="mt-10">
          {toDos.map((toDo) => (
            <SingleToDo key={toDo.id} handleUpdate={handleUpdate} toDo={toDo} handleDelete={handleDelete} setTempState={setTempState} editId={editId} setEditId={setEditId} tempState={tempState}></SingleToDo>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
