export const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "My brand API",
            description: "My brand, A personal blog RESTfull API documentation",
            contact: {
                name: "Alain MUCYO",
                email:"alainmucyo3@gmail.com"
            },
            servers: ["http://localhost:5000/"]
        }
    },
    // ['.routes/*.js']
    apis: ["./controllers/*.js"]
};
