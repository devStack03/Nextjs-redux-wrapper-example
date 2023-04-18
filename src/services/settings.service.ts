import Http from "./http.service";

class SettingsService {
    apiUrl = '/';
    
    getLogs(data: any) {
        return Http.post<any>(this.apiUrl + 'logs', data)
    }

    getUserSettings(data: any) {
        return Http.post<any>(this.apiUrl + 'getSettings',data);
    }

    updateUserSettings(data: any) {
        return Http.post(this.apiUrl + `updateSettings`, data)
    }
}

export default new SettingsService();