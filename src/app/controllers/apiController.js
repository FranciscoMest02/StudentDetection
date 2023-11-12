export async function fetchData() {
    try {
        const headers = {
            "Content-Type": "application/json",
        };

        const response = await fetch(
            "http://localhost:3000/api/students/getstudentsinfo",
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

        const response = await fetch(
            "http://localhost:3000/api/getCourses",
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

        const response = await fetch(
            "http://localhost:3000/api/students/" + id,
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

        const response = await fetch(
            "http://localhost:3000/api/getCourses/" + id,
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