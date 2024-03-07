import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';

const Router: FC = (props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;

export {}