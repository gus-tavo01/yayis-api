require('dotenv').config();
const getMockRes = require('../helpers/mockRes');
const { getMockReq } = require('@jest-mock/express');
const listsController = require('../../routes/lists/controller');
const ListModel = require('../../models/List');

jest.mock('../../models/List');

const res = getMockRes();

describe('Lists Controller GET', () => {
  test('When valid params are provided, expect response to be success', async () => {
    // Arange
    const userId = '61ad434c6a66c8fd8063cab8';
    const user = { id: userId };

    const req = getMockReq({ query: {}, params: { userId }, user });

    // mocks
    const lists = { docs: [] };
    ListModel.paginate.mockResolvedValue(lists);

    // Act
    const httpResponse = await listsController.get(req, res);

    // Assert
    expect(httpResponse).toMatchObject({
      statusCode: 200,
      statusMessage: 'Ok',
      payload: lists,
      errorMessage: null,
      validationErrors: [],
    });
  });

  // TODO:
  // 'When page param is invalid, expect validation errors'
  // 'When pageSize param is invalid, expect response to have validation errors'
  // 'When name param is invalid, expect response to have validation errors'
});
