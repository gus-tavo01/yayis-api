require('dotenv').config();
const database = require('../../config/database');
const ListModel = require('../../models/List');

beforeAll(() => {
  database.connect();
});

afterAll(() => {
  database.disconnect();
});

describe('List Model CRUD', () => {
  test('When valid list name with empty todos is provided, expect to be added', async () => {
    // Arrange
    const listData = { name: 'Testing list' };
    const patch = { name: 'Updated' };

    // Act
    const newList = await new ListModel(listData).save();
    await ListModel.findByIdAndUpdate(newList.id, patch);
    const updated = await ListModel.findById(newList.id);
    await ListModel.findByIdAndDelete(newList.id);
    const removed = await ListModel.findById(newList.id);

    // Assert
    expect(newList).toMatchObject(listData);
    expect(updated).toMatchObject(patch);
    expect(removed).toBeNull();
  });
});

// describe('List Model todo CRUD', () => {});
