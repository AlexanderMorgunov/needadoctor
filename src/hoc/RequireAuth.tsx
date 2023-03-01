import React, {FC} from "react";
import {Navigate, useLocation} from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState} from '../store';


export interface Props {
    children: JSX.Element;
 }

const RequireAuth: FC<Props> = (props: Props) => {
    const location = useLocation();
    const auth = useSelector((state: RootState) => state.login.isAuth);;

    if(!auth) {
        return (
            <Navigate to="/Login" state={{from: location}}/>
        )
    }
    return props.children;    
}

export default RequireAuth