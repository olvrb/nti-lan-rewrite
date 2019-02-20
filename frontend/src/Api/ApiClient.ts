export class ApiClient {
    /**
     * Post
     */
    public static async Post(endpoint: string, body: any): Promise<any> {
        console.log(body);

        const req = await fetch(endpoint, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        return await req.json();
    }

    public static Auth = {
        Login: async (email: string, password: string): Promise<any> => {
            return await ApiClient.Post("/auth/login", { email, password });
        },
        Signup: async (
            email: string,
            password: string,
            nationalId: string,
            name: string,
            surname: string,
            phone: string,
            adultPhone: string,
            address: string,
            postcode: string,
            city: string
        ) => {
            return await ApiClient.Post("/auth/signup", {
                email,
                password,
                nationalId,
                name,
                surname,
                phone,
                adultPhone,
                address,
                postcode,
                city
            });
        }
    };
}
