import React from 'react';
import './styles/App.css'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { MoviePage } from './components/MoviePage.tsx';
import { ShowtimePage } from './components/ShowtimePage.tsx';
import { Bookings } from './components/Bookings';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
    return (
        <div>
            <Router>
                <nav className="nav-style">
                    <Link to="/" className="mr-4">
                        Movies
                    </Link>
                    <Link to="/showtimes" className="mr-4">
                        Showtimes
                    </Link>
                    <Link to="/bookings">Bookings</Link>
                </nav>
                <div className={'page-bg'}>
                    <Routes>
                        <Route path="/" element={<MoviePage/>}/>
                        <Route path="/showtimes" element={<ShowtimePage/>}/>
                        <Route path="/bookings" element={<Bookings/>}/>
                    </Routes>
                </div>
            </Router>
            <ToastContainer
                className={'toast-container'}
                autoClose={2000}
                closeOnClick={true}
                transition={Flip}
                pauseOnFocusLoss={false}
                pauseOnHover={false}
                theme={'dark'}
            />
        </div>
    );
};

export default App;
