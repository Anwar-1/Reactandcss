import { useEffect } from "react"
import { useState } from "react"
import './App.css'
import '@fortawesome/fontawesome-free/css/all.css';


function App() {
  const [Item, setitam] = useState('')
  //const [todolist, setlist] = useState([])
  const [todolist, setlist] = useState(() => {
    const localvalue = localStorage.getItem("iteam")
    if (localvalue == null) return []
    return JSON.parse(localvalue)
  })


  useEffect(() => {
    localStorage.setItem("iteam", JSON.stringify(todolist))
  }, [todolist])


  function toogeltodo(id, ispaked) {
    setlist(
      todolist.map(todo => {
        if (todo.id === id) {
          return { ...todo, ispaked }
        }
        return todo
      }

      )

    )
  }

  const AddItem = () => {
    setlist([...todolist, { id: crypto.randomUUID(), name: Item, ispaked: false }])
    setitam('')
  }

  const deleteiteam = (id) => {
    setlist(todolist.filter(todo => todo.id !== id))
  }


  return (
    <>
      <h1 style={{ "textAlign": "center", "marginTop": "0" }} >The list </h1>
      <div className="jj">
        <input className="input form__field" placeholder="Add Item" type="text" value={Item} onChange={e => setitam(e.target.value)} />

        <button className="custom-btn btn-14" onClick={AddItem}>Add Item</button>
      </div>

      {todolist.map((task) =>
        <div key={task.id}>
          <input type="checkbox" checked={task.ispaked}
            onChange={e => toogeltodo(task.id, e.target.checked)} />
          {
            
              task.ispaked ? <span style={{ "marginLeft": "10px" }} ><del>{task.name}<span id="yellow-checkmark">&#10003;</span></del></span> :
                <span  style={{ "marginLeft": "10px" }}>{task.name}</span>
  


            
          }


         
      <span className="button" onClick={() => deleteiteam(task.id)}><i  class="far fa-trash-alt delete"></i></span>
        </div>


      )}
    </>
  )
}

export default App


