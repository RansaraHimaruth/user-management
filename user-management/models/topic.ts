import {Mongoose , Schema, model, models} from 'mongoose';
import { title } from 'process';

const topicSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
},
{
    timestamps: true,
}
);

const Topic = models.Topic || model("Topic", topicSchema);
export default Topic;