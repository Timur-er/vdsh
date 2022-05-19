import React, {useEffect} from "react";
import AppRoutes from "./routes/AppRoutes";
import {getIsAuth} from "./store/User/selectors";
import {useDispatch, useSelector} from "react-redux";
import {useAuth} from "./Hooks/auth.hook";
import {authFunctionsActions} from "./store/User/actions";
import AuthPage from "./Pages/AuthPage/AuthPage";


function App() {
    const dispatch = useDispatch();
    const isAuth = useSelector(getIsAuth);
    const {login} = useAuth();

    useEffect(() => {
        dispatch(authFunctionsActions(login));
    }, [dispatch, login])

  return (
      <>
          {isAuth ? <AppRoutes/> : <AuthPage/>}
      </>
  );
}

export default App;
