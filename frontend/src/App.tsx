import { Routes, Route} from "react-router-dom"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Signin from "./pages/Signin"


function App() {
  return (
    <div>
       <Routes>
         <Route path="/signin" element={<Signin/>}  />
         <Route path="/signup" element={<Signup/>} />
         <Route path="/dashboard" element={<Dashboard/>} />
       </Routes>
    </div>
  )
}

export default App