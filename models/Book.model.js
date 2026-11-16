const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  bookName : {
    type: String,
    required: [true, 'Book name is required'],
    minlength: [3, 'Book name must be at least 3 characters long'],
    maxlength: [100, 'Book name cannot exceed 100 characters'],
  },
  countInStock : {
    type: Number,
    required: [true, 'Count in stock is required'],
    min: [1, 'Count in stock must be at least 1'],
    max: [100, 'Count in stock cannot exceed 100'],
  },
  price : {
    type: Number,
    required: [true,'Price is required'],
    min: [1, 'Price must be at least 1'],
    max: [1000, 'Price cannot exceed 1000'],
  },

  dateCreated : {
    type: Date,
    default: Date.now,
  },
  image : {
    type: String,
    default:"",
    validate: {
      validator: function(v){
        if(!v) return true; // Allow empty string
        return /https?:\/\/.+/.test(v); // Validate URL format
      },
      message: "Image must be a valid URL"
    }
  },
});

bookSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

bookSchema.set('toJSON', {
  virtuals: true,
});


module.exports = mongoose.model('Book', bookSchema);