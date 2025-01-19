import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";

const AppRoutes=()=>(
    <BrowserRouter  >
        <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}/>
        </Routes>
    </BrowserRouter >
)
export default AppRoutes;