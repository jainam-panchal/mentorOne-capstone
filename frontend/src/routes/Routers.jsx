import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Services from '../pages/Services'
import Mentors from '../pages/Mentors/Mentors'
import MentorDetails from '../pages/Mentors/MentorDetails'
import Contact from '../pages/Contact'
import CheckoutSuccess from '../pages/CheckoutSuccess.jsx'
import Session from '../pages/Session.jsx'

import MyAccount from '../dashboard/user-account/MyAccount.jsx'
import Dashboard from '../dashboard/mentor-account/Dashboard.jsx'

import ProtectedRoute from './ProtectedRoute.jsx'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/mentors" element={<Mentors />} />
      <Route path="/mentors/:id" element={<MentorDetails />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/services" element={<Services />} />
      <Route path="/checkout-success" element={<CheckoutSuccess />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/session/:sessionId" element={<Session />} />

      <Route
        path="/users/profile/me"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <MyAccount />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mentors/profile/me"
        element={
          <ProtectedRoute allowedRoles={['mentor']}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default Router
