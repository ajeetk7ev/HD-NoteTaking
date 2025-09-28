import { Routes, Route} from "react-router-dom"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Signin from "./pages/Signin"
import NotFound from "./pages/NotFound"
import OpenRoute from "./components/auth/PublicRoute"
import ProtectedRoute from "./components/auth/ProtectedRoute"




function App() {
  

  return (
    <div>
      <Routes>
        <Route path="/signin" element={<OpenRoute><Signin /></OpenRoute>} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={ <ProtectedRoute><Dashboard/></ProtectedRoute> }
        />
         <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App