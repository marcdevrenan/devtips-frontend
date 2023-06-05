import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        token: ""
    }),
    actions: {
        setToken(token: string) {
            this.token = token
            localStorage.setItem('token', token);
        },
        logout() {
            this.token = ""
            localStorage.removeItem('token');
        }
    },
    getters: {
        isAuthenticated() : boolean {
            const token = localStorage.getItem('token');
            return token !== null
        },
        userId() : string {
            return parseJwt(localStorage.getItem('token') ?? "").uid;
        }
    }
});

function parseJwt (jwt : string) {
    var base64Url = jwt.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}