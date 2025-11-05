// src/data/mockData.js
export const MOCK_LISTS = [
  {
    id: 'list1',
    name: 'Můj první nákup',
    ownerId: 'user1',
    memberIds: ['user1', 'user2'],
    archived: false,
    items: [
      { id: 'i1', name: 'Rohlíky', resolved: false, addedBy: 'user1' },
      { id: 'i2', name: 'Máslo', resolved: false, addedBy: 'user1' },
    ],
  },
  {
    id: 'list2',
    name: 'Archivovaný nákup',
    ownerId: 'user1',
    memberIds: ['user1'],
    archived: true,
    items: [],
  },
];

export const CURRENT_USER_ID = 'user1';