import mongoose from "mongoose"
import { Message } from "../models/Message.model.js"

const addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body
        const data = await Message.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        })
        if (data) {
            return res.json({ msg: "message add succesfully" })
        } else {
            return res.json({ msg: "failed to add message " })
        }
    } catch (error) {
        next(error)
    }
}

export { addMessage }

const getAllMessage = async (req, res, next) => {
    try {
        const { from, to } = req.body;  // Use req.query for query parameters
        const messages = await Message.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 });

        const projectMessage = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };
        });
        res.json(projectMessage);
    } catch (error) {
        next(error);
    }
};

export { getAllMessage }