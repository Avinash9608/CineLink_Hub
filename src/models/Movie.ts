import mongoose, { Schema, models } from 'mongoose';

const MovieSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  year: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  language: { type: String, required: true },
  quality: { type: String, required: true },
  format: { type: String, required: true },
  tags: { type: [String], required: true },
  description: { type: String, required: true },
  cast: { type: [String], required: true },
  genre: { type: [String], required: true },
  trailer: { type: String, required: true },
  telegramLink: { type: String, required: true },
  directLink: { type: String },
}, { timestamps: true });

const Movie = models.Movie || mongoose.model('Movie', MovieSchema);

export default Movie;
