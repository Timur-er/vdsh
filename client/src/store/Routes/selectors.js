export const getAvailableRoutes = store => store.availableRoutes;
export const getChildrenRoutes = store => {
    const routes = store.availableRoutes.filter(route => route.children);
    if (routes.length !== 0) {
        return routes[0].children;
    }
};