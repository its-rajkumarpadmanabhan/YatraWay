import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SearchResults from './pages/SearchResults';
import DestinationDetails from './pages/DestinationDetails';
import BookingCheckout from './pages/BookingCheckout';

import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/explore" element={<SearchResults />} />
        <Route path="/destination/:id" element={<DestinationDetails />} />
        <Route path="/destinations" element={<DestinationDetails />} />
        <Route path="/checkout" element={<BookingCheckout />} />
        {/* We will add other routes here as we build them */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
