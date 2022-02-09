import { Schema, model, Document } from 'mongoose'

interface BlacklistInterface extends Document {
    document: String
}

const BlacklistSchema = new Schema({
    document: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
})

export default model<BlacklistInterface>('Blacklist', BlacklistSchema)