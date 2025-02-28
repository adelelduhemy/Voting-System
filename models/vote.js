const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const VoteSchema = new mongoose.Schema({
  voterName: { type: String, required: true },
  voterEmail: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  candidate: { type: String, required: true },
});

// Hash password before saving
VoteSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('Vote', VoteSchema);
