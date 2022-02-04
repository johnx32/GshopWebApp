import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import { UserContextProvider } from './contexts/UserContext'
import { Usuarios } from './pages/Usuarios'
import Categoria from './pages/Categoria'
import Login from './pages/Login'

function App() {

  return (<BrowserRouter>
    <UserContextProvider>
      <Routes>
        <Route path='/login' element={<PublicRoute><Login/></PublicRoute>} />
        <Route path='/' element={<PrivateRoute />} />
        <Route path='/about' navigate element={<PrivateRoute><div>Acerca de</div></PrivateRoute>} />
        <Route path='/usuarios' element={<PrivateRoute><Usuarios/></PrivateRoute>} />
        <Route path='/categorias' element={<PrivateRoute><Categoria/></PrivateRoute>} />
        <Route path='/productos' element={<PrivateRoute>Producto</PrivateRoute>} />
        <Route path='*' element={<PrivateRoute><p>Pagina no encontrada</p></PrivateRoute>} />
      </Routes>
    </UserContextProvider>
  </BrowserRouter>)
}

export default App
