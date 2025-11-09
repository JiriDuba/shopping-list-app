export const currentUser = "ty"; // přihlášený uživatel

export const shoppingLists = [
  { id: 1, name: "Nákup Lidl", owner: "ty", archived: false, members: ["ty", "jana"] },
  { id: 2, name: "Vánoce 2025", owner: "ty", archived: false, members: ["ty"] },
  { id: 3, name: "Stará Tesco", owner: "jana", archived: true, members: ["jana", "ty"] },
  { id: 4, name: "Grilovačka", owner: "ty", archived: false, members: ["ty", "jana", "pep"] },
];

export const listItems = [
  { id: 1, listId: 1, title: "Mléko", resolved: false },
  { id: 2, listId: 1, title: "Rohlíky", resolved: true },
  { id: 3, listId: 1, title: "Máslo", resolved: false },
  { id: 4, listId: 2, title: "Dárky", resolved: false },
];