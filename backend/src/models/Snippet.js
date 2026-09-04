import mongoose from 'mongoose';

const SnippetSchema = new mongoose.Schema({
  shareId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  title: {
    type: String,
    default: 'Untitled JS Snippet'
  },
  code: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: 'General'
  },
  tags: [{
    type: String
  }],
  views: {
    type: Number,
    default: 0
  },
  isPublic: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Snippet', SnippetSchema);
