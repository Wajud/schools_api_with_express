import express from "express";
import { coursesRouter } from "./routes/courses.js";
import errorHandler from "./error.js";

const PORT = 8000;
const app = express();

//json middleware
app.use(express.json());

app.use("/api/courses", coursesRouter);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
