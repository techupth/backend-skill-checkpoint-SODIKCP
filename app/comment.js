import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const commentRouter = Router();

commentRouter.post("/:id/comments", async (req, res) => {
  const collection = db.collection("posts");
  const postId = new ObjectId(req.params.id);
  const commentData = { ...req.body };
  const comment = await collection.updateOne(
    {
      _id: postId,
    },
    {
      $push: { comments: commentData },
    }
  );

  /**modifiedCount เอาไว้รายงานจำนวนเอกสารที่ถูกปรับเปลี่ยน ใช้กับพวก
   * updateOne, updateMany, deleteOne, หรือ deleteMany ถ้ามีการเปลี่ยนแปลง
   * modifiedCountจะเท่ากับ 1 แต่ถ้าไม่มี modifiedCountจะ = 0
   */
  if (comment.modifiedCount === 1) {
    res.status(202).json({
      message: `Comment in post id ${postId} has been added successfully`,
    });
  } else {
    res.status(404).json({
      message: `Post not found`,
    });
  }
});

export default commentRouter;
