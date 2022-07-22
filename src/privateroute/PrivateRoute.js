import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../component/service/SureBankClient";

function PrivateRoute(props) {
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function getUserInfo() {
            const token = sessionStorage.getItem("token");

            if (token) {
                const userInfoResponse = await client.getUserInfo();
                if (userInfoResponse && userInfoResponse.status === 200) {
                    setIsAuth(true);
                    return;
                }
            }
            //if token is not found the redirect to login page
            navigate('/login');
        }
        getUserInfo();
    }, [isAuth]);

    if (isAuth === null)
        return null;
    return props.children;
}
export default PrivateRoute;