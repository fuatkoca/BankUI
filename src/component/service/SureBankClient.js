import axios from "axios"

const BASE_URL = "http://localhost:8080";
export const itemsCountPerPage = 5;

function getToken() {
    let auth = sessionStorage.getItem("token");
    if (auth) {
        auth = JSON.parse(auth);
    }
    return auth ? `Bearer ${auth.token}` : "";
}


const getAxiosIntance = () => {
    const token = getToken();
    const axiosInstance = axios.create({
        headers: {
            Authorization: token
        }
    })
    return axiosInstance;
}





class SureBankClient {

    register(userInfo) {
        return axios.post(BASE_URL + "/register", userInfo);
    }

    login(loginInfo) {
        return axios.post(BASE_URL + "/login", loginInfo);
    }

    sendMessage(messageInfo) {
        return axios.post(BASE_URL + "/message/visitor", messageInfo);
    }

    getMessages() {
        return getAxiosIntance().get(BASE_URL + "/message");
    }

    getUserInfo() {
        return getAxiosIntance().get(BASE_URL + "/user/userInfo");
    }

    deposit(depositInfo) {
        return getAxiosIntance().post(BASE_URL + "/account/deposit", depositInfo);
    }

    withdraw(withdrawInfo) {
        return getAxiosIntance().post(BASE_URL + "/account/withdraw", withdrawInfo);
    }

    transfer(transferInfo) {
        return getAxiosIntance().post(BASE_URL + "/account/transfer", transferInfo);
    }

    getRecipients() {
        return getAxiosIntance().get(BASE_URL + "/account/recipient");
    }

    addRecipient(recipientInfo) {
        return getAxiosIntance().post(BASE_URL + "/account/recipient", recipientInfo);
    }

    deleteRecipient(id) {
        return getAxiosIntance().delete(BASE_URL + "/account/recipient/" + id);
    }

    getCustomerStatement(sDate, eDate) {
        const requestParam = { params: { startDate: sDate, endDate: eDate } };
        return getAxiosIntance().get(BASE_URL + "/account/customerstatement", requestParam);
    }

    getBankStatement(sDate, eDate) {
        const requestParam = { params: { startDate: sDate, endDate: eDate } };
        return getAxiosIntance().get(BASE_URL + "/account/bankstatement", requestParam);
    }

    getAllUsers(page) {
        return getAxiosIntance().get(BASE_URL + `/user/all?page=${page}&size=${itemsCountPerPage}&sort=id,asc`);
    }

    updateUser(id, user) {
        return getAxiosIntance().put(BASE_URL + "/user/" + id, user);
    }

    getUser(id) {
        return getAxiosIntance().get(BASE_URL + "/user/" + id);
    }

}

export default new SureBankClient();