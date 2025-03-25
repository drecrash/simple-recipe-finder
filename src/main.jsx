import { StrictMode } from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'
import  { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import GetRecipe from './GetRecipe.jsx'
import AddRecipe from './AddRecipe.jsx'
Amplify.configure(awsExports);


const root = ReactDOM.createRoot(document.getElementById('root'))


export default function AppData(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="/" element={<GetRecipe/>}/>
          <Route path="/add" element={<AddRecipe/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
root.render(<AppData/>)