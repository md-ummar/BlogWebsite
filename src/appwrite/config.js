import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";
export class Services {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl);
    this.client.setProject(conf.appwriteProjectId);

    this.databases = new Databases(client);
    this.bucket = new Storage(client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite Services :: creastePost :: error", error);
    }
  }

  //Update document
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      console.log("Appwrite Services :: updatePost :: error", error);
    }
  }

  async deletePost({ slug }) {
    try {
      const response = await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite Services :: deletePost :: error", error);
      return false;
    }
  }
  s;

  async getPost(queries = [Query.equal("status", "active")], slug) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite Services :: getPost :: error", error);
      return false;
    }
  }

  //file upload services

  async uploadfile(file) {
    try {
    } catch (error) {
      console.log("Appwrite Services :: uploadFile :: error", error);
    }
  }
}

const service = new Services();
export default service;
