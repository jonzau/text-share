import * as mongoose from "mongoose";
import { Document } from 'mongoose';
import { CreateTextDto } from "@text-share/api-interfaces";

export type TextDocument = CreateTextDto & Document;

export const TextSchema = new mongoose.Schema({
  id: String,
  text: String,
  readPassword: String,
  editPassword: String
});
