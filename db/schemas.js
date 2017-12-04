const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// SCHEMAS
// A user has many habits, and a habit has many occurrences.
// A user should only be able to access their own habit.
// A habit should only ever be able to access its own occurrences.
// We have decided to use embeded subdocuments to capture this data model.
// It should simplify querying.
// However, it may be worth considering using references instead,
// especially for the users<-->habit relationship.
// As is, habits is an array, which complicates lookup.

const occurrenceSchema = new Schema({
  timestamp: Date,
  value: Number, // Number of units, e.g., 3 cigars.
  notes: String,
});

const habitSchema = new Schema({
  habit: {type: String, unique: true}, // e.g., smoking.
  limit: Number, // e.g., 5 (per timeframe)
  unit: String, // e.g., cigars
  deadline: Date,
  messageSent: Boolean,
  timeframe: String, // e.g., day / week
  occurrences: [occurrenceSchema], // Embeded subdocument.
});

// Schema for users.
const userSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
  phoneNumb: String,
  habitList: Array, // Used to populate dropdowns, e.g., ['smoking', 'running']
  habits: [habitSchema], // Embeded subdocument.
});

module.exports = mongoose.model('User', userSchema);

// note