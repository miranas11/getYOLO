import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const postSchema = new Schema({
    body: {
        type: String,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

const Post = model("Post", postSchema);

export default Post;
