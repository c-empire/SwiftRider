// const request = require('supertest');
// const app = require('../app'); // Adjust if needed

// describe('Auth API', () => {
//   it('should signup a user', async () => {
//     const res = await request(app)
//       .post('/api/auth/signup')
//       .send({
//         username: 'testuser',
//         email: 'test@example.com',
//         password: 'password',
//         role: 'customer'
//       });
//     expect(res.statusCode).toEqual(201);
//   });
// });



const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});


describe('Auth Tests', () => {
  it('should connect to MongoDB Memory Server', async () => {
    expect(mongoose.connection.readyState).toBe(1); // 1 means connected
  });
});

