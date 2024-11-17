const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const Post = require('../models/post');
const User = require('../models/user');
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;
var savedPost = null;
var user2 = null;

before(async () => {
    let user = new User({ first_name: 'Test', last_name:'User', email: 'testuser@example.com',  password: 'Snow1234#'});
    user2 = await user.save();
});

after(async () => {
    const mongoDB = "mongodb+srv://dpl190:rJk9CU79flrUVs7B@cluster0.mx1kcjl.mongodb.net/cs476_project?retryWrites=true&w=majority";
    await mongoose.connect(mongoDB);

    await Post.deleteOne({ _id: savedPost._id });
    await User.deleteOne({ _id: user2._id });
    await mongoose.connection.close();
});

describe('POST /api/savePost', () => {

    it('should create a new post with valid data', async () => {
        const postData = {
            post: {
                _id: 'PlaceHolder',
                user: user2,
                amount_willing_to_pay: 100,
                amount_willing_to_pay_currency: 'USD',
                desired_amount_in_return: 200,
                desired_amount_in_return_currency: 'CAD',
                additional_details: 'Test post'
            }
        };

        const res = await request(app)
            .post('/api/savePost')
            .send(postData);

        expect(res.status).to.equal(201);
        expect(res.body.success).to.be.true;
        expect(res.body.message).to.equal('Post Created/Edited Successfully');
        expect(res.body.post).to.have.property('_id');

        savedPost = res.body.post;
    });

    it('should return 400 if user ID is missing', async () => {
        const postData = {
            post: {
                _id: 'PlaceHolder',
                amount_willing_to_pay: 100,
                amount_willing_to_pay_currency: 'USD',
                desired_amount_in_return: 200,
                desired_amount_in_return_currency: 'USD',
                additional_details: 'Test post'
            }
        };

        const res = await request(app)
            .post('/api/savePost')
            .send(postData);

        expect(res.status).to.equal(400);
        expect(res.body.success).to.be.false;
        expect(res.body.message).to.equal('User ID is required');
    });

    it('should return 404 if post is not found during update', async () => {
        const postData = {
            post: {
                _id: new ObjectId(),
                user: user2,
                amount_willing_to_pay: 100,
                amount_willing_to_pay_currency: 'USD',
                desired_amount_in_return: 200,
                desired_amount_in_return_currency: 'USD',
                additional_details: 'Test post'
            }
        };

        const res = await request(app)
            .post('/api/savePost')
            .send(postData);

        expect(res.status).to.equal(404);
        expect(res.body.success).to.be.false;
        expect(res.body.message).to.equal('Post not found');
    });

    it('should update an existing post', async () => {
        const postData = {
            post: {
                _id: savedPost._id,
                user: user2,
                amount_willing_to_pay: 100,
                amount_willing_to_pay_currency: 'USD',
                desired_amount_in_return: 500,
                desired_amount_in_return_currency: 'INR',
                additional_details: 'Updated post'
            }
        };

        const res = await request(app)
            .post('/api/savePost')
            .send(postData);

        expect(res.status).to.equal(201);
        expect(res.body.success).to.be.true;
        expect(res.body.message).to.equal('Post Created/Edited Successfully');
        expect(res.body.post).to.have.property('_id');
        expect(res.body.post.amount_willing_to_pay).to.equal(postData.post.amount_willing_to_pay);
    });
});
