/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const mongoose = require('mongoose')
const Book = require('../models/bookSchema')
require('dotenv').config()
const MONGODB_CONNECTION_STRING = process.env.DB;
mongoose.set('useFindAndModify', false);

mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err))

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      Book.find({})
      .then((book) => res.json(book))

    })
    
    .post(function (req, res){
      var title = req.body.title;
      let comment = req.body.comment || []
      let commentCount = comment.length
      console.log(comment)
        const book = new Book({
            title:title,
            comment:comment, 
            commentCount:commentCount     
        })
        book.save((err, data) => {
            if (err) {
                console.log(err)
            } else {
                res.send(data)
            }
        })
    })
    
    .delete(function(req, res){
            Book.deleteMany({})
            .then(() => res.send('Deleted All'))

        });



  app.route('/api/books/:id')
    .get(function (req, res){
      var bookid = req.params.id;
      Book.find({_id:bookid})
      .then((book) => res.json(book))

    })


    
    .post(function(req, res){
      var bookid = req.params.id;
      var newComment = req.body.comment;

    Book.findOne({"_id":bookid})
        .then(book => Book.findOneAndUpdate({_id:bookid}, {$push: {"comment":newComment}, $set:{"commentCount":book.comment.length+1}}, {"new":true})
        .then(() => res.send('Updated')) )
    })
    
    .delete(function(req, res){
      var bookid = req.params.id;
       Book.deleteOne({_id:bookid})
       .then(() => res.send('Book Deleted'))
    });
  
};

