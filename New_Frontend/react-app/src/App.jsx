import Welcome from "./Components/guestComp/Welcome";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import GuestLayout from "./Layouts/GuestLayout";
import UserLayout from "./Layouts/UserLayout";
import Login from "./Components/guestComp/Login";
import Register from "./Components/guestComp/Register";
import Home from "./Components/userComp/Home";
import NotFound from "./Components/guestComp/NotFound";

function App() {
  return (
        <Router>
            <Routes>
                {/* Welcome Page with Login and Register */}
                <Route element={<GuestLayout />}>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                {/* Logged-in Pages with MainHeader */}
                <Route element={<UserLayout />}>
                    <Route path="/home" element={<Home />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
  );
}

export default App;
