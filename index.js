import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import { router as userRoute } from './routes/userRoute.js'
import { router as friendInviteRoute } from './routes/friendInviteRoute.js'
import { router as tripRoute } from './routes/tripRoute.js'
import { router as experienceRoute } from './routes/experienceRoute.js'
import { router as tripInviteRoute } from './routes/tripInviteRoute.js'
// import { router as chatRoute } from './routes/chatRoute.js'
import { router as activityRoute } from './routes/activityRoute.js'
import { router as suggestionsRoute } from './routes/suggestionsRoute.js'
import { router as mapsRoute } from './routes/mapsRoute.js'

const port = process.env.PORT || 9000;
const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/user", userRoute)
app.use("/api/friendInvite", friendInviteRoute)
app.use("/api/trip", tripRoute)
app.use("/api/experience", experienceRoute)
app.use("/api/activity", activityRoute)
app.use("/api/tripInvite", tripInviteRoute)
app.use("/api/suggestions", suggestionsRoute),
app.use("/api/maps", mapsRoute),

// app.use("/api/chat", chatRoute)


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});