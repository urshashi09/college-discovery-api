"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerUi = exports.swaggerSpec = void 0;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
exports.swaggerUi = swagger_ui_express_1.default;
exports.swaggerSpec = {
    openapi: "3.0.0",
    info: {
        title: "College Discovery Platform API",
        version: "1.0.0",
        description: "Backend APIs for College Discovery Platform"
    },
    servers: [
        {
            url: "http://localhost:5000"
        }
    ],
    paths: {
        "/api/auth/register": {
            post: {
                summary: "Register User",
                tags: ["Auth"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: {
                                        type: "string"
                                    },
                                    email: {
                                        type: "string"
                                    },
                                    password: {
                                        type: "string"
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    "201": {
                        description: "User Registered"
                    }
                }
            }
        },
        "/api/auth/login": {
            post: {
                summary: "Login User",
                tags: ["Auth"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["email", "password"],
                                properties: {
                                    email: {
                                        type: "string",
                                        format: "email"
                                    },
                                    password: {
                                        type: "string",
                                        minLength: 6
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "Login Success"
                    }
                }
            }
        },
        "/api/auth/profile": {
            get: {
                summary: "Get Profile",
                tags: ["Auth"],
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                responses: {
                    "200": {
                        description: "Profile Data"
                    }
                }
            }
        },
        "/api/colleges": {
            get: {
                summary: "Get Colleges",
                tags: ["Colleges"],
                parameters: [
                    {
                        name: "search",
                        in: "query",
                        schema: {
                            type: "string"
                        }
                    },
                    {
                        name: "location",
                        in: "query",
                        schema: {
                            type: "string"
                        }
                    },
                    {
                        name: "rating",
                        in: "query",
                        schema: {
                            type: "number"
                        }
                    },
                    {
                        name: "minFees",
                        in: "query",
                        schema: {
                            type: "number"
                        }
                    },
                    {
                        name: "maxFees",
                        in: "query",
                        schema: {
                            type: "number"
                        }
                    },
                    {
                        name: "page",
                        in: "query",
                        schema: {
                            type: "integer",
                            default: 1
                        }
                    },
                    {
                        name: "limit",
                        in: "query",
                        schema: {
                            type: "integer",
                            default: 10
                        }
                    }
                ],
                responses: {
                    "200": {
                        description: "List Colleges"
                    }
                }
            }
        },
        "/api/colleges/{id}": {
            get: {
                summary: "Get College By Id",
                tags: ["Colleges"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer"
                        }
                    }
                ],
                responses: {
                    "200": {
                        description: "College Details"
                    }
                }
            }
        },
        "/api/compare": {
            post: {
                summary: "Compare Colleges",
                tags: ["Comparison"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["collegeIds"],
                                properties: {
                                    collegeIds: {
                                        type: "array",
                                        items: {
                                            type: "integer"
                                        },
                                        example: [1, 2]
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "Comparison Result"
                    }
                }
            }
        },
        "/api/predictor": {
            post: {
                summary: "Predict Colleges",
                tags: ["Predictor"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["examName", "category", "rank"],
                                properties: {
                                    examName: {
                                        type: "string"
                                    },
                                    category: {
                                        type: "string"
                                    },
                                    rank: {
                                        type: "integer"
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "Prediction Results"
                    }
                }
            }
        },
        "/api/saved": {
            get: {
                summary: "Get Saved Colleges",
                tags: ["Saved Colleges"],
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                responses: {
                    "200": {
                        description: "Saved Colleges"
                    }
                }
            }
        },
        "/api/saved/{collegeId}": {
            post: {
                summary: "Save College",
                tags: ["Saved Colleges"],
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                parameters: [
                    {
                        name: "collegeId",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer"
                        }
                    }
                ],
                responses: {
                    "201": {
                        description: "College Saved"
                    }
                }
            },
            delete: {
                summary: "Remove Saved College",
                tags: ["Saved Colleges"],
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                parameters: [
                    {
                        name: "collegeId",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer"
                        }
                    }
                ],
                responses: {
                    "200": {
                        description: "College Removed"
                    }
                }
            }
        }
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        }
    }
};
