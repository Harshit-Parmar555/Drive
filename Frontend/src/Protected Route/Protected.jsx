import React from 'react'
import {Outlet} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import {Navigate} from "react-router-dom"
const Protected = () => {
    const islogin = useSelector(state => state.islogin);
  return islogin?<Outlet/>:<Navigate to="/login"/>
}

export default Protected