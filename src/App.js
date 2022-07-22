import React from 'react'
import Header from './component/header/Header'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./component/register/Register";
import Login from "./component/login/Login";
import Home from './component/home/Home';
import { createContext } from 'react';
import { useReducer } from 'react';
import { initialState, userReducer } from './reducers/userReducer';
import client from './component/service/SureBankClient';
import { toastError } from './util/Toast';
import { useEffect } from 'react';
import Logout from './component/logout/Logout';
import PrivateRoute from './privateroute/PrivateRoute';
import CustomerDashboard from './component/dashboard/CustomerDashboard';
import RecipientManagment from './component/recipient/RecipientManagment';
import Deposit from './component/deposit/Deposit';
import Withdraw from './component/withdraw/Withdraw';
import Transfer from './component/transfer/Transfer';
import TransactionQuery from './component/transaction/TransactionQuery';
import AdminDashboard from './component/dashboard/AdminDashboard';
import UsersManagement from './component/usermanagement/UsersManagement';
import UserEdit from './component/usermanagement/UserEdit';
import ContactMessageList from './component/contactmessage/ContactMessageList';

export const StateContext = createContext();
export const DispatchContext = createContext();


const App = () => {

  //this function contains the user information that will logged in 
  async function getUserInfo() {
    try {
      //getting the backend API 
      const userInfoResponse = await client.getUserInfo();
      //if the data in the backend API is working then return us success status
      if (userInfoResponse && userInfoResponse.status === 200) {
        //here, we are getting the data from API and saving it into userInfo variable
        const userInfo = userInfoResponse.data;
        //here we are calling our case of LOGIN from the userReducer file
        dispatch({
          type: "LOGIN",
          item: userInfo.user,
        })
      }
    } catch (error) {
      toastError(error);
    }
  }

  //using the useEffect hook to get the user information immediately
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    //if we got the token then only we can get the user info data from API
    if (token) {
      getUserInfo()
    }
  }, [])

  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <Router>
          <Header />
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path="/logout" element={<PrivateRoute><Logout /></PrivateRoute>} />
            <Route path="/*" element={<Home />} />
            <Route path="/dashboard" element={<PrivateRoute><CustomerDashboard /></PrivateRoute>} />
            <Route path="/recipient" element={<PrivateRoute><RecipientManagment /></PrivateRoute>} />
            <Route path="/deposit" element={<PrivateRoute><Deposit /></PrivateRoute>} />
            <Route path="/withdraw" element={<PrivateRoute><Withdraw /></PrivateRoute>} />
            <Route path="/transfer" element={<PrivateRoute><Transfer /></PrivateRoute>} />
            <Route path="/transactions" element={<PrivateRoute><TransactionQuery /></PrivateRoute>} />
            <Route path="/alltransactions" element={<PrivateRoute><TransactionQuery /></PrivateRoute>} />
            <Route path="/admin-dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
            <Route path="/users-management" element={<PrivateRoute><UsersManagement /></PrivateRoute>} />
            <Route path="/user-edit/:id" element={<PrivateRoute><UserEdit /></PrivateRoute>} />
            <Route path="/messages" element={<PrivateRoute><ContactMessageList /></PrivateRoute>} />
          </Routes>
        </Router>
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export default App