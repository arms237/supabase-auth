import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Signin from './components/SignIn'
import Signup from './components/Signup'
import Dashbaord from './components/Dashboard'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/dashboard' element={<PrivateRoute><Dashbaord/></PrivateRoute>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
