import express from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import logger from "morgan";
import { dbConnect } from "./config/db/dbConnect";
import { userRoutes } from "./routes/users/usersRoute";
import { errorHandler, notFoundHandler } from "./middleware/error/errorHandler";
import { postRoute } from "./routes/posts/postRoutes";
import { commentRoute } from "./routes/comments/commentRoutes";
import { emailRoutes } from "./routes/email/emailMessage";
import { categoryRoutes } from "./routes/category/categoryRoutes";
import cors from "cors";
import { eventRoute } from "./routes/events/eventRoutes";
const port = 5000;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Ali Shahbaz",
      description:
        "<h2>Ali Shahbaz</h2>Api for course Library and Framework React Router V7 created with Bun and Express and MongoDB",
      contact: {
        name: "Ali Shahbaz",
        email: "mr.alishahbazz@gmail.com",
      },
    },
    tags: [
      {
        name: "Users",
        description:
          "APIs for managing user-related operations, including registration, login, profile management, and user interactions.",
      },
      {
        name: "Posts",
        description:
          "APIs for managing posts or blog-related content, including creation, updating, retrieval, and deletion of posts.",
      },
      {
        name: "Events",
        description:
          "APIs for handling event-related operations, such as creating, updating, retrieving, and deleting events.",
      },
      {
        name: "Category",
        description:
          "APIs for managing categories, including adding, updating, listing, and removing categories.",
      },
      {
        name: "Email",
        description:
          "APIs for email-related operations, such as sending notifications, generating email tokens, and verifying email addresses.",
      },
      {
        name: "Comments",
        description:
          "APIs for managing comments on posts or events, including adding, editing, retrieving, and deleting comments.",
      },
    ],
    servers: [
      {
        url: `http://localhost:${port}/api`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/**/*.js"],
};
// clear terminal
console.clear();
const app = express();
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

dbConnect();
// ?-- middleware --
app.use(express.json());

app.use(cors());
// development
app.use(logger("dev"));

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoute);
app.use("/api/events", eventRoute);
app.use("/api/comments", commentRoute);
app.use("/api/emailMsg", emailRoutes);
app.use("/api/category", categoryRoutes);

// errorHandler
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
