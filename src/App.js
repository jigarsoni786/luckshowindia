import './App.css';
import Nav from './component/Nav';
import Home from './component/Home';
import About from './component/About';
import Login from './component/Login';
import AddLottry from './component/AddLottry'
import PrivateVar from './component/PrivateVar'
import Update from './component/Update';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Result from './component/Result';
import Footer from './component/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateVar />}>
            <Route path='/update/:id' element={<Update />} />
            <Route path='/AddLottry' element={<AddLottry />} />
          </Route>
          <Route path='/' element={<Home />} />
          <Route path='/Result' element={<Result />} />
          <Route path='/About' element={<About />} />
          <Route path='/Login' element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
