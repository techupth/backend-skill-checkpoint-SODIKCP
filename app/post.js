import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const postRouter = Router();

postRouter.get("/", async (req, res) => {
  const collection = db.collection("posts");
  const title = req.query.title;
  const category = req.query.category;

  const query = {};
  if (category) {
    query.category = category;
  }

  if (title) {
    query.title = new RegExp(title, "i");
  }

  const posts = await collection.find(query).toArray();

  return res.json({
    data: posts,
  });
});

postRouter.get("/:id", async (req, res) => {
  const collection = db.collection("posts");
  const postId = new ObjectId(req.params.id);
  const posts = await collection.find({ _id: postId }).toArray();
  return res.json({
    data: posts,
  });
});

postRouter.post("/", async (req, res) => {
  const collection = db.collection("posts");
  const postData = { ...req.body };
  try {
    const posts = await collection.insertOne(postData);
  } catch {
    console.log("Plese check request body ");
  }

  return res.json({
    message: "Post has been created successfully",
  });
});

postRouter.put("/:id", async (req, res) => {
  const collection = db.collection("posts");
  const postId = new ObjectId(req.params.id);
  const postData = { ...req.body };
  const posts = await collection.updateOne(
    {
      _id: postId,
    },
    {
      $set: postData,
    }
  );
  return res.json({
    message: `Post id:${postId} has been updated successfully`,
  });
});

postRouter.delete("/:id", async (req, res) => {
  const collection = db.collection("posts");
  const postId = new ObjectId(req.params.id);
  const posts = await collection.deleteOne({ _id: postId });
  return res.json({
    message: `Post Id:${postId} has been deleted successfully`,
  });
});

export default postRouter;
