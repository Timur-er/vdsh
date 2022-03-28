import React, {useEffect} from 'react';
import {useRoutes} from 'react-router-dom';
import {userRoutes} from "./routes";
import {addRoutesOperation} from "../store/Routes/operations";
import {useDispatch, useSelector} from "react-redux";
import {getUserRole} from "../store/User/selectors";

const UserRoutes = () => {
    const dispatch = useDispatch();
    const role = useSelector(getUserRole);
    const isRoleAvailable = role === 'USER' || role === 'MANAGER' || role === 'ADMIN';
    const routes = userRoutes.map(route => {
        return {path: route.path, element: route.element}
    })

    useEffect( () => {
        if (isRoleAvailable) {
            dispatch(addRoutesOperation(userRoutes));
        }
    }, [role, dispatch, isRoleAvailable]);

    const renderRoutes = useRoutes([...routes])

    return (
        <>
            {isRoleAvailable && renderRoutes}
        </>
    );
};

export default UserRoutes;