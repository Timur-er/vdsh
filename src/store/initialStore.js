const snoop = () => {};

const initialStore = {
    ropesOrder: {
        shop_id: '',
        brand_data: {},
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
        is_auth: false,
        login: snoop,
        is_activated: false
    },
    menu: {
        is_open: true,
        active_page: ''
    },
    availableRoutes: [],
    brands: {
        loading: false
    },
    modal: {
        isOpen: false
    },
    orders: [],
    popup: {
        is_open: false,
        message: '',
        is_error: false
    }
}

export default initialStore;