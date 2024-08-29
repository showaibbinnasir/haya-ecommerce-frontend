
import { RouterProvider } from 'react-router-dom';
import './App.css'
import { Button } from "keep-react";
import router from './router/router';
function App() {


  return (
    <>
      <RouterProvider router={router}>
        
      </RouterProvider>
    </>
  )
}

export default App
