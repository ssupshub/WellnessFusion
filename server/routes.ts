import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCartItemSchema, insertProductSchema, insertUserSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  // API routes
  
  // Products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get("/api/products/bestsellers", async (req, res) => {
    try {
      const products = await storage.getBestsellerProducts();
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get("/api/products/new", async (req, res) => {
    try {
      const products = await storage.getNewProducts();
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get("/api/products/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const products = await storage.getProductsByCategory(category);
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get("/api/products/dosha/:doshaType", async (req, res) => {
    try {
      const doshaType = req.params.doshaType;
      const products = await storage.getProductsByDoshaType(doshaType);
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProductById(id);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.post("/api/products", async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: error.message });
    }
  });
  
  // Cart
  app.get("/api/cart/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const cartItems = await storage.getCartItemWithDetails(userId);
      res.json(cartItems);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.post("/api/cart", async (req, res) => {
    try {
      const cartItem = insertCartItemSchema.parse(req.body);
      const addedItem = await storage.addToCart(cartItem);
      res.status(201).json(addedItem);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid cart item data", errors: error.errors });
      }
      res.status(500).json({ message: error.message });
    }
  });
  
  app.put("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { quantity } = req.body;
      
      if (typeof quantity !== 'number' || quantity < 1) {
        return res.status(400).json({ message: "Invalid quantity" });
      }
      
      const updatedItem = await storage.updateCartItem(id, quantity);
      
      if (!updatedItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      res.json(updatedItem);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.removeFromCart(id);
      
      if (!success) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Users
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: error.message });
    }
  });
  
  // Practitioners
  app.get("/api/practitioners", async (req, res) => {
    try {
      const practitioners = await storage.getAllPractitioners();
      res.json(practitioners);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get("/api/practitioners/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const practitioner = await storage.getPractitionerById(id);
      
      if (!practitioner) {
        return res.status(404).json({ message: "Practitioner not found" });
      }
      
      res.json(practitioner);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Dosha Quiz
  app.get("/api/dosha-quiz", async (req, res) => {
    try {
      const questions = await storage.getAllDoshaQuizQuestions();
      res.json(questions);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.post("/api/dosha-quiz/result", async (req, res) => {
    try {
      // Expected body: { answers: { questionId: "vata" | "pitta" | "kapha" }[] }
      const { answers } = req.body;
      
      if (!answers || typeof answers !== 'object') {
        return res.status(400).json({ message: "Invalid quiz answers" });
      }
      
      // Calculate dosha type based on answers
      let vataCount = 0;
      let pittaCount = 0;
      let kaphaCount = 0;
      
      for (const [questionId, doshaType] of Object.entries(answers)) {
        if (doshaType === 'vata') vataCount++;
        else if (doshaType === 'pitta') pittaCount++;
        else if (doshaType === 'kapha') kaphaCount++;
      }
      
      // Determine dominant dosha
      let dominantDosha;
      if (vataCount >= pittaCount && vataCount >= kaphaCount) {
        dominantDosha = 'vata';
      } else if (pittaCount >= vataCount && pittaCount >= kaphaCount) {
        dominantDosha = 'pitta';
      } else {
        dominantDosha = 'kapha';
      }
      
      // Get product recommendations for this dosha type
      const recommendedProducts = await storage.getProductsByDoshaType(dominantDosha);
      
      res.json({
        dominantDosha,
        vataCount,
        pittaCount,
        kaphaCount,
        recommendations: recommendedProducts.slice(0, 3)
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  return httpServer;
}
