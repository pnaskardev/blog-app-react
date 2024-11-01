import config from "../../config/config";

import { Client, Databases, Query, Storage, ID } from "appwrite";
import { Post } from "../../models/PostModel";

export class DatabaseService {
  private static instance: DatabaseService;
  private client: Client;
  private database: Databases;
  private bucket: Storage;

  constructor() {
    this.client = new Client();
    this.client
      .setEndpoint(config.appwrite_url)
      .setProject(config.appwrite_project_id);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
  }: Post) {
    try {
      return await this.database.createDocument(
        config.appwrite_database_id,
        config.appwrite_collection_id,
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
      throw error;
    }
  }

  async updatePost(
    slug: string,
    {
      title,
      content,
      featuredImage,
      status,
    }: { title: string; content: string; featuredImage: string; status: string }
  ) {
    try {
      return await this.database.updateDocument(
        config.appwrite_database_id,
        config.appwrite_collection_id,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async deletePost(slug: string) {
    try {
      await this.database.deleteDocument(
        config.appwrite_database_id,
        config.appwrite_collection_id,
        slug
      );
      return true;
    } catch (error) {
      return false;
      throw error;
    }
  }

  async getPost(slug: string) {
    {
      try {
        return await this.database.getDocument(
          config.appwrite_database_id,
          config.appwrite_collection_id,
          slug
        );
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }

  async getPosts(queries: string[] = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        config.appwrite_database_id,
        config.appwrite_collection_id,
        queries
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //   TODO: Implement file upload method
  async uploadFile(file: File) {
    try {
      return await this.bucket.createFile(
        config.appwrite_bucket_id,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteFile(fileId: string) {
    try {
      await this.bucket.deleteFile(config.appwrite_bucket_id, fileId);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  getFilePreview(fileId: string) {
    return this.bucket.getFilePreview(config.appwrite_bucket_id, fileId);
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      console.log("Creating new instance");
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }
}

export default DatabaseService.getInstance();
