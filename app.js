import express from "express";
import { client } from "./utils/db.js";
import postRouter from "./app/post.js";
import commentRouter from "./app/comment.js";

async function init() {
  try {
    await client.connect;
  } catch {
    console.log("Error to connect server");
  }
  const app = express();
  const port = 4000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use("/posts", postRouter);
  app.use("/posts", commentRouter);

  app.get("/", (req, res) => {
    res.json("Hello World!");
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

init();
