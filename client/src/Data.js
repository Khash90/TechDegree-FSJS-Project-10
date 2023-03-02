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
            const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);

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

     /**GET request for specific course */
     async getCourse(id) {
        const res = await this.api(`/courses/${id}`, 'GET', null , false, null);
        if (res.status === 200) {
            return res.json().then((data) => data);
        } else {
            return res.status;
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

    /**POST request to create a new user */
    async createUser(user) {
        const response = await this.api(`/users`, 'POST', user, false, null)

        if (response.status === 201) {
          return this.getUser(user.emailAddress, user.password);
        } else if (response.status === 400) {
          return response.json().then((data) => data.errors);
        } else {
          return 500;
        }
      }

    /** POST request to create new course */
    async createCourse(body, username, password) {
      const res = await this.api("/courses", 'POST', body, true, {
        username,
        password,
      });
      if (res.status === 201) {
        return [];
      } else if (res.status === 400) {
        return res.json().then((data) => {
          return data.errors;
        });
      } else {
        throw new Error();
      }
    }
    
    /** PUT request to api to update a course */
    async updateCourse(id, body, username, password) {
      const res = await this.api(`/courses/${id}`, "PUT", body, true, {
        username,
        password,
      });
      if (res.status === 204) {
        return [];
      } else if (res.status === 400) {
        return res.json().then((data) => {
          return data.errors;
        });
      } else {
        throw new Error();
      }
    }

    /** DELETE request to api to delete a course */
    async deleteCourse(id, username, password) {
      const res = await this.api(`/courses/${id}`, "DELETE", null, true, {
        username,
        password,
      });
      if (res.status === 204) {
        return res.status;
      } else if (res.status === 401) {
        return res.status;
      } else {
        throw new Error();
      }
    }
   
}