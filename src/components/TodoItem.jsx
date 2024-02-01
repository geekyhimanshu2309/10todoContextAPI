import React, { useState } from 'react'
import { useTodo } from '../contexts';

function TodoItem({todo}) {
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.todo)
    const {updatedTodo, deleteTodo, toggleComplete} = useTodo

    const editTodo = () => {
        updatedTodo(todo.id, {...todo, todo: todoMsg})
        setIsTodoEditable(false)
    }
    const toggleCompleted = () => {
        toggleComplete(todo.id)
    }
  return (
    <div
        className={`flex border border-black/10 rounded-ls px-3
        py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black
        ${todo.completed ? "bg-[#c6e9a7]":"bg-[#ccbed7]"}`}
    >
        <input
            type='checkbox'
            className='cursor-pointer'
            checked={todo.completed}
            onChange={toggleCompleted}
        />
        <input
            type='text'
            className={`border outline-none w-fullbg-transparent rounded-lg
            ${ isTodoEditable ? "border-black/10 px-2":"border-transparent"}
            ${todo.completed? "line-through":""}`}
            value={todoMsg}
            onChange={(e) => setTodoMsg(e.target.value)}
            readOnly={!isTodoEditable}
        />
        {/* Edit todo button */}
        <button
            className='inline-flex w-8 h-8 rounded-lg text-sm border-black/10
            justify-center items-center bg-gray-50 hover:bg-gray-100
            shrink-0 disabled:opacity-50'
            onClick={() => {
                if(todo.completed) return;
                if(isTodoEditable){
                    editTodo();
                }else setIsTodoEditable((prev) => !prev);
            }}
            disabled={todo.completed}
        >
            {isTodoEditable? "e" : "n"}
        </button>
      {/* Delete todo button */}
      <button
        className='inbline-flex w-8 h-8 rounded-lg text-sm border
        border-black/10 justify-center items-center bg-gray-50
        hover:bg-gray-100 shrink-0'
        onClick={() => deleteTodo(todo.id)}
      >
        X  
      </button>
    </div>
  )
}

export default TodoItem
