import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Homepage} from '@/pages/Homepage'
import {NotFound} from '@/pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
