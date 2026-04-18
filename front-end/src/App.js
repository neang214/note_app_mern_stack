import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";

import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage'

import { useAuthStore } from "./store/useAuthStore";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans p-4 sm:p-8">
      <NavBar/>
      <Router>
        <Routes>
          <Route path='/' element={authUser? <HomePage />: <Navigate to='/login'/>} />
          <Route path='/login' element={!authUser? <Login/>: <Navigate to='/'/>}/>
          <Route path='/sign-up' element={!authUser? <SignUp/>: <Navigate to='/'/>}/>
        </Routes>
      </Router>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
