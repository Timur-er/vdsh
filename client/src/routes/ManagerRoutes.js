import React, {useEffect} from 'react';
import {useRoutes} from 'react-router-dom';
import {managerRoutes} from "./routes";
import ContentContainer from "../Components/ContentContainer/ContentContainer";
import NavigationBar from "../Components/NavigationBar/NavigationBar";
import {addRoutesOperation} from "../store/Routes/operations";
import {useDispatch, useSelector} from "react-redux";
import AppContainer from "../Components/AppContainer/AppContainer";
import {getUserRole} from "../store/User/selectors";

const ManagerRoutes = () => {
    const dispatch = useDispatch();
    const role = useSelector(getUserRole);
    const isRoleAvailable = role === 'MANAGER' || role === 'ADMIN';

    const routes = managerRoutes.map(route => {
        return {path: route.path, element: route.element}
    })
    const links = managerRoutes.map(route => {
        return {path: route.path, name: route.name}
    })

    useEffect(() => {
        if (isRoleAvailable) {
            dispatch(addRoutesOperation(managerRoutes));
        }
    }, []);


    const renderRoutes = useRoutes([...routes])
    return (
        <>
            {isRoleAvailable && renderRoutes}
        </>
            // <AppContainer>
            //     <NavigationBar />
            //     <ContentContainer>
                // </ContentContainer>
            // </AppContainer>
    );
};

export default ManagerRoutes;