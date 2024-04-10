import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import { router as userRoute } from './routes/userRoute.js'
// import { router as friendRoute } from './routes/friendRoute.js'
// import { router as tripRoute } from './routes/tripRoute.js'
// import { router as experienceRoute } from './routes/experienceRoute.js'
// import { router as chatRoute } from './routes/chatRoute.js'
import { router as activityRoute } from './routes/activityRoute.js'

const port = process.env.PORT || 9000;
const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/user", userRoute)
// app.use("/api/friend", friendRoute)
// app.use("/api/trip", tripRoute)
// app.use("/api/experience", experienceRoute)
app.use("/api/activity", activityRoute)
// app.use("/api/chat", chatRoute)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});