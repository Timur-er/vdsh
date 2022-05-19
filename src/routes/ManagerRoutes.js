import React, {useEffect} from 'react';
import {useRoutes} from 'react-router-dom';
import {managerRoutes} from "./routes";
import {addRoutesOperation} from "../store/Routes/operations";
import {useDispatch, useSelector} from "react-redux";
import {getUserRole} from "../store/User/selectors";

const ManagerRoutes = () => {
    const dispatch = useDispatch();
    const role = useSelector(getUserRole);
    const isRoleAvailable = role === 'MANAGER' || role === 'ADMIN';

    const routes = managerRoutes.map(route => {
        return {path: route.path, element: route.element}
    })

    useEffect(() => {
        if (isRoleAvailable) {
            dispatch(addRoutesOperation(managerRoutes));
        }
    }, [dispatch, isRoleAvailable]);

    const renderRoutes = useRoutes([...routes])

    return (
        <>
            {isRoleAvailable && renderRoutes}
        </>
    );
};

export default ManagerRoutes;