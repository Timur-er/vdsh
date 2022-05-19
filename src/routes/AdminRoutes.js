import React, {useEffect} from 'react';
import {useRoutes} from 'react-router-dom';
import {adminRoutes} from "./routes";
import {useDispatch, useSelector} from "react-redux";
import {addRoutesOperation} from "../store/Routes/operations";
import {getUserRole} from "../store/User/selectors";

const AdminRoutes = () => {
    const dispatch = useDispatch();
    const role = useSelector(getUserRole);
    const isRoleAvailable = role === 'ADMIN';

    const routes = adminRoutes.map(route => {
        return {path: route.path, element: route.element}
    })

    useEffect(() => {
        if (isRoleAvailable) {
            dispatch(addRoutesOperation(adminRoutes));
        }
    }, [dispatch, isRoleAvailable]);

    const renderRoutes = useRoutes([...routes])

    return (
        <>
            {isRoleAvailable && renderRoutes}
        </>
    );
};

export default AdminRoutes;