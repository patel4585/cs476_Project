const request = require('supertest');
const { expect } = require('chai');
const app = require('../app'); 
const User = require('../models/user');
const Post = require('../models/post');
const mongoose = require('mongoose');

let testUserId;

before(async () => {
  const testUser = new User({
    first_name: "Unit",
    last_name: "Test",
    email: "unittest@example.com",
    role: "Normal User",
    password: "testpassword",
  });

  const savedUser = await testUser.save();
  testUserId = savedUser._id;

  await Post.create([
    {
        user: testUserId,
        amount_willing_to_pay: 100,
        amount_willing_to_pay_currency: "USD",
        desired_amount_in_return: 150,
        desired_amount_in_return_currency: "CAD",
        additional_details: "Test post 1",
    },
    {
        user: testUserId,
        amount_willing_to_pay: 200,
        amount_willing_to_pay_currency: "USD",
        desired_amount_in_return: 300,
        desired_amount_in_return_currency: "CAD",
        additional_details: "Test post 2",
    },
  ]);
});

after(async () => {
    const mongoDB = "mongodb+srv://dpl190:rJk9CU79flrUVs7B@cluster0.mx1kcjl.mongodb.net/cs476_project?retryWrites=true&w=majority";
    await mongoose.connect(mongoDB);

    await Post.deleteMany({ user: testUserId });
    await User.deleteMany({ email: 'unittest@example.com' });
    await mongoose.connection.close();
});

describe("User Management Routes", () => {
  describe("GET /api/getAllUsers", () => {
    it("should return a list of all users", async () => {
        const res = await request(app).get("/api/getAllUsers");

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.be.greaterThan(0);

        const foundUser = res.body.find(user => user.email === "unittest@example.com");
        expect(foundUser).to.exist;
        expect(foundUser.first_name).to.equal("Unit");
        expect(foundUser.last_name).to.equal("Test");
    });
  });

  describe("DELETE /api/deleteUser", () => {
    it("should delete a user and their associated posts", async () => {
        const res = await request(app)
        .post("/api/deleteUser")
        .send({ userId: testUserId });

        expect(res.status).to.equal(200);
        expect(res.body.success).to.be.true;
        expect(res.body.message).to.equal("User Deleted Successfully");

        // Verifying user has been deleted
        const deletedUser = await User.findById(testUserId);
        expect(deletedUser).to.be.null;

        // Verifying posts associated with the user have been deleted
        const userPosts = await Post.find({ user: testUserId });
        expect(userPosts.length).to.equal(0);
    });
  });
});
