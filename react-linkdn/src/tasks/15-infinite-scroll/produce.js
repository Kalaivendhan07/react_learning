const PRODUCE = [
  ['Tomato', 'Thakkali', '🍅', 30, 'Vegetable'],
  ['Onion', 'Vengayam', '🧅', 40, 'Vegetable'],
  ['Potato', 'Urulaikizhangu', '🥔', 35, 'Vegetable'],
  ['Carrot', 'Carrot', '🥕', 60, 'Vegetable'],
  ['Brinjal', 'Kathirikai', '🍆', 45, 'Vegetable'],
  ['Green chilli', 'Pachai milagai', '🌶️', 80, 'Vegetable'],
  ['Garlic', 'Poondu', '🧄', 200, 'Vegetable'],
  ['Ginger', 'Inji', '🫚', 120, 'Vegetable'],
  ['Cucumber', 'Vellarikai', '🥒', 40, 'Vegetable'],
  ['Cabbage', 'Muttaikose', '🥬', 30, 'Vegetable'],
  ['Cauliflower', 'Cauliflower', '🥦', 50, 'Vegetable'],
  ['Beans', 'Beans', '🫛', 90, 'Vegetable'],
  ['Ladies finger', 'Vendaikai', '🥒', 50, 'Vegetable'],
  ['Drumstick', 'Murungaikai', '🥢', 100, 'Vegetable'],
  ['Bitter gourd', 'Pavakkai', '🥒', 60, 'Vegetable'],
  ['Bottle gourd', 'Suraikai', '🥒', 35, 'Vegetable'],
  ['Snake gourd', 'Pudalangai', '🥒', 40, 'Vegetable'],
  ['Ridge gourd', 'Peerkangai', '🥒', 55, 'Vegetable'],
  ['Ash gourd', 'Poosanikai', '🎃', 30, 'Vegetable'],
  ['Pumpkin', 'Parangikai', '🎃', 35, 'Vegetable'],
  ['Beetroot', 'Beetroot', '🫜', 45, 'Vegetable'],
  ['Radish', 'Mullangi', '🥕', 40, 'Vegetable'],
  ['Sweet potato', 'Sakkaraivalli kizhangu', '🍠', 60, 'Vegetable'],
  ['Tapioca', 'Maravalli kizhangu', '🍠', 40, 'Vegetable'],
  ['Yam', 'Senaikizhangu', '🥔', 70, 'Vegetable'],
  ['Raw banana', 'Vazhakkai', '🍌', 50, 'Vegetable'],
  ['Banana flower', 'Vazhaipoo', '🌸', 40, 'Vegetable'],
  ['Coconut', 'Thengai', '🥥', 35, 'Vegetable'],
  ['Small onion', 'Chinna vengayam', '🧅', 70, 'Vegetable'],
  ['Capsicum', 'Kudai milagai', '🫑', 80, 'Vegetable'],
  ['Coriander leaves', 'Kothamalli', '🌿', 20, 'Vegetable'],
  ['Curry leaves', 'Karuveppilai', '🌿', 15, 'Vegetable'],
  ['Mint leaves', 'Pudina', '🌿', 20, 'Vegetable'],
  ['Spinach', 'Keerai', '🥬', 25, 'Vegetable'],
  ['Broad beans', 'Avarakkai', '🫛', 70, 'Vegetable'],
  ['Cluster beans', 'Kothavarangai', '🫛', 60, 'Vegetable'],
  ['Green peas', 'Pattani', '🫛', 120, 'Vegetable'],
  ['Mushroom', 'Kaalaan', '🍄', 180, 'Vegetable'],
  ['Sweet corn', 'Makkacholam', '🌽', 40, 'Vegetable'],
  ['Lemon', 'Elumichai', '🍋', 60, 'Vegetable'],
  ['Raw mango', 'Mangai', '🥭', 80, 'Vegetable'],
  ['Chow chow', 'Chow chow', '🥒', 40, 'Vegetable'],
  ['Banana', 'Vazhaipazham', '🍌', 50, 'Fruit'],
  ['Apple', 'Apple', '🍎', 180, 'Fruit'],
  ['Mango', 'Mambazham', '🥭', 120, 'Fruit'],
  ['Orange', 'Orange', '🍊', 90, 'Fruit'],
  ['Grapes', 'Thiratchai', '🍇', 100, 'Fruit'],
  ['Pomegranate', 'Madhulai', '🍎', 160, 'Fruit'],
  ['Papaya', 'Pappali', '🍈', 40, 'Fruit'],
  ['Guava', 'Koyya', '🍐', 60, 'Fruit'],
  ['Watermelon', 'Tharbusani', '🍉', 25, 'Fruit'],
  ['Pineapple', 'Annasi', '🍍', 70, 'Fruit'],
  ['Jackfruit', 'Palapazham', '🍈', 60, 'Fruit'],
  ['Sapota', 'Sapota', '🥔', 80, 'Fruit'],
  ['Custard apple', 'Seethapazham', '🍏', 120, 'Fruit'],
  ['Muskmelon', 'Mulampazham', '🍈', 50, 'Fruit'],
  ['Strawberry', 'Strawberry', '🍓', 300, 'Fruit'],
  ['Kiwi', 'Kiwi', '🥝', 240, 'Fruit'],
  ['Dates', 'Pericham pazham', '🟤', 280, 'Fruit'],
  ['Amla', 'Nellikai', '🟢', 90, 'Fruit'],
];

export function fetchProduce(skip, limit) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.1) {
        reject(new Error('Network problem, could not load items'));
        return;
      }
      const items = PRODUCE.slice(skip, skip + limit).map(([name, tamil, icon, price, type], i) => ({
        id: skip + i + 1,
        name,
        tamil,
        icon,
        price,
        type,
      }));
      resolve({ items, total: PRODUCE.length });
    }, 700);
  });
}
