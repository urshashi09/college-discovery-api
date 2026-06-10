"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const college_routes_1 = __importDefault(require("./routes/college.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const saved_routes_1 = __importDefault(require("./routes/saved.routes"));
const comparison_routes_1 = __importDefault(require("./routes/comparison.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const predictor_routes_1 = __importDefault(require("./routes/predictor.routes"));
const swagger_1 = require("./config/swagger");
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "College Discovery Backend Running"
    });
});
app.use("/api/docs", swagger_1.swaggerUi.serve, swagger_1.swaggerUi.setup(swagger_1.swaggerSpec));
app.use("/api/colleges", college_routes_1.default);
app.use("/api/auth", auth_routes_1.default);
app.use("/api/saved", saved_routes_1.default);
app.use("/api/compare", comparison_routes_1.default);
app.use("/api/predictor", predictor_routes_1.default);
app.use(error_middleware_1.errorHandler);
exports.default = app;
