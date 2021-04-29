import * as mongoose from "mongoose";
import { Document } from 'mongoose';
import { Text } from "../text-model";

export type TextDocument = Text & Document;

export const TextSchema = new mongoose.Schema({
  id: String,
  text: String,
  readPassword: String,
  editPassword: String
});
