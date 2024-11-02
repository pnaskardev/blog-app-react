import config from "../../config/config";
import { Client, Account, ID } from "appwrite";

class AuthService {
  private static instance: AuthService;
  private client: Client;
  private account: Account;

  private constructor() {
    this.client = new Client();
    this.client
      .setEndpoint(config.appwrite_url)
      .setProject(config.appwrite_project_id);
    this.account = new Account(this.client);
  }

  async createAccount(name: string, email: string, password: string) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method
        return this.login(email, password);
      } else {
        return;
      }
    } catch (error) {
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      console.log("Creating new instance");
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }
}

// const authService = new AuthService();

export default AuthService.getInstance();
