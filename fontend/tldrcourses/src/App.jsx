import { createContext, useState } from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './pages/login.jsx'
import Signup from './pages/signup.jsx'
import Dashboard from './pages/dashboard.jsx'
import NoPage from './pages/nopage.jsx'
import Layout from './pages/layout.jsx';
import Course from './pages/course.jsx';
import useLocalStorage from '@rehooks/local-storage';

export const UserContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useLocalStorage("user");
  const [course_data, setCourseData] = useState({})
  return (
    <>
      <UserContext.Provider value={{loggedInUser, course_data, setCourseData}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Login />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="course" element={<Course />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  )
}

export default App
