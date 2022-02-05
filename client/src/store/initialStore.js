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
        isAuth: false,
        login: snoop,
        isActivated: false
    }
}

export default initialStore;