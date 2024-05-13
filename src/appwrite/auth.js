import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl);
    this.client.setProject(conf.appwriteProjectId);
    this.account = new Account(client);
  }

  //signup page to create the account
  async createAccount({ email, name, password }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        name,
        password
      );
      if (userAccount) {
        //call another function to login directly if account created.
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  //Login page to login the acccount using email and password
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log(`Appwwrite Service :: Login :: error`, error);
    }
  }

  //getUser to get details of the user::
  async getUser() {
    try {
      const user = await this.account.get();
    } catch (error) {
      console.log("Appwrite Service :: getUser :: error", error);
    }

    return null;
  }

  //Logout
  async logout() {
    try {
      return await this.account.deleteSession();
    } catch (error) {
      console.log("Appwrite Services :: Logout :: error", error);
    }
  }
}
const authService = new AuthService();

export default authService;
