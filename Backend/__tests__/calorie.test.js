import request from 'supertest';
import app from '../server'; 
import mongoose from 'mongoose';
import User from '../models/User.js';
import CalorieEntry from '../models/CalorieEntry.js';

beforeAll(async () => {
  // Connect to the test database
  await mongoose.connect(process.env.MONGO_TEST_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  // Close the database connection
  await mongoose.connection.close();
});

describe('Calorie Entry API', () => {
  let token;
  let userId;

  beforeAll(async () => {
    // Create a test user and get the token
    const user = await User.create({ name: 'Test User', email: 'test@example.com', password: 'password' });
    userId = user._id;
    token = 'your_jwt_token'; // Generate a JWT token for the test user
  });

  afterEach(async () => {
    // Clean up the database after each test
    await CalorieEntry.deleteMany({});
    await User.deleteMany({});
  });

  test('POST /user/food - should add a food entry', async () => {
    const response = await request(app)
      .post('/api/user/food')
      .set('Authorization', `Bearer ${token}`)
      .send({ item: 'Apple', calories: 95 });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Food entry added');
    expect(response.body.entry.item).toBe('Apple');
  });

  test('POST /user/exercise - should add an exercise entry', async () => {
    const response = await request(app)
      .post('/api/user/exercise')
      .set('Authorization', `Bearer ${token}`)
      .send({ item: 'Running', calories: 300 });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Exercise entry added');
    expect(response.body.entry.item).toBe('Running');
  });

  test('GET /user/calories - should get all calorie entries and totals', async () => {
    await CalorieEntry.create({ userId, item: 'Apple', calories: 95, type: 'food' });
    await CalorieEntry.create({ userId, item: 'Running', calories: 300, type: 'exercise' });

    const response = await request(app)
      .get('/api/user/calories')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.totalConsumed).toBe(95);
    expect(response.body.totalBurned).toBe(300);
  });

  test('DELETE /user/calories/:id - should delete a calorie entry', async () => {
    const entry = await CalorieEntry.create({ userId, item: 'Apple', calories: 95, type: 'food' });

    const response = await request(app)
      .delete(`/api/user/calories/${entry._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Entry deleted');
  });

  test('POST /user/water - should add a water entry', async () => {
    const response = await request(app)
      .post('/api/user /water')
      .set('Authorization', `Bearer ${token}`)
      .send({ amount: 500 }); // Assuming the water entry is measured in milliliters

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Water entry added');
    expect(response.body.entry.amount).toBe(500);
  });
}); 
