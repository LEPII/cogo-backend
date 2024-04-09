import express from 'express';

const router = express.Router()

router
    .route("/")
    .get(getChatInfo)
    .post(createChatRoom)
    .post(createMessage)
    .delete(deleteChatRoom)

export { router }