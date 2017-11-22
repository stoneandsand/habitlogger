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
const occurrenceSchema = new Schema({
  timestamp: Date,
  value: Number, // Number of units, e.g., 3 cigars.
});

const habitSchema = new Schema({
  // Is unique habit going to be a problem?
  // If it is a problem, consider using the habitList array.
  // If the habit exists in the habitList array,
  // don't allow the user to create a new habit.
  habit: {type: String, unique: true}, // e.g., smoking.
  limit: Number,
  unit: String, // e.g., cigars.
  timeframe: String, // e.g., day / week / month
  occurrences: [occurrenceSchema], // Emeded subdocument.
});

// Schema for a users.
const userSchema = new Schema({
  username: {type: String, unique: true},
  password: String,
  habitList: Array, // Array of strings, e.g., ['smoking', 'running']
  habits: [habitSchema],  // Embeded subdocument.
});

module.exports = mongoose.model('User', userSchema);
