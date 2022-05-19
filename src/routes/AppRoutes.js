import React from 'react';
import NavigationBar from "../Components/NavigationBar/NavigationBar";
import ContentContainer from "../Components/ContentContainer/ContentContainer";
import UserRoutes from "./UserRoutes";
import ManagerRoutes from "./ManagerRoutes";
import AdminRoutes from "./AdminRoutes";
import AppContainer from "../Components/AppContainer/AppContainer";

const AppRoutes = () => {
    return (
        <>
                <AppContainer>
                    <NavigationBar />

                    <ContentContainer>
                        <UserRoutes />
                        <ManagerRoutes />
                        <AdminRoutes />
                    </ContentContainer>
                </AppContainer>
        </>
    );
};

export default AppRoutes;