const snoop = () => {};

const initialStore = {
    ropesOrder: {
        shop_id: '',
        brandData: {},
        order: []
    },
    user: {
        user_id: '',
        email: '',
        name: '',
        surname: '',
        shop_id: '',
        token: '',
        role: '',
        isAuth: false,
        login: snoop,
        isActivated: false
    },
    menu: {
        isOpen: true,
        activePage: ''
    },
    availableRoutes: [],
}

export default initialStore;