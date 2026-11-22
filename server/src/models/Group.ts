import { Schema, model, InferSchemaType } from 'mongoose';
import { randomBytes } from 'crypto';

const groupSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    inviteCode: {
      type: String,
      unique: true,
      default: () => randomBytes(6).toString('hex'),
    },
  },
  { timestamps: true }
);

export type GroupDoc = InferSchemaType<typeof groupSchema>;
export const Group = model('Group', groupSchema);