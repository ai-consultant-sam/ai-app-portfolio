import { UserProfile, InsertUserProfile, Customer, InsertCustomer, EmailGeneration, InsertEmailGeneration } from "@shared/schema";

export interface IStorage {
  // User profiles
  createUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  getUserProfile(id: number): Promise<UserProfile | undefined>;
  
  // Customers
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  getCustomer(id: number): Promise<Customer | undefined>;
  
  // Email generations
  createEmailGeneration(generation: InsertEmailGeneration): Promise<EmailGeneration>;
  getEmailGenerations(limit?: number): Promise<EmailGeneration[]>;
}

export class MemStorage implements IStorage {
  private userProfiles: Map<number, UserProfile>;
  private customers: Map<number, Customer>;
  private emailGenerations: Map<number, EmailGeneration>;
  private currentUserProfileId: number;
  private currentCustomerId: number;
  private currentEmailGenerationId: number;

  constructor() {
    this.userProfiles = new Map();
    this.customers = new Map();
    this.emailGenerations = new Map();
    this.currentUserProfileId = 1;
    this.currentCustomerId = 1;
    this.currentEmailGenerationId = 1;
  }

  async createUserProfile(insertProfile: InsertUserProfile): Promise<UserProfile> {
    const id = this.currentUserProfileId++;
    const profile: UserProfile = {
      ...insertProfile,
      id,
      createdAt: new Date(),
      position: insertProfile.position ?? null,
    };
    this.userProfiles.set(id, profile);
    return profile;
  }

  async getUserProfile(id: number): Promise<UserProfile | undefined> {
    return this.userProfiles.get(id);
  }

  async createCustomer(insertCustomer: InsertCustomer): Promise<Customer> {
    const id = this.currentCustomerId++;
    const customer: Customer = {
      ...insertCustomer,
      id,
      createdAt: new Date(),
      department: insertCustomer.department ?? null,
    };
    this.customers.set(id, customer);
    return customer;
  }

  async getCustomer(id: number): Promise<Customer | undefined> {
    return this.customers.get(id);
  }

  async createEmailGeneration(insertGeneration: InsertEmailGeneration): Promise<EmailGeneration> {
    const id = this.currentEmailGenerationId++;
    const generation: EmailGeneration = {
      ...insertGeneration,
      id,
      createdAt: new Date(),
    };
    this.emailGenerations.set(id, generation);
    return generation;
  }

  async getEmailGenerations(limit = 10): Promise<EmailGeneration[]> {
    const generations = Array.from(this.emailGenerations.values())
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
    return generations.slice(0, limit);
  }
}

export const storage = new MemStorage();
