import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import Todos from './components/pages/Todos'
import { Navigate, Route, Routes } from "react-router-dom"
const App = () => {

  return (
    <div className='bg-gray-900 h-screen py-10 flex flex-col gap-10 justify-center items-center'>
      <Routes>
        <Route path='/' element={<Navigate to='/signup' replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </div>
  )
}

export default App