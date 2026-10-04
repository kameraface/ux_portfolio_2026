import { BrowserRouter, Route, Routes } from 'react-router'
import { Home } from './pages/Home'
import { CaseStudyGate } from './pages/CaseStudyGate'
import { NotFound } from './pages/NotFound'

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<CaseStudyGate />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
