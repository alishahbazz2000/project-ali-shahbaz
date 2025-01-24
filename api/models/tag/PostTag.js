// Model: PostTag
const mongoose = require('mongoose');

const postTagSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Post', 
  },
  tag_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Tag', 
  },
});

module.exports = mongoose.model('PostTag', postTagSchema);
