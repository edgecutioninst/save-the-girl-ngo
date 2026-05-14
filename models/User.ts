import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['admin'],
    default: 'admin' 
  }
}, { timestamps: true });

// hot-reload safety
const User = models.User || model('User', UserSchema);

export default User;