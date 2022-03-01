import React, {useEffect} from 'react';
import {useRoutes} from 'react-router-dom';
import {adminRoutes, managerRoutes} from "./routes";
import ContentContainer from "../Components/ContentContainer/ContentContainer";
import NavigationBar from "../Components/NavigationBar/NavigationBar";
import {useDispatch, useSelector} from "react-redux";
import {addRoutesOperation} from "../store/Routes/operations";
import AppContainer from "../Components/AppContainer/AppContainer";
import {getUserRole} from "../store/User/selectors";

const AdminRoutes = () => {
    const dispatch = useDispatch();
    const role = useSelector(getUserRole);
    const isRoleAvailable = role === 'ADMIN';
    const routes = adminRoutes.map(route => {
        return {path: route.path, element: route.element}
    })
    const links = adminRoutes.map(route => {
        return {path: route.path, name: route.name}
    })

    useEffect(() => {
        if (isRoleAvailable) {
            dispatch(addRoutesOperation(adminRoutes));
        }
    }, []);


    const renderRoutes = useRoutes([...routes])
    return (
            // <AppContainer>
            //     <NavigationBar />
            //     <ContentContainer>
        <>
            {isRoleAvailable && renderRoutes}
        </>                // </ContentContainer>
            // </AppContainer>
    );
};

export default AdminRoutes;