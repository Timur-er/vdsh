import React, {useEffect} from 'react';
import {useRoutes} from 'react-router-dom';
import {userRoutes} from "./routes";
import ContentContainer from "../Components/ContentContainer/ContentContainer";
import NavigationBar from "../Components/NavigationBar/NavigationBar";
import {addRoutesOperation} from "../store/Routes/operations";
import {useDispatch, useSelector} from "react-redux";
import AppContainer from "../Components/AppContainer/AppContainer";
import {getUserRole} from "../store/User/selectors";

const UserRoutes = () => {
    const dispatch =useDispatch();
    const role = useSelector(getUserRole);
    const isRoleAvailable = role === 'USER' || role === 'MANAGER' || role === 'ADMIN';
    const routes = userRoutes.map(route => {
        return {path: route.path, element: route.element}
    })
    const links = userRoutes.map(route => {
        return {path: route.path, name: route.name}
    })

    useEffect(() => {
        if (isRoleAvailable) {
            dispatch(addRoutesOperation(userRoutes));
        }
    }, [role]);


    const renderRoutes = useRoutes([...routes])
    return (
        // <AppContainer>
        //     <NavigationBar />
        //     <ContentContainer>
        <>
            {isRoleAvailable && renderRoutes}
        </>            // </ContentContainer>
        // </AppContainer>
    );
};

export default UserRoutes;