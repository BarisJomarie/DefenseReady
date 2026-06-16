import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Homepage} from '@/pages/homepage/Homepage'
import {NotFound} from '@/pages/NotFound'
import { EBookView } from '@/pages/e-book/EBookView'
import { Forums } from '@/pages/forums/Forums'
import { ForumPostView } from './pages/forums/ForumPostView'
import { useState } from 'react'

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path='/e-book' element={<EBookView/>}/>
        <Route path='/forums' element={<Forums searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>} />
        <Route path='/forums/:id'element={<ForumPostView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
