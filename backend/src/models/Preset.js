import mongoose from 'mongoose';

const PresetSchema = new mongoose.Schema({
  presetId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Sorting', 'Searching', 'Recursion', 'Async & Event Loop', 'Data Structures'],
    default: 'Sorting'
  },
  complexity: {
    time: String,
    space: String
  },
  code: {
    type: String,
    required: true
  },
  description: String
}, {
  timestamps: true
});

export default mongoose.model('Preset', PresetSchema);
