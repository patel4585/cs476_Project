const request = require('supertest');
const { expect } = require('chai');
const app = require('../app'); 
const User = require('../models/user');
const mongoose = require('mongoose');

var user = null;
var savedUser00 = null;

before(async () => {
    if (mongoose.connection.readyState !== 1) {
        throw new Error('MongoDB connection failed');
    }
});

after(async () => {
    const mongoDB = "mongodb+srv://dpl190:rJk9CU79flrUVs7B@cluster0.mx1kcjl.mongodb.net/cs476_project?retryWrites=true&w=majority";
    await mongoose.connect(mongoDB);

    await User.deleteOne({ email: 'test@example.com' });
    await mongoose.connection.close();
});

describe('Auth Routes', () => {
    describe('POST /api/signUp', () => {
        it('should create a new user', async () => {
          const newUser = {
            user: {
              first_name: 'Unit',
              last_name: 'Testt',
              email: 'test@example.com',
              role: 'Normal User',
              password: 'passwordtest',
            },
          };
    
          const res = await request(app)
            .post('/api/signUp')
            .send(newUser);
    
          expect(res.status).to.equal(201);
          expect(res.body.success).to.be.true;
          expect(res.body.message).to.equal('User Account Created Successfully');
    
          // Checking if the user exists in the database
          const savedUser = await User.findOne({ email: 'test@example.com' });
          expect(savedUser).to.not.be.null;
          savedUser00 = savedUser;
        });
      });

    describe('POST /api/login', () => {
        it('should login the user with correct credentials', async () => {
            const res = await request(app)
            .post('/api/login')
            .send({ email: 'test@example.com', password: 'passwordtest' });

            expect(res.status).to.equal(200);
            expect(res.body.success).to.be.true;
            expect(res.body.user).to.have.property('_id');
        });

        it('should return 404 if user not found', async () => {
            const res = await request(app)
            .post('/api/login')
            .send({ email: 'nosuchuser@example.com', password: 'testpassword' });

            expect(res.status).to.equal(404);
            expect(res.body.success).to.be.false;
            expect(res.body.message).to.equal('User not found');
        });

        it('should return 404 if incorrect password', async () => {
            const res = await request(app)
            .post('/api/login')
            .send({ email: 'test@example.com', password: 'wrongpassword' });

            expect(res.status).to.equal(404);
            expect(res.body.success).to.be.false;
            expect(res.body.message).to.equal('Incorrect password');
        });
    });

    describe("POST /api/profileUpdate", () => {
      it("should update the user's profile successfully", async () => {
        const updatedProfile = {
          firstName: "Updated",
          lastName: "Name",
          _id: savedUser00._id,
        };
  
        const res = await request(app).post("/api/profileUpdate").send(updatedProfile);
  
        expect(res.status).to.equal(200);
        expect(res.body.success).to.be.true;
        expect(res.body.user).to.have.property('_id', savedUser00._id.toString());
        expect(res.body.user.first_name).to.equal("Updated");
        expect(res.body.user.last_name).to.equal("Name");
  
        // Verify the user is updated in the database
        const updatedUser = await User.findById(savedUser00._id);
        expect(updatedUser.first_name).to.equal("Updated");
        expect(updatedUser.last_name).to.equal("Name");
      });
  
      it("should return 404 if the user does not exist", async () => {
        const res = await request(app).post("/api/profileUpdate").send({
          _id: new mongoose.Types.ObjectId(), // Random non-existent ID
          firstName: "Does",
          lastName: "Not Exist",
        });
  
        expect(res.status).to.equal(404);
        expect(res.body.success).to.be.false;
        expect(res.body.message).to.equal("User not found");
      });
    });
});
