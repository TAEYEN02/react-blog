import logo from './logo.svg';
import './App.css';
import BoardProvider from './context/BoardContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BoardList } from './pages/BoardList';
import WritePost from './pages/WritePost';
import PostDetail from './pages/postDetail';
import EditPost from './pages/EditPost';

function App() {
  return (
    <BoardProvider>
      <BrowserRouter>
        <Routes>
          {/* 게시판 페이지 */}
          <Route path='/' element={<BoardList />} />
          <Route path='/post/:id' element={<PostDetail />} />
          <Route path='/write' element={<WritePost />} />
          <Route path='/edit/:id' element={<EditPost />} />
        </Routes>
      </BrowserRouter>
    </BoardProvider>
  );
}

export default App;
