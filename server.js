const express = require("express");
const app = express();
const port = 3000;
const swaggerUi = require("swagger-ui-express");
const axios = require('axios');

app.use(express.urlencoded({ extended: true }));
// public folder
//app.use(express.static("."));

const mariadb = require("mariadb");
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sample',
    port: 3306,
    connectionLimit: 5
});

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "access-control-allow-methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization"
    );
    next();
});

app.use(express.json());

let swaggerDocument = {
    swagger: "2.0",
    info: {
        description: "REST API project with Swagger",
        version: "1.0.0",
        title: "Personal REST API project",
    },
    host: "157.230.216.96:3000",
    basePath: "/",
    tags: [
        {
            name: "Company",
            description: "CRUD for company",
        },
    ],
    schemes: ["http"],
    paths: {
        "/company": {
            get: {
                tags: ["Company"],
                summary: "Return all companies",

                produces: ["application/json"],
                responses: {
                    200: {
                        description: "Sucessful",
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/definitions/Company",
                            },
                        },
                    },
                    400: {
                        description: "Invalid status value",
                    },
                },
            },
        },

        "/company/{id}": {
            get: {
                tags: ["Company"],
                summary: "Return company by ID",
                description: "Return the company with specific id",

                operationId: "getCompanyById",

                produces: ["application/json"],
                parameters: [
                    {
                        name: "id",

                        in: "path",

                        required: true,
                        type: "integer",
                        format: "int64",
                    },
                ],
                responses: {
                    200: {
                        description: "Successful",
                        schema: {
                            $ref: "#/definitions/Company",
                        },
                    },
                    400: {
                        description: "Invalid ID provided",
                    },
                    404: {
                        description: "Company not found",
                    },
                },
            },
        },
        "/company/add": {
            post: {
                tags: ["Company"],
                summary: "Add a company",
                description: "Add the company to the collection",

                produces: ["application/json"],
                parameters: [
                    {
                        in: "body",
                        name: "body",

                        schema: {
                            $ref: "#/definitions/Company",
                        },
                    },
                ],
                responses: {
                    405: {
                        description: "Invalid input",
                    },
                },
            },
        },
        "/company/edit/{id}": {
            put: {
                tags: ["Company"],

                summary: "Update company by ID",
                description: "Update company by specific ID",
                operationId: "updateCompanyById",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "id",
                        in: "path",

                        required: true,
                        type: "integer",
                        format: "int64",
                    },
                    {
                        in: "body",
                        name: "body",

                        schema: {
                            $ref: "#/definitions/Company",
                        },
                    },
                ],
                responses: {
                    400: {
                        description: "Invalid ID provided",
                    },
                    404: {
                        description: "Company not found",
                    },

                    405: {
                        description: "Validation exception",
                    },
                },
            },
        },

        "/company/delete/{id}": {
            delete: {
                tags: ["Company"],
                summary: "Delete company with ID",
                description: "Delete company with specific ID",
                operationId: "deleteCompanyById",

                produces: ["application/json"],
                parameters: [
                    {
                        name: "id",
                        in: "path",

                        required: true,
                        type: "integer",
                        format: "int64",
                    },
                ],

                responses: {
                    400: {
                        description: "Invalid ID provided",
                    },
                    404: {
                        description: "Company not found",
                    },
                },
            },
        },

        "/company/patch/{id}": {
            patch: {
                tags: ["Company"],
                summary: "Updates a company",
                description: "Updates a company's city'",
                operationId: "patchCompanyById",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "id",
                        in: "path",

                        required: true,
                        type: "integer",
                        format: "int64",
                    },
                    {
                        in: "body",
                        name: "body",

                        schema: {
                            type: "object",
                            properties: {

                                COMPANY_CITY: {
                                    type: "string",
                                    format: "string",
                                    description: "The City of the company",
                                },
                            },
                        },

                    },
                ],
                responses: {
                    405: {
                        description: "Invalid input",
                    },
                },
            },
        },
        "/foods": {
            get: {
                tags: ["Foods"],
                summary: "Return all foods",

                produces: ["application/json"],
                responses: {
                    200: {
                        description: "Sucessful",
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/definitions/Foods",
                            },
                        },
                    },
                    400: {
                        description: "Invalid status value",
                    },
                },
            },
        },

        "/foods/{id}": {
            get: {
                tags: ["Foods"],
                summary: "Return food by ID",
                description: "Return the cfood with specific id",

                operationId: "getFoodsById",

                produces: ["application/json"],
                parameters: [
                    {
                        name: "id",

                        in: "path",

                        required: true,
                        type: "integer",
                        format: "int64",
                    },
                ],
                responses: {
                    200: {
                        description: "Successful",
                        schema: {
                            $ref: "#/definitions/Foods",
                        },
                    },
                    400: {
                        description: "Invalid ID provided",
                    },
                    404: {
                        description: "Food not found",
                    },
                },
            },
        },
        "/foods/add": {
            post: {
                tags: ["Foods"],
                summary: "Add a food item",
                description: "Add the food item to the collection",

                produces: ["application/json"],
                parameters: [
                    {
                        in: "body",
                        name: "body",

                        schema: {
                            $ref: "#/definitions/Foods",
                        },
                    },
                ],
                responses: {
                    405: {
                        description: "Invalid input",
                    },
                },
            },
        },

        "/foods/delete/{id}": {
            delete: {
                tags: ["Foods"],
                summary: "Delete food item with ID",
                description: "Delete food item with specific ID",
                operationId: "deleteFoodsById",

                produces: ["application/json"],
                parameters: [
                    {
                        name: "id",
                        in: "path",

                        required: true,
                        type: "integer",
                        format: "int64",
                    },
                ],

                responses: {
                    400: {
                        description: "Invalid ID provided",
                    },
                    404: {
                        description: "Food item not found",
                    },
                },
            },
        },
    },

    definitions: {

        Company: {
            type: "object",
            properties: {
                COMPANY_ID: {
                    type: "string",
                    format: "string",
                    description: "The unique ID for the company",
                },

                COMPANY_NAME: {
                    type: "string",
                    format: "string",
                    description: "The name of the company",
                },
                COMPANY_CITY: {
                    type: "string",
                    format: "string",
                    description: "The City of the company",
                },
            },
        },

        Foods: {
            type: "object",
            properties: {
                ITEM_ID: {
                    type: "string",
                    format: "string",
                    description: "The unique ID for the food",
                },

                ITEM_NAME: {
                    type: "string",
                    format: "string",
                    description: "The name of the food",
                },
                ITEM_UNIT: {
                    type: "string",
                    format: "string",
                    description: "The unit of food item",
                },
                COMPANY_ID: {
                    type: "string",
                    format: "string",
                    description: "The company of the food item",
                },
            },
        },


    },
};

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get('/say', async (req, res) => {
    const keyword = req.query.keyword;
    try {
        const response = await axios.get('https://wo2l5azdywkoacetoq2stnerye0nfhih.lambda-url.us-east-2.on.aws/', {
            params: { keyword }
        });
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong!');
    }
});


app.get("/company", (req, res) => {
    pool
        .getConnection()
        .then((conn) => {
            conn
                .query("SELECT * FROM company")
                .then((rows) => {
                    // Convert the rows into a JSON object
                    res.json(rows);

                    conn.end();
                })
                .catch((err) => {
                    // JSON object with error message
                    res.json({ error: err });
                    conn.end();
                });
        })
        .catch((err) => {
            // JSON object with error message
            res.json({ error: err });
        });
});

app.get("/company/:id", (req, res) => {
    let COMPANY_ID = req.params.id;
    if (COMPANY_ID == null) {
        res.json({ error: "Please enter company ID" });
        return;
    }

    // Check if the id is a number
    if (isNaN(COMPANY_ID)) {
        res.json({ error: "ID must be a valid number" });
        return;
    }
    pool
        .getConnection()
        .then((conn) => {
            conn
                .query("SELECT * FROM company WHERE COMPANY_ID= ?", [COMPANY_ID])
                .then((rows) => {
                    if (rows.length == 0) {
                        res.json({ error: "No company with this ID" });
                        conn.end();
                    } else {
                        res.json(rows);
                        conn.end();
                    }
                })
                .catch((err) => {
                    res.json({ error: err });
                    conn.end();
                });
        })
        .catch((err) => {
            res.json({ error: err });
        });
});

app.post("/company/add", (req, res) => {
    let COMPANY_ID = req.body.COMPANY_ID;
    let COMPANY_NAME = req.body.COMPANY_NAME;
    let COMPANY_CITY = req.body.COMPANY_CITY;
    if (
        COMPANY_ID == null ||
        COMPANY_NAME == null ||
        COMPANY_CITY == null
    ) {
        res.json({ error: "Missing required input" });
        return;
    }

    // Check if the id is a number
    if (req.body.COMPANY_ID != null && isNaN(req.body.COMPANY_ID)) {
        res.status(400);
        res.json({ error: "ID must be a valid number" });

        return;
    }

    pool
        .getConnection()
        .then((conn) => {
            conn
                .query(
                    "INSERT INTO company (COMPANY_ID, COMPANY_NAME, COMPANY_CITY) VALUES (?, ?, ?)",
                    [COMPANY_ID, COMPANY_NAME, COMPANY_CITY]
                )
                .then((rows) => {
                    res.json({ success: "Successfully added Company" });
                    conn.end();
                })
                .catch((err) => {
                    // Duplicate check
                    if (err.errno == 1062) {
                        res.status(400);
                        res.json({ error: "Company already exists in collection" });
                    } else {
                        res.json({ error: err.message });
                    }

                    conn.end();
                });
        })
        .catch((err) => {
            res.status(400);
            res.json(err.message);
        });
});

app.put("/company/edit/:id", (req, res) => {
    let COMPANY_NAME = req.body.COMPANY_NAME;
    let COMPANY_CITY = req.body.COMPANY_CITY;
    let COMPANY_ID = req.params.id;

    if (
        COMPANY_ID == null ||
        COMPANY_NAME == null ||
        COMPANY_CITY == null
    ) {
        res.json({ error: "Missing required input" });
        return;
    }

    pool
        .getConnection()
        .then((conn) => {
            conn
                .query(
                    "UPDATE company SET COMPANY_NAME = ?, COMPANY_CITY = ? WHERE COMPANY_ID = ?",
                    [COMPANY_NAME, COMPANY_CITY, COMPANY_ID]
                )
                .then((rows) => {
                    if (rows.length == 0) {
                        res.json({ error: "No company with this ID" });
                        conn.end();
                    } else {
                        res.json({ success: "Successfully updated company" });
                        conn.end();
                    }
                })
                .catch((err) => {
                    res.json({ error: err });
                    conn.end();
                });
        })
        .catch((err) => {
            res.json({ error: err });
        });
});

app.delete("/company/delete/:id", (req, res) => {
    let COMPANY_ID = req.params.id;
    if (COMPANY_ID == null) {
        res.json({ error: "Missing required input" });
    }

    // Check if the id is a number
    if (isNaN(COMPANY_ID)) {
        res.json({ error: "ID must be a valid number" });
        return;
    }
    pool
        .getConnection()
        .then((conn) => {
            // Check if the company exists
            conn
                .query("SELECT * FROM company WHERE COMPANY_ID = ?", [COMPANY_ID])
                .then((rows) => {
                    if (rows.length == 0) {
                        res.json({ error: "Company does not exist with this ID" });
                        conn.end();
                    } else {
                        conn
                            .query("DELETE FROM company WHERE COMPANY_ID = ?", [COMPANY_ID])

                            .then((rows) => {
                                res.json({ success: "Successfully deleted company" });
                            })
                            .catch((err) => {
                                res.json({ error: err });
                            });
                    }
                })
                .catch((err) => {
                    res.json({ error: err });
                    conn.end();
                });
        })
        .catch((err) => {
            res.json({ error: err });
        });
});

app.patch("/company/patch/:id", (req, res) => {
    let COMPANY_ID = req.params.id;
    //let COMPANY_NAME = req.body.COMPANY_NAME;
    let COMPANY_CITY = req.body.COMPANY_CITY;

    if (
        COMPANY_ID == null ||
        COMPANY_CITY == null
        //COMPANY_NAME == null
    ) {
        res.json({ error: "Missing required input" });
        return;
    }
    // Check if the id is a number
    if (req.body.COMPANY_ID != null && isNaN(req.body.COMPANY_ID)) {
        res.status(400);
        res.json({ error: "ID must be a valid number" });

        return;
    }
    pool
        .getConnection()

        .then((conn) => {
            conn
                .query(
                    //"UPDATE company SET COMPANY_ID = ?, COMPANY_NAME = ?, COMPANY_CITY = ?",
                    "UPDATE company SET COMPANY_CITY = ? WHERE COMPANY_ID = ?",
                    //[COMPANY_ID, COMPANY_NAME, COMPANY_CITY]
                    [COMPANY_CITY, COMPANY_ID]
                )

                .then((rows) => {
                    res.json({ success: "Successfully update company" });
                    conn.end();
                })
                .catch((err) => {
                    res.json({ error: err });
                    conn.end();
                });
        })

        .catch((err) => {
            res.json({ error: err });
        });
});





app.get("/foods", (req, res) => {
    pool
        .getConnection()
        .then((conn) => {
            conn
                .query("SELECT * FROM foods")
                .then((rows) => {
                    // Convert the rows into a JSON object
                    res.json(rows);

                    conn.end();
                })
                .catch((err) => {
                    // JSON object with error message
                    res.json({ error: err });
                    conn.end();
                });
        })
        .catch((err) => {
            // JSON object with error message
            res.json({ error: err });
        });
});

app.get("/foods/:id", (req, res) => {
    let ITEM_ID = req.params.id;
    if (ITEM_ID == null) {
        res.json({ error: "Please enter food ID" });
        return;
    }

    // Check if the id is a number
    if (isNaN(ITEM_ID)) {
        res.json({ error: "ID must be a valid number" });
        return;
    }
    pool
        .getConnection()
        .then((conn) => {
            conn
                .query("SELECT * FROM foods WHERE ITEM_ID= ?", [ITEM_ID])
                .then((rows) => {
                    if (rows.length == 0) {
                        res.json({ error: "No food with this ID" });
                        conn.end();
                    } else {
                        res.json(rows);
                        conn.end();
                    }
                })
                .catch((err) => {
                    res.json({ error: err });
                    conn.end();
                });
        })
        .catch((err) => {
            res.json({ error: err });
        });
});

app.post("/foods/add", (req, res) => {
    let ITEM_ID = req.body.ITEM_ID;
    let ITEM_NAME= req.body.ITEM_NAME;
    let ITEM_UNIT = req.body.ITEM_UNIT;
    let COMPANY_ID = req.body.COMPANY_ID;
    if (
        ITEM_ID == null ||
        ITEM_NAME == null ||
        ITEM_UNIT == null ||
        COMPANY_ID == null
    ) {
        res.json({ error: "Missing required input" });
        return;
    }

    // Check if the id is a number
    if (req.body.ITEM_ID != null && isNaN(req.body.ITEM_ID)) {
        res.status(400);
        res.json({ error: "ID must be a valid number" });

        return;
    }

    pool
        .getConnection()
        .then((conn) => {
            conn
                .query(
                    "INSERT INTO foods (ITEM_ID, ITEM_NAME, ITEM_UNIT, COMPANY_ID) VALUES (?, ?, ?, ?)",
                    [ITEM_ID, ITEM_NAME, ITEM_UNIT, COMPANY_ID]
                )
                .then((rows) => {
                    res.json({ success: "Successfully added food" });
                    conn.end();
                })
                .catch((err) => {
                    // Duplicate check
                    if (err.errno == 1062) {
                        res.status(400);
                        res.json({ error: "This item already exists in collection" });
                    } else {
                        res.json({ error: err.message });
                    }

                    conn.end();
                });
        })
        .catch((err) => {
            res.status(400);
            res.json(err.message);
        });
});



app.delete("/foods/delete/:id", (req, res) => {
    let ITEM_ID = req.params.id;
    if (ITEM_ID == null) {
        res.json({ error: "Missing required input" });
    }

    // Check if the id is a number
    if (isNaN(ITEM_ID)) {
        res.json({ error: "ID must be a valid number" });
        return;
    }
    pool
        .getConnection()
        .then((conn) => {
            // Check if the company exists
            conn
                .query("SELECT * FROM foods WHERE ITEM_ID = ?", [ITEM_ID])
                .then((rows) => {
                    if (rows.length == 0) {
                        res.json({ error: "Food item does not exist with this ID" });
                        conn.end();
                    } else {
                        conn
                            .query("DELETE FROM foods WHERE ITEm_ID = ?", [ITEM_ID])

                            .then((rows) => {
                                res.json({ success: "Successfully deleted food item" });
                            })
                            .catch((err) => {
                                res.json({ error: err });
                            });
                    }
                })
                .catch((err) => {
                    res.json({ error: err });
                    conn.end();
                });
        })
        .catch((err) => {
            res.json({ error: err });
        });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});