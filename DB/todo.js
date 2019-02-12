var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    task:  String,
    completed: {
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true
  }
);

var TodoModel = mongoose.model('TODO', todoSchema);

module.exports = TodoModel;