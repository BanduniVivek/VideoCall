import mongoose, { Schema } from "mongoose"
const meetingSchema = new Schema({
    user_id : { type: String },
    meeting_code : { type: String, required: true },
    date : { type: Date , default : Date.now},
    
})

const meeting = mongoose.model("Meeting", meetingSchema);

export {meeting};
