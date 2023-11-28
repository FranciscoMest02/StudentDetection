export async function fetchData() {
    try {
        const headers = {
            "Content-Type": "application/json",
        };
        const host = process.env.NODE_ENV == 'production' ? 'https://class-insight.vercel.app/' : 'http://localhost:3000/'
        const response = await fetch(
            host + "api/students/getstudentsinfo",
            {
                method: "GET",
                headers: headers,
            }
        );

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Request failed with status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
}

export async function fetchGroups() {
    try {
        const headers = {
            "Content-Type": "application/json",
        };
        const host = process.env.NODE_ENV == 'production' ? 'https://class-insight.vercel.app/' : 'http://localhost:3000/'
        const response = await fetch(
            host + "api/getCourses",
            {
                method: "GET",
                headers: headers,
            }
        );

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Request failed with status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
}


export async function fetchStudent(id) {
    try {
        const headers = {
            "Content-Type": "application/json",
        };
        const host = process.env.NODE_ENV == 'production' ? 'https://class-insight.vercel.app/' : 'http://localhost:3000/'
        const response = await fetch(
            host + "api/students/" + id,
            {
                method: "GET",
                headers: headers,
                cache: 'no-store' 
            }
        );

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Request failed with status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
}


export async function fetchCourse(id) {
    try {
        const headers = {
            "Content-Type": "application/json",
        };
        const host = process.env.NODE_ENV == 'production' ? 'https://class-insight.vercel.app/' : 'http://localhost:3000/'
        const response = await fetch(
            host + "api/getCourses/" + id,
            {
                method: "GET",
                headers: headers,
            }
        );

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Request failed with status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
}

export async function manageAuth(user, pass) {
    try {
        const headers = {
            "Content-Type": "application/json",
        };

        const bodyData = {
            "username": user,
            "password": pass
        }

        const host = process.env.NODE_ENV == 'production' ? 'https://class-insight.vercel.app/' : 'http://localhost:3000/'

        const response = await fetch(
            host + "api/auth/",
            {
                method: "POST",
                headers: headers,
                body: JSON.stringify(bodyData),
            }
        );

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Request failed with status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
}