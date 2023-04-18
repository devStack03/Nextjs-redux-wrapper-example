import Http from "./http.service";
class AuthService {
    apiUrl = '';
    
    login(data: any) {
        return Http.post(this.apiUrl + '/login', data);
    }

    create(data: any) {
        return Http.post<any>(this.apiUrl + '/sign-up', data);
    }

    dump(data: any) {
        return Http.post<any>('/api/users', data);
    }
}

export default new AuthService();