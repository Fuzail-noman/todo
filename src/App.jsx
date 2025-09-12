import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todo, setodo] = useState([])
  const [value, setvalue] = useState("")

  // Load from localStorage when app starts
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todo")) 
    setodo(savedTodos)
  }, [])

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo))
  }, [todo])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          📝 Todo App
        </h1>

       
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={value}
            onChange={(e) => setvalue(e.target.value)}
            placeholder="Enter a new task..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={() => {
              if (value.trim() !== "") {
                setodo([...todo, value])
                setvalue("")
              }
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>

       
        {todo.length === 0 ? (
          <p className="text-center text-gray-500">No tasks yet. Add one above 👆</p>
        ) : (
          <ul className="space-y-2">
            {todo.map((v, i) => (
              <li
                key={i}
                className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 shadow-sm"
              >
                <span className="text-gray-700">{v}</span>
                <button
                  onClick={() => {
                  
                    setodo(todo.filter((_, index) => index !== i))
                  }}
                  className="text-red-500 hover:text-red-700 text-sm font-semibold"
                >
                  ❌ Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
