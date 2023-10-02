import mongoose, { Schema } from "mongoose";
import { IAdmin } from "../interface/admin.interface";

const schema = new Schema<IAdmin>({
  email: {
    type: "string",
    unique: true,
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
});

export default mongoose.model<IAdmin>("admin", schema);
