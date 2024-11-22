import { getAllPosts, createPost, updatePostInDB } from "../models/postModel.js";
import generateDescriptionWithGemini from "../services/geminiService.js";
import fs from 'fs';

export async function listAllPosts(req, res) {
    const posts = await getAllPosts();
    res.status(200).json(posts);
}

export async function createNewPost(req, res) {
    const newPost = req.body;
    try {
        const createdPost = await createPost(newPost);
        res.status(200).json(createdPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating post" });
    }
}

export async function uploadImage(req, res) {
    const newPost = {
        description: "",
        imageUrl: req.file.originalname,
        alt: "",
    };
    try {
        const createdPost = await createPost(newPost);
        const updatedImage = `uploads/${createdPost.insertedId}.png`;
        fs.renameSync(req.file.path, updatedImage);
        res.status(200).json(createdPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating post" });
    }
}

export async function updatePost(req, res) {
    const postID = req.params.id;
    const imageUrl = `http://localhost:3000/${postID}.png`;

    try {
        const imgBuffer = fs.readFileSync(`uploads/${postID}.png`);
        const description = await generateDescriptionWithGemini(imgBuffer);

        const post = {
            description: description,
            imageUrl: imageUrl,
            alt: req.body.alt,
        }

        const updatedPost = await updatePostInDB(postID, post);

        res.status(200).json(updatedPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating post" });
    }
}