import { 
  users, type User, type InsertUser,
  products, type Product, type InsertProduct,
  cartItems, type CartItem, type InsertCartItem,
  practitioners, type Practitioner, type InsertPractitioner,
  doshaQuizQuestions, type DoshaQuizQuestion, type InsertDoshaQuizQuestion
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Product methods
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProductsByDoshaType(doshaType: string): Promise<Product[]>;
  getBestsellerProducts(): Promise<Product[]>;
  getNewProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Cart methods
  getCartItems(userId: number): Promise<CartItem[]>;
  getCartItemWithDetails(userId: number): Promise<(CartItem & { product: Product })[]>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<boolean>;

  // Practitioner methods
  getAllPractitioners(): Promise<Practitioner[]>;
  getPractitionerById(id: number): Promise<Practitioner | undefined>;
  createPractitioner(practitioner: InsertPractitioner): Promise<Practitioner>;

  // Dosha quiz methods
  getAllDoshaQuizQuestions(): Promise<DoshaQuizQuestion[]>;
  getDoshaQuizQuestionById(id: number): Promise<DoshaQuizQuestion | undefined>;
  createDoshaQuizQuestion(question: InsertDoshaQuizQuestion): Promise<DoshaQuizQuestion>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private cartItems: Map<number, CartItem>;
  private practitioners: Map<number, Practitioner>;
  private doshaQuizQuestions: Map<number, DoshaQuizQuestion>;

  private userId: number;
  private productId: number;
  private cartItemId: number;
  private practitionerId: number;
  private questionId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.practitioners = new Map();
    this.doshaQuizQuestions = new Map();

    this.userId = 1;
    this.productId = 1;
    this.cartItemId = 1;
    this.practitionerId = 1;
    this.questionId = 1;

    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Initial products
    const productData: InsertProduct[] = [
      // Face Products
      {
        name: "Rose Petal Cleanser",
        description: "Gentle cleanser infused with rose petals and aloe vera for sensitive skin.",
        price: 34,
        category: "face_cleanser",
        doshaType: "pitta",
        imageUrl: "https://images.unsplash.com/photo-1556228578-8d89313c5489",
        inStock: true,
        isBestseller: true,
        isNew: false,
        rating: 4.8
      },
      {
        name: "Turmeric Brightening Mask",
        description: "Illuminating face mask with turmeric and saffron for radiant skin.",
        price: 45,
        category: "face_mask",
        doshaType: "pitta",
        imageUrl: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273",
        inStock: true,
        isBestseller: false,
        isNew: true,
        rating: 4.7
      },
      {
        name: "Neem Purifying Serum",
        description: "Clarifying serum with neem and tea tree for acne-prone skin.",
        price: 52,
        category: "face_serum",
        doshaType: "pitta",
        imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b",
        inStock: true,
        isBestseller: false,
        isNew: true,
        rating: 4.6
      },
      {
        name: "Almond Night Cream",
        description: "Rich night cream with sweet almond oil and shea butter.",
        price: 48,
        category: "face_moisturizer",
        doshaType: "vata",
        imageUrl: "https://images.unsplash.com/photo-1612532774276-cfa73aaa21b3",
        inStock: true,
        isBestseller: true,
        isNew: false,
        rating: 4.9
      },
      // Hair Products
      {
        name: "Hibiscus Hair Mask",
        description: "Deep conditioning mask with hibiscus and coconut for dry hair.",
        price: 38,
        category: "hair_treatment",
        doshaType: "vata",
        imageUrl: "https://images.unsplash.com/photo-1526947425960-945c6e72858f",
        inStock: true,
        isBestseller: true,
        isNew: false,
        rating: 4.8
      },
      {
        name: "Bhringraj Hair Oil",
        description: "Traditional hair growth oil with bhringraj and amla.",
        price: 42,
        category: "hair_oil",
        doshaType: "pitta",
        imageUrl: "https://images.unsplash.com/photo-1585751119414-ef2636f8adf1",
        inStock: true,
        isBestseller: false,
        isNew: true,
        rating: 4.7
      },
      {
        name: "Herbal Hair Cleanser",
        description: "Gentle cleansing powder with shikakai and reetha.",
        price: 28,
        category: "hair_cleanser",
        doshaType: "kapha",
        imageUrl: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d",
        inStock: true,
        isBestseller: false,
        isNew: true,
        rating: 4.5
      },
      {
        name: "Scalp Treatment Serum",
        description: "Intensive scalp treatment with neem and rosemary.",
        price: 46,
        category: "hair_treatment",
        doshaType: "pitta",
        imageUrl: "https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d",
        inStock: true,
        isBestseller: true,
        isNew: false,
        rating: 4.6
      },
      // Body Products
      {
        name: "Lavender Body Oil",
        description: "Calming body oil with lavender and sweet almond.",
        price: 36,
        category: "body_oil",
        doshaType: "vata",
        imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b",
        inStock: true,
        isBestseller: true,
        isNew: false,
        rating: 4.8
      },
      {
        name: "Sandalwood Body Butter",
        description: "Rich body butter with sandalwood and shea.",
        price: 42,
        category: "body_butter",
        doshaType: "vata",
        imageUrl: "https://images.unsplash.com/photo-1612532774276-cfa73aaa21b3",
        inStock: true,
        isBestseller: false,
        isNew: true,
        rating: 4.7
      },
      {
        name: "Neem Body Scrub",
        description: "Purifying body scrub with neem and walnut shells.",
        price: 32,
        category: "body_scrub",
        doshaType: "kapha",
        imageUrl: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d",
        inStock: true,
        isBestseller: false,
        isNew: true,
        rating: 4.6
      },
      {
        name: "Rose Body Lotion",
        description: "Hydrating body lotion with rose and aloe vera.",
        price: 38,
        category: "body_lotion",
        doshaType: "pitta",
        imageUrl: "https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d",
        inStock: true,
        isBestseller: true,
        isNew: false,
        rating: 4.9
      },
      // Wellness Products
      {
        name: "Ashwagandha Tablets",
        description: "Stress-relief supplements with organic ashwagandha.",
        price: 48,
        category: "wellness_supplement",
        doshaType: "tri-dosha",
        imageUrl: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843",
        inStock: true,
        isBestseller: true,
        isNew: false,
        rating: 4.9
      },
      {
        name: "Triphala Powder",
        description: "Digestive wellness powder with three fruits.",
        price: 32,
        category: "wellness_supplement",
        doshaType: "tri-dosha",
        imageUrl: "https://images.unsplash.com/photo-1597076545399-9dd44c050a17",
        inStock: true,
        isBestseller: false,
        isNew: true,
        rating: 4.7
      },
      {
        name: "Chyawanprash",
        description: "Traditional immunity boosting formula.",
        price: 45,
        category: "wellness_supplement",
        doshaType: "tri-dosha",
        imageUrl: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843",
        inStock: true,
        isBestseller: true,
        isNew: false,
        rating: 4.8
      },
      {
        name: "Stress Relief Tea",
        description: "Calming blend with holy basil and chamomile.",
        price: 24,
        category: "wellness_tea",
        doshaType: "vata",
        imageUrl: "https://images.unsplash.com/photo-1597076545399-9dd44c050a17",
        inStock: true,
        isBestseller: false,
        isNew: true,
        rating: 4.6
      },
        // Cleansers
        {
          name: "Invigorating Clay Cleanser",
          description: "Energizing cleanser for Kapha skin with purifying clay and stimulating herbs.",
          price: 38,
          category: "face_cleanser",
          doshaType: "kapha",
          imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b",
          inStock: true,
          isBestseller: false,
          isNew: true,
          rating: 5
        },
        {
          name: "Warming Spice Cleanser",
          description: "Stimulating cleanser with ginger and black pepper to invigorate Kapha skin.",
          price: 42,
          category: "face_cleanser",
          doshaType: "kapha",
          imageUrl: "https://images.unsplash.com/photo-1616004667892-d348f7349d39",
          inStock: true,
          isBestseller: false,
          isNew: true,
          rating: 4.7
        },
        // Moisturizers
        {
          name: "Lightweight Gel Moisturizer",
          description: "Oil-free gel moisturizer perfect for Kapha skin types. Hydrates without heaviness.",
          price: 45,
          category: "face_moisturizer",
          doshaType: "kapha",
          imageUrl: "https://images.unsplash.com/photo-1617897903246-719242758050",
          inStock: true,
          isBestseller: false,
          isNew: true,
          rating: 4.5
        },
        {
          name: "Balancing Day Cream",
          description: "Light, non-greasy day cream with tulsi and neem for Kapha balance.",
          price: 48,
          category: "face_moisturizer",
          doshaType: "kapha",
          imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be",
          inStock: true,
          isBestseller: true,
          isNew: false,
          rating: 4.9
        },
        // Serums
        {
          name: "Clarifying Herbal Serum",
          description: "Potent blend of astringent herbs to balance and purify Kapha skin.",
          price: 52,
          category: "face_serum",
          doshaType: "kapha",
          imageUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
          inStock: true,
          isBestseller: false,
          isNew: true,
          rating: 4.8
        },
        {
          name: "Brightening Complex Serum",
          description: "Concentrated serum with triphala and vitamin C to brighten dull Kapha skin.",
          price: 58,
          category: "face_serum",
          doshaType: "kapha",
          imageUrl: "https://images.unsplash.com/photo-1620756236308-65c3ef5d25f3",
          inStock: true,
          isBestseller: true,
          isNew: true,
          rating: 4.9
        },
        // Masks
        {
          name: "Detoxifying Clay Mask",
          description: "Deep-cleansing mask with kaolin clay and warming spices for Kapha skin.",
          price: 48,
          category: "face_mask",
          doshaType: "kapha",
          imageUrl: "https://images.unsplash.com/photo-1608248544136-646675a43a38",
          inStock: true,
          isBestseller: true,
          isNew: false,
          rating: 4.9
        },
        {
          name: "Exfoliating Enzyme Mask",
          description: "Enzymatic mask with papaya and pineapple to gently exfoliate Kapha skin.",
          price: 46,
          category: "face_mask",
          doshaType: "kapha",
          imageUrl: "https://images.unsplash.com/photo-1614159102346-8c5239719ae3",
          inStock: true,
          isBestseller: false,
          isNew: true,
          rating: 4.6
        },
      {
        name: "Balancing Facial Cleansing Oil",
        description: "Perfect for Pitta dosha. Calms and purifies.",
        price: 42,
        category: "face",
        doshaType: "pitta",
        imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b",
        inStock: true,
        isBestseller: true,
        isNew: false,
        rating: 5
      },
      {
        name: "Nourishing Hair Oil Elixir",
        description: "Rich in herbs to strengthen Vata hair types.",
        price: 36,
        category: "hair",
        doshaType: "vata",
        imageUrl: "https://images.unsplash.com/photo-1617897903246-719242758050",
        inStock: true,
        isBestseller: false,
        isNew: true,
        rating: 4
      },
      {
        name: "Grounding Body Butter",
        description: "Deep moisture for Kapha types. Invigorating.",
        price: 48,
        category: "body",
        doshaType: "kapha",
        imageUrl: "https://images.unsplash.com/photo-1608248544136-646675a43a38",
        inStock: true,
        isBestseller: false,
        isNew: false,
        rating: 5
      },
      {
        name: "Tri-Dosha Balance Supplements",
        description: "Daily adaptogens for all constitution types.",
        price: 54,
        category: "wellness",
        doshaType: "tri-dosha",
        imageUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
        inStock: true,
        isBestseller: false,
        isNew: false,
        rating: 5
      }
    ];

    // Add more products for each category
    for (const product of productData) {
      this.createProduct(product);
    }

    // Initial practitioners
    const practitionerData: InsertPractitioner[] = [
      {
        name: "Dr. Amrita Patel",
        title: "Ayurvedic Physician",
        description: "Specializes in women's health, skin conditions, and stress management through Ayurvedic principles.",
        imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
        price: 120,
        duration: 60
      },
      {
        name: "Dr. Raj Sharma",
        title: "Holistic Nutritionist",
        description: "Expert in digestive disorders, metabolic health, and dosha-specific dietary protocols.",
        imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d",
        price: 95,
        duration: 45
      },
      {
        name: "Maya Johnson",
        title: "Wellness Coach",
        description: "Focuses on lifestyle optimization, stress reduction, and mind-body practices for balance.",
        imageUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
        price: 85,
        duration: 60
      }
    ];

    for (const practitioner of practitionerData) {
      this.createPractitioner(practitioner);
    }

    // Initial dosha quiz questions
    const quizQuestionsData: InsertDoshaQuizQuestion[] = [
      {
        question: "My body frame is generally:",
        vataOption: "Slim, I find it difficult to gain weight",
        pittaOption: "Medium, with good muscle tone",
        kaphaOption: "Larger, with a tendency to gain weight"
      },
      {
        question: "My skin tends to be:",
        vataOption: "Dry, rough, or thin",
        pittaOption: "Warm, reddish, sensitive",
        kaphaOption: "Thick, oily, cool"
      },
      {
        question: "When stressed, I tend to:",
        vataOption: "Feel anxious or worried",
        pittaOption: "Become irritable or frustrated",
        kaphaOption: "Withdraw or become stubborn"
      }
    ];

    for (const question of quizQuestionsData) {
      this.createDoshaQuizQuestion(question);
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id, doshaType: undefined };
    this.users.set(id, user);
    return user;
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category
    );
  }

  async getProductsByDoshaType(doshaType: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.doshaType === doshaType || product.doshaType === 'tri-dosha'
    );
  }

  async getBestsellerProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.isBestseller
    );
  }

  async getNewProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.isNew
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  // Cart methods
  async getCartItems(userId: number): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      (item) => item.userId === userId
    );
  }

  async getCartItemWithDetails(userId: number): Promise<(CartItem & { product: Product })[]> {
    const items = await this.getCartItems(userId);
    return items.map(item => {
      const product = this.products.get(item.productId);
      if (!product) {
        throw new Error(`Product with id ${item.productId} not found`);
      }
      return { ...item, product };
    });
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    // Check if the item is already in the cart
    const existingItem = Array.from(this.cartItems.values()).find(
      (item) => item.userId === insertCartItem.userId && item.productId === insertCartItem.productId
    );

    if (existingItem) {
      // Update quantity
      return this.updateCartItem(existingItem.id, existingItem.quantity + insertCartItem.quantity) as Promise<CartItem>;
    }

    // Add new item
    const id = this.cartItemId++;
    const cartItem: CartItem = { ...insertCartItem, id };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const cartItem = this.cartItems.get(id);
    if (!cartItem) return undefined;

    const updatedItem = { ...cartItem, quantity };
    this.cartItems.set(id, updatedItem);
    return updatedItem;
  }

  async removeFromCart(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  // Practitioner methods
  async getAllPractitioners(): Promise<Practitioner[]> {
    return Array.from(this.practitioners.values());
  }

  async getPractitionerById(id: number): Promise<Practitioner | undefined> {
    return this.practitioners.get(id);
  }

  async createPractitioner(insertPractitioner: InsertPractitioner): Promise<Practitioner> {
    const id = this.practitionerId++;
    const practitioner: Practitioner = { ...insertPractitioner, id };
    this.practitioners.set(id, practitioner);
    return practitioner;
  }

  // Dosha quiz methods
  async getAllDoshaQuizQuestions(): Promise<DoshaQuizQuestion[]> {
    return Array.from(this.doshaQuizQuestions.values());
  }

  async getDoshaQuizQuestionById(id: number): Promise<DoshaQuizQuestion | undefined> {
    return this.doshaQuizQuestions.get(id);
  }

  async createDoshaQuizQuestion(insertQuestion: InsertDoshaQuizQuestion): Promise<DoshaQuizQuestion> {
    const id = this.questionId++;
    const question: DoshaQuizQuestion = { ...insertQuestion, id };
    this.doshaQuizQuestions.set(id, question);
    return question;
  }
}

export const storage = new MemStorage();