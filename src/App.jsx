import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Navbar from './components/Navbar'
import Aside from './components/Aside'
import ContentWrapper from './components/ContentWrapper'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (<>

    <Navbar />

    <Aside />

    <ContentWrapper />

    <Footer />

  </>)
}

export default App
