import axios from "axios";
import { User } from "@machb/user-entities";
import { AuthProvider } from "@machb/front-base/dist/login/domain/AuthProvider";

type GetUsersResponse = {
    data: User[];
};

export class AppsAuthProvider implements AuthProvider {

    constructor() {
    }

    async login(user: User) {
        try {
            const { data, status } = await axios.post<GetUsersResponse>((window as any).apiBaseUrl + "/login", {
                username: user.email,
                password: user.password
                }
            );

            sessionStorage.setItem('jwt', data['token']);

            if (undefined !== (window as any).jwt)
                alert('Login successful');   

            console.log('response status is: ', status);
            console.log(JSON.stringify(data, null, 4));

            return data;
        } catch (error) {
            sessionStorage.removeItem('jwt');
           
            alert('Login failed, please check your credentials');

            if (axios.isAxiosError(error)) {
                console.log('error message: ', error.message);
                return error.message;
            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    }

    async registration(user: User) {
        try {
            const { data, status } = await axios.post<GetUsersResponse>((window as any).apiBaseUrl + "/registration", {
                username: user.email,
                password: user.password
            }
            );

            alert('Registration successful');  

            console.log('response status is: ', status);
            console.log(JSON.stringify(data, null, 4));

            return data;
        } catch (error) {
            alert('Registration failed, please check your credentials');

            if (axios.isAxiosError(error)) {
                console.log('error message: ', error.message);
                return error.message;
            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    }
}