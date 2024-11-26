import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import UserRoutes from "./Routes/users.routes.js";
import permissionRouter from "./Routes/permission.routes.js";
import authRouter from "./Routes/auth.routes.js";
import officeRouter from "./Routes/officeCategory.routes.js";
import imagesRouter from "./Routes/images.routes.js";
import houseRouter from "./Routes/house.routes.js";
import typeRoute from "./Routes/type.routes.js";
import PropertyRouter from "./Routes/property.routes.js";
import ListingRouter from "./Routes/listing.routes.js";
import sequelizeStore from "connect-session-sequelize";
import db from "./Config/db_connection.js";
import TownRoutes from "./Routes/town.routes.js";
import path from "path";
import { fileURLToPath } from "url";

const PORT = process.env.PORT || 4000;
const app = express();
dotenv.config();

// (async () => {
//   try {
//     await db.authenticate();
//     console.log("Database connection established successfully.");
//     await db.sync();
//     console.log("Database synchronized successfully.");
//   } catch (error) {
//     console.error("Error connecting or synchronizing the database:", error);
//   }
// })();

//?? Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//? Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const sessionStore = sequelizeStore(session.Store);
const store = new sessionStore({
  db: db,
});

// ? Configure session middleware
app.use(
  session({
    secret: process.env.SESS_SECRET, // ? Secret for signing session ID cookies
    resave: false, // ? Do not save session if unmodified
    saveUninitialized: true, // ? Save new sessions to store
    store: store,
    cookie: {
      secure: "auto", // ? Use secure cookies in production
    },
  })
);

// ? Configure CORS to allow requests from the frontend
const corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(express.json());

//? Routes
app.use("/api", UserRoutes);
app.use("/api", permissionRouter);
app.use("/api/", authRouter);
app.use("/api/", officeRouter);
app.use("/api/", imagesRouter);
app.use("/api/", houseRouter);
app.use("/api/", typeRoute);
app.use("/api/", PropertyRouter);
app.use("/api/", ListingRouter);
app.use("/api/", TownRoutes);

//? Sync session store
// store.sync();

app.listen(PORT, () => {
  console.log(`Server is working at http://localhost:${PORT}`);
});
