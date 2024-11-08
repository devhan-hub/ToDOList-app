import { createSlice , PayloadAction ,nanoid } from "@reduxjs/toolkit";
import {toggelType} from './SidebarNavSlice'
import { UseSelector } from "react-redux";


interface Task {
    id:string,
    title:string,
    dueDate:string,
    completed:boolean,
    important:boolean, 
    catagory: string 
};

interface TaskState{
    tasks:Task[];
   
};

const initialState:TaskState ={
    tasks:[],
   
};

const taskSlice= createSlice({
    name:'task',
    initialState,
    reducers:{
        addTask:(state , action:PayloadAction<Omit<Task , 'id'>>)=>{
          const newtask:Task={id:nanoid(),...action.payload}
          state.tasks.push(newtask)
        },
        removeTask:(state , action:PayloadAction<string>)=>{
             state.tasks = state.tasks.filter(task=> task.id!= action.payload);
           
        },
        toggelCompleted:(state , action:PayloadAction<string>)=>{
          const  task = state.tasks.find(task=>task.id === action.payload)
          if(task){
            task.completed=!task.completed
          }
        },
        toggelImportant:(state , action:PayloadAction<string>)=>{
          const  task = state.tasks.find(task=>task.id === action.payload)
          if(task){
            task.important=!task.important
          }
        }
      
    }
});

export const {addTask , removeTask , toggelCompleted, toggelImportant} = taskSlice.actions;

export default taskSlice.reducer;