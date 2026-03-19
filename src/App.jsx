import './App.css'
import { Routes, Route } from 'react-router'
import DeletePage from './component/DeletePage'
import HomeNav from './component/HomeNav'
import HomePage from './component/HomePage';
import CreatePage from './component/CreatePage'
import ReadPage from './component/ReadPage'
import UpdatePage from './component/UpdatePage'
import { Navigate } from "react-router-dom";
import Login from './component/userAuth/Login';
import Register from './component/userAuth/Register';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomeNav />}>

          {/* Default page */}
          <Route index element={<Register />} />

          {/* Auth */}
          <Route path='/login' element={<Login />} />

          {/* Protected pages */}
          <Route path='/home' element={<HomePage />} />
          <Route path='/create' element={<CreatePage />} />
          <Route path='/update/:id' element={<UpdatePage />} />
          <Route path='/read/:id' element={<ReadPage />} />
          <Route path='/delete/:id' element={<DeletePage />} />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" />} />

        </Route>
      </Routes>
    </>
  )
}

export default App;

