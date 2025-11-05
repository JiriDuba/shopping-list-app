// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShoppingListOverview from './pages/ShoppingListOverview';
import ShoppingListDetail from './pages/ShoppingListDetail';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<ShoppingListOverview />} />
          <Route path="/shopping-lists/:id" element={<ShoppingListDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;