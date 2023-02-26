import apiBaseUrl from './config'

export default class Data {
    api(
        path,
        method= 'GET',
        body = null,
        requiresAuth = false,
        credentials = null
        ) {
        const url = apiBaseUrl + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };
        if (body !== null) {
            options.body = JSON.stringify(body);
        }
        //check if auth is required
        if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.usernam}:${credentials.password}`);

            options.headers['Authorization'] = `Basic ${encodedCredentials}`
        }
        return fetch(url, options);
    }

    /**GET request to get all courses */
    async getCourses() {
        const res = await this.api('/courses', 'GET', null,false,null);

        if (res.status === 200) {
            return res.json().then((data) => data);
        } else {
            throw new Error();
        }
    }



    /**GET request to get user info */
    async getUser(username, password) {
        const res = await this.api('/users', 'GET', null, true , {
            username,
            password
        });

        if (res.status === 200) {
            return res.json().then((data) => data)
        } else if (res.status === 401) {
            return null;
        } else {
            throw new Error()
        }
    }
}