import { shoppingLists as initialLists, listItems as initialItems } from '../data/fakeData';

const USE_MOCK = true;

// Simulace "databáze" v paměti prohlížeče
// (aby nám fungovalo přidávání/mazání během sezení, i když se to po refreshi ztratí)
let mockLists = [...initialLists];
let mockItems = [...initialItems];

// Pomocná funkce pro simulaci zpoždění serveru.
const simulateDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// --- MOCK API IMPLEMENTACE ---
const mockApi = {
  // 1. Získání všech seznamů (UPRAVENO pro grafy)
  getLists: async () => {
    await simulateDelay();
    // Pro každý seznam spočítáme, kolik má v mockItems položek
    return mockLists.map(list => ({
      ...list,
      itemsCount: mockItems.filter(item => item.listId === list.id).length
    }));
  },

  // 2. Vytvoření seznamu
  createList: async (newList) => {
    await simulateDelay();
    const listWithId = { ...newList, id: Date.now() }; // Generujeme ID
    mockLists = [listWithId, ...mockLists];
    return listWithId;
  },

  // 3. Smazání seznamu
  deleteList: async (id) => {
    await simulateDelay();
    mockLists = mockLists.filter(list => list.id !== id);
    return true; // Úspěch
  },

  // 4. Aktualizace seznamu (např. archivace, změna názvu, změna členů)
  updateList: async (updatedList) => {
    await simulateDelay();
    mockLists = mockLists.map(list => list.id === updatedList.id ? updatedList : list);
    return updatedList;
  },

  // 5. Získání detailu seznamu (včetně ověření existence)
  getListById: async (id) => {
    await simulateDelay();
    const list = mockLists.find(l => l.id === id);
    if (!list) throw new Error("Seznam nenalezen");
    return list;
  },

  // --- POLOŽKY (ITEMS) ---

  // 6. Získání položek pro konkrétní seznam
  getItems: async (listId) => {
    await simulateDelay();
    return mockItems.filter(item => item.listId === listId);
  },

  // 7. Přidání položky
  createItem: async (item) => {
    await simulateDelay();
    const newItem = { ...item, id: Date.now() };
    mockItems = [...mockItems, newItem];
    return newItem;
  },

  // 8. Změna položky (toggle resolved)
  updateItem: async (updatedItem) => {
    await simulateDelay();
    mockItems = mockItems.map(item => item.id === updatedItem.id ? updatedItem : item);
    return updatedItem;
  },

  // 9. Smazání položky
  deleteItem: async (itemId) => {
    await simulateDelay();
    mockItems = mockItems.filter(item => item.id !== itemId);
    return true;
  }
};

// --- REAL API (Zatím prázdné nebo placeholder) ---
const realApi = {
  getLists: async () => { throw new Error("Server not implemented yet"); },
  // ... další metody
};

// Exportujeme podle nastavení
export default USE_MOCK ? mockApi : realApi;