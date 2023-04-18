import Http from "./http.service";

class UserService {
    apiUrl = '/users';
    
    getAll() {
        return Http.get<Array<any>>(this.apiUrl)
    }

    getById(id: any) {
        return Http.get<any>(this.apiUrl + `/${id}`);
    }

    updateById(id: any, data: any) {
        return Http.patch(this.apiUrl + `/${id}`, data)
    }
}

export default new UserService();