const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => {
                return new Types.ObjectId();
            }
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => {
                return `${new Date(date).getMonth() + 1}/${new Date(
                    date
                ).getDate()}/${new Date(date).getFullYear()}`;
            }
        },
    },
    {
        toJSON: {
            getters: true
        },
        id: false,
    }
);

module.exports = reactionSchema;

