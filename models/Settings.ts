import mongoose, { Schema, model, models } from 'mongoose';

const SettingsSchema = new Schema({
  // list of facility addresses for the dropdowns
  centers: [{ 
    type: String, 
    trim: true 
  }],
  
  // list of item categories 
  donationCategories: [{ 
    type: String, 
    trim: true 
  }]
}, { timestamps: true });

// hot-reload safeguard
const Settings = models.Settings || model('Settings', SettingsSchema);

export default Settings;