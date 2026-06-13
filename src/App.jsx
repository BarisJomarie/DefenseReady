import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Homepage} from '@/pages/homepage/Homepage'
import {NotFound} from '@/pages/NotFound'
import { EBookView } from '@/pages/e-book/EBookView'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path='/e-book' element={<EBookView/>}/>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
