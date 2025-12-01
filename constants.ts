import { MenuItem, Category, Review, Offer, OrderHistoryItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // --- Starters ---
  {
    id: 1,
    name: "Chicken Alfaham",
    description: "Arabian style grilled chicken marinated in special spices, served with kuboos and garlic dip.",
    price: 18,
    category: Category.STARTER,
    imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    calories: 450
  },
  {
    id: 2,
    name: "Dragon Chicken",
    description: "Indo-Chinese specialty. Strips of chicken tossed in a spicy, sweet, and tangy sauce with cashews.",
    price: 15,
    category: Category.STARTER,
    imageUrl: "https://images.unsplash.com/photo-1626804475297-411dbe636d06?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    calories: 380
  },
  {
    id: 12,
    name: "Golden Fried Prawns",
    description: "Jumbo prawns batter-fried to a golden crisp, served with our signature sweet chili tartare sauce.",
    price: 22,
    category: Category.STARTER,
    imageUrl: "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    calories: 320
  },
  {
    id: 13,
    name: "Hummus with Spiced Lamb",
    description: "Creamy homemade hummus topped with sizzling pine nuts and minced lamb, served with warm pita.",
    price: 16,
    category: Category.STARTER,
    imageUrl: "https://images.unsplash.com/photo-1630409351241-e90e7f5e4784?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    calories: 410
  },
  {
    id: 17,
    name: "Paneer Tikka Skewers",
    description: "Cottage cheese cubes marinated in yogurt and tandoori spices, charcoal-grilled with bell peppers.",
    price: 14,
    category: Category.STARTER,
    imageUrl: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    calories: 290
  },

  // --- Mains ---
  {
    id: 3,
    name: "Signature Chicken Mandi",
    description: "Traditional Yemeni dish. Tender chicken steam-roasted with aromatic spices, served over flavorful basmati rice.",
    price: 25,
    category: Category.MAIN,
    imageUrl: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    calories: 850
  },
  {
    id: 4,
    name: "Mutton Juicy Mandi",
    description: "Succulent mutton slow-cooked to perfection, served with our secret spice-infused Mandi rice.",
    price: 32,
    category: Category.MAIN,
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    calories: 920
  },
  {
    id: 9,
    name: "Royal Lamb Shank Mandi",
    description: "A feast fit for a king. Whole lamb shank braised for 6 hours until fall-off-the-bone tender, served on royal rice.",
    price: 45,
    category: Category.MAIN,
    imageUrl: "https://images.unsplash.com/photo-1574653853027-5386907608dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    calories: 1100
  },
  {
    id: 11,
    name: "Mutton Madfoon",
    description: "Meat marinated in exotic spices, wrapped in foil/banana leaf and slow-cooked underground to retain all juices.",
    price: 34,
    category: Category.MAIN,
    imageUrl: "https://images.unsplash.com/photo-1606471191009-63994c53433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    calories: 950
  },
  {
    id: 10,
    name: "Peri Peri Alfaham",
    description: "Spicy twist on the classic. Charcoal grilled chicken brushed with our house-made spicy Peri Peri sauce.",
    price: 20,
    category: Category.MAIN,
    imageUrl: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    calories: 500
  },
  {
    id: 5,
    name: "Butter Chicken & Naan",
    description: "Rich creamy tomato gravy with tender chicken cubes, served with two butter naans.",
    price: 20,
    category: Category.MAIN,
    imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    calories: 750
  },
  {
    id: 18,
    name: "Grilled King Fish Platter",
    description: "Fresh King Fish steaks marinated in Arabic spices and grilled to perfection. Served with lemon garlic butter.",
    price: 28,
    category: Category.MAIN,
    imageUrl: "https://images.unsplash.com/photo-1533758488827-1a59648d86ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    calories: 600
  },

  // --- Desserts ---
  {
    id: 6,
    name: "Classic Kunafa",
    description: "Middle Eastern dessert made with shredded pastry soaked in syrup, layered with cheese and cream.",
    price: 14,
    category: Category.DESSERT,
    imageUrl: "https://images.unsplash.com/photo-1576506295286-5cda18df43e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    calories: 550
  },
  {
    id: 7,
    name: "Sizzling Brownie",
    description: "Hot walnut brownie served on a sizzler plate with vanilla ice cream and chocolate sauce.",
    price: 12,
    category: Category.DESSERT,
    imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    calories: 600
  },
  {
    id: 14,
    name: "Lotus Biscoff Milk Cake",
    description: "Ultra-moist sponge cake soaked in three kinds of milk, topped with Lotus Biscoff spread and crumbs.",
    price: 16,
    category: Category.DESSERT,
    imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    calories: 650
  },
  {
    id: 19,
    name: "Umm Ali",
    description: "Egyptian bread pudding with puff pastry, milk, cream, nuts, and raisins. Served warm.",
    price: 13,
    category: Category.DESSERT,
    imageUrl: "https://images.unsplash.com/photo-1616031037011-087000171abe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    calories: 480
  },

  // --- Drinks ---
  {
    id: 8,
    name: "Blue Lagoon Mojito",
    description: "Refreshing blue curaçao mocktail with mint, lemon, and soda.",
    price: 8,
    category: Category.DRINK,
    imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    calories: 140
  },
  {
    id: 15,
    name: "Saudi Champagne (Pitcher)",
    description: "The classic celebration drink. Apple juice, sparkling water, mint leaves, and chopped fruits.",
    price: 18,
    category: Category.DRINK,
    imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    calories: 220
  },
  {
    id: 16,
    name: "Signature Karak Tea",
    description: "Strong brewed tea with evaporated milk and cardamom. The perfect finish to a heavy meal.",
    price: 4,
    category: Category.DRINK,
    imageUrl: "https://images.unsplash.com/photo-1563911302283-d2bc129e7c1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    calories: 80
  }
];

export const REVIEWS: Review[] = [
  {
    id: 1,
    user: "Sarah Jenkins",
    rating: 5,
    comment: "The Chicken Mandi is absolutely authentic! Reminds me of my trip to Dubai.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    user: "Rahul Mehta",
    rating: 4,
    comment: "Great ambience and the Kunafa is a must-try. Delivery was super fast.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    user: "Aisha Khan",
    rating: 5,
    comment: "Best multi-cuisine restaurant in town. The staff is very polite.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

export const OFFERS: Offer[] = [
  {
    id: 1,
    title: "Weekend Feast",
    description: "Get 20% off on all Family Platters this weekend!",
    code: "FEAST20",
    discount: "20% OFF",
    color: "from-orange-500 to-red-600"
  },
  {
    id: 2,
    title: "First Order",
    description: "Flat $50 off on your first app order.",
    code: "ALPHA50",
    discount: "$50 OFF",
    color: "from-green-600 to-emerald-800"
  }
];

export const MOCK_PAST_ORDERS: OrderHistoryItem[] = [
  {
    id: "#ORD-9921",
    date: "Oct 24, 2024",
    items: ["Chicken Mandi (x2)", "Blue Lagoon", "Kunafa"],
    total: 72.00,
    status: "Delivered",
    pointsEarned: 720
  },
  {
    id: "#ORD-8842",
    date: "Oct 12, 2024",
    items: ["Butter Chicken", "Garlic Naan (x2)", "Coke"],
    total: 45.50,
    status: "Delivered",
    pointsEarned: 455
  }
];

export const SYSTEM_INSTRUCTION = `
You are the AI Concierge for 'Alpha Mandi Multi Cuisine Restaurant'. 
Your tone is welcoming, sophisticated, and knowledgeable about Arabian and Multi-Cuisine dishes.
You have access to the following menu:
${JSON.stringify(MENU_ITEMS)}

Your goal is to assist customers by:
1. Recommending dishes, especially highlighting our signature Mandi and Alfaham.
2. Explaining what 'Mandi' is (a traditional Yemeni dish with meat and rice cooked in a pit) if asked.
3. Suggesting drinks to pair with spicy food.
4. Informing them about our latest offers: Weekend Feast (20% off) and First Order ($50 off).

Keep responses concise and elegant.
`;