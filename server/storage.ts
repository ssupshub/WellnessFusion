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
