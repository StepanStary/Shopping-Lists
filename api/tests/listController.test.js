const {
  getAllLists,
  createList,
  getListItems,
  updateListName,
  deleteList,
  addItemToList,
  deleteItemFromList,
} = require('../controllers/listController');

let mockRequest;
let mockResponse;

// Mock database
let mockLists;

beforeEach(() => {
  mockLists = [
    { _id: '1', name: 'List 1', items: [] },
    { _id: '2', name: 'List 2', items: [] },
  ];

  mockRequest = {
    body: {},
    params: {},
  };

  mockResponse = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  };

  // Update the module's lists directly
  jest.resetModules();
  jest.mock('../controllers/listController', () => {
    const originalModule = jest.requireActual('../controllers/listController');
    return {
      ...originalModule,
      lists: mockLists,
    };
  });
});

describe('getAllLists', () => {
  it('should return all lists', () => {
    getAllLists(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith({ lists: mockLists });
  });
});

describe('createList', () => {
  it('should create a new list', () => {
    mockRequest.body = { name: 'New List' };
    createList(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'New List' })
    );
  });

  it('should handle invalid list name', () => {
    mockRequest.body = { name: '' };
    createList(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid list name' });
  });
});

describe('getListItems', () => {
  it('should return items for a specific list', () => {
    const listId = '1';
    mockRequest.params.id = listId;
    getListItems(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith({ items: [] });
  });

  it('should handle list not found', () => {
    const listId = 'nonexistent-id';
    mockRequest.params.id = listId;
    getListItems(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'List not found' });
  });
});

describe('updateListName', () => {
  it('should update the name of a list', () => {
    const listId = '1';
    const newName = 'Updated List';
    mockRequest.params.id = listId;
    mockRequest.body = { name: newName };
    updateListName(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({ _id: listId, name: newName })
    );
  });

  it('should handle invalid list name', () => {
    const listId = '1';
    const newName = 'Updated List';
    mockRequest.params.id = listId;
    mockRequest.body = { name: newName };
    updateListName(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid list name' });
  });

  it('should handle list not found', () => {
    const listId = 'nonexistent-id';
    const newName = 'Updated List';
    mockRequest.params.id = listId;
    mockRequest.body = { name: newName };
    updateListName(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'List not found' });
  });
});

describe('deleteList', () => {
  it('should delete a list', () => {
    const listId = '1';
    mockRequest.params.id = listId;
    deleteList(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'List deleted successfully' });
  });

  it('should handle list not found', () => {
    const listId = 'nonexistent-id';
    mockRequest.params.id = listId;
    deleteList(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'List not found' });
  });
});

describe('addItemToList', () => {
  it('should add an item to a list', () => {
    const listId = '1';
    const newItem = { item: 'New Item' };
    mockRequest.params.id = listId;
    mockRequest.body = newItem;
    addItemToList(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({ _id: expect.any(String), ...newItem })
    );
  });

  it('should handle invalid item', () => {
    const listId = '1';
    const newItem = { item: '' };
    mockRequest.params.id = listId;
    mockRequest.body = newItem;
    addItemToList(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid item' });
  });

  it('should handle list not found', () => {
    const listId = 'nonexistent-id';
    const newItem = { item: 'New Item' };
    mockRequest.params.id = listId;
    mockRequest.body = newItem;
    addItemToList(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'List not found' });
  });
});

describe('deleteItemFromList', () => {
  it('should delete an item from a list', () => {
    const listId = '1';
    const itemId = 'item-id';
    mockRequest.params.listId = listId;
    mockRequest.params.itemId = itemId;
    deleteItemFromList(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Item deleted successfully' });
  });

  it('should handle list not found', () => {
    const listId = 'nonexistent-id';
    const itemId = 'item-id';
    mockRequest.params.listId = listId;
    mockRequest.params.itemId = itemId;
    deleteItemFromList(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'List not found' });
  });
});
