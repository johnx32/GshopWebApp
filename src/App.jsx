import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import { UserContextProvider } from './contexts/UserContext'
import Usuarios from './pages/usuarios/Usuarios'
import Categoria from './pages/Categoria'
import Login from './pages/Login'
import Usuario from './pages/usuarios/Usuario'
import Productos from './pages/productos/Productos'
function App() {

  return (<BrowserRouter>
    <UserContextProvider>
      <Routes>
        <Route path='/login' element={<PublicRoute><Login/></PublicRoute>} />
        <Route path='/' element={<PrivateRoute ><div>home</div></PrivateRoute>} />
        <Route path='/about' navigate element={<PrivateRoute><div>Acerca de</div></PrivateRoute>} />
        <Route path='usuarios' element={<PrivateRoute><Usuarios/></PrivateRoute>} ></Route>
          <Route path='usuarios/:id' element={<PrivateRoute><Usuario/></PrivateRoute>} />
          <Route path='usuarios/crear' element={<PrivateRoute><Usuario/></PrivateRoute>} />
        <Route path='/categorias' element={<PrivateRoute><Categoria/></PrivateRoute>} />
        <Route path='/productos' element={<PrivateRoute><Productos/></PrivateRoute>} />
        <Route path='*' element={<PrivateRoute><p>Pagina no encontrada</p></PrivateRoute>} />
      </Routes>
    </UserContextProvider>
  </BrowserRouter>)
}

export default App
