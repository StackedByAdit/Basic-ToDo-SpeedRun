import InputBox from './components/InputBox'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'

const App = () => {
  return (
    <div className='bg-gray-900 h-screen py-10 flex flex-col gap-10 justify-center items-center'>
      <Signup />
      <Login />
      <InputBox/>
    </div>
  )
}

export default App