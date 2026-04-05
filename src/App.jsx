import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import SubmitResearch from './pages/SubmitResearch'
import './styles.css'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submit" element={<SubmitResearch />} />
      </Routes>
    </BrowserRouter>
  )
}
