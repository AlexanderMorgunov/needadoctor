import {FC} from "react";
import { Suspense } from 'react';
import { Routes, Route, redirect} from 'react-router-dom';
import Spinner from "./Spinner/Spinner";
import Layout from './Layout/Layout'
import Login from "../pages/Login/Login";
import ChooseRole from "../pages/ChooseRole/ChooseRole";
import RequireAuth from "../hoc/RequireAuth";
import FormPatient from "../pages/FormPatient/FormPatient";
import AdminPanelPage from "../pages/AdminPanel/AdminPanelPage";

const AppRouter: FC = () => {
    return (
        <Suspense fallback={<Spinner/>}>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<ChooseRole/>}/>
                    <Route path='AdminPanelPage'element={
                        <RequireAuth>
                            <AdminPanelPage/>
                        </RequireAuth>}/>
                    <Route path="*" element={<Layout/>}></Route>
                    <Route path="login" element={<Login/>}/>
                    <Route path="FormPatient" element={<FormPatient/>}/>
                </Route>
            </Routes>
        </Suspense>
    )
}

export default AppRouter;