#! /usr/bin/env node
 
console.log(
  'This script populates some test Users and Posts to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);
 
// Get arguments passed on command line
const userArgs = process.argv.slice(2);
 
const User = require("./models/user");
const Post = require("./models/post");
 
const users = [];
const posts = [];
 
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
 
const mongoDB = userArgs[0];
 
main().catch((err) => console.log(err));
 
async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createUsers();
  await createPosts();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}
 
// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function userCreate(index, first_name, last_name, email, role, password) {
  const user = new User({ first_name: first_name, last_name: last_name, email: email, role: role, password: password });
  await user.save();
  users[index] = user;
  console.log(`Added genre: ${first_name} ${last_name}`);
}
 
async function postCreate(index, user, amount_willing_to_pay, amount_willing_to_pay_currency, desired_amount_in_return, desired_amount_in_return_currency, additional_details) {
  const post = new Post({ user: user, amount_willing_to_pay: amount_willing_to_pay, amount_willing_to_pay_currency: amount_willing_to_pay_currency, desired_amount_in_return: desired_amount_in_return, desired_amount_in_return_currency: desired_amount_in_return_currency, additional_details: additional_details });
  await post.save();
  posts[index] = post;
  console.log(`Added post`);
}
 
async function createUsers() {
  console.log("Adding users");
  await Promise.all([
    userCreate(0, "John", "Wyne", "john.wyne@gmail.com", "Normal User", "Johnwyne1234#"),
    userCreate(1, "Kyle", "Kite", "kyle.kite@gmail.com", "Normal User", "kylekitE1234#"),
    userCreate(2, "Jesse", "Pinkman", "jesse.pinkman@gmail.com", "Admin User", "Jessepinkman1234#"),
    userCreate(3, "Joe", "Harvey", "joe.Harvey@gmail.com", "Normal User", "Joeharvey1234#"),
    userCreate(4, "Tommy", "Shelby", "tommy.shelby@gmail.com", "Admin User", "Tommyshelby1234#"),
  ]);
}
 
async function createPosts() {
  console.log("Adding posts");
  await Promise.all([
    postCreate(0, users[0], 1, "CAD", 60, "INR", "Also willing to accept Google conversion rate at the time of transaction."),
    postCreate(1, users[1], 2, "CAD", 120, "INR", "Also willing to accept Google conversion rate at the time of transaction."),
    postCreate(2, users[2], 1, "CAD", 6, "CNY", "Fix Conversoin Rate."),
    postCreate(3, users[3], 12, "CNY", 2, "CAD", "Open to offers."),
    postCreate(4, users[0], 1, "USD", 2, "CAD", "Open to offers."),
  ]);
}