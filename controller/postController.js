import Post from "../models/posts.js";
import User from "../models/user.js";
import CustomError from "../utils/CustomError.js";

export async function showAllPosts(req, res) {
    const posts = await Post.find().populate({
        path: "author",
        select: "email",
    });

    res.json({ status: true, data: { posts: posts } });
}

export async function createPost(req, res) {
    const post = new Post(req.body);
    post.author = req.session.user_id;
    try {
        const user = await User.findById(req.session.user_id);
        const savedPost = await post.save();
        user.posts.push(savedPost._id);
        await user.save();
        res.json({
            status: true,
            data: { message: "Succefully Created a Post" },
        });
    } catch (e) {
        res.status(500).json({ status: false, data: { message: e.message } });
    }
}

export async function editPost(req, res) {
    const id = req.params.id;
    const body = req.body;
    try {
        await Post.findByIdAndUpdate(id, body);
        res.json({
            status: true,
            data: { message: "Post Updated Succesfully" },
        });
    } catch (e) {
        throw new CustomError("Could Not Update Post", 400);
    }
}

export async function deletePost(req, res) {
    const id = req.params.id;
    await Post.findByIdAndDelete(id);
    res.json({ status: true, data: { message: "Post Deleted Succesfully" } });
}
