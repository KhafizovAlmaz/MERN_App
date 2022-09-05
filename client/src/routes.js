import React from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import { AuthPage } from './components/AuthPage/AuthPage'
import { CreatePage } from './components/CreatePage/CreatePage'
import { DetailPage } from './components/DetailPage/DetailPage'
import { Links } from './components/Links/Links'

export const useRoutes = isAuth => {
 if(isAuth) {
    return (
        <Routes>
            <Route path="/links" element={<Links/>}/>
            <Route path="/create" element={<CreatePage/>}/>
            <Route path="/detail/:id" element={<DetailPage/>}/>
            <Route path="/" element={<Navigate to="/create" replace={true} />}/>
        </Routes>
    )
 }
 return (
    <Routes>
        <Route path="/" element={<AuthPage/>}/>
        <Route path="/*" element={<AuthPage/>}/>
    </Routes>
 )
}