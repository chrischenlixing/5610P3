const { MongoClient } = require('mongodb');
const dbName = 'EmoTime';
const reviewsCollection = 'new_reviews';
const usersCollection = 'new_users';
const checkinCollection = 'new_checkin';
const url = process.env.MOGO_URL || "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

const db = client.db(dbName);

module.exports = {
  getAllReviews: async () => {
    try {
      return await db.collection(reviewsCollection).find().toArray();
    } catch (error) {
      console.error("Error in getAllReviews:", error);
      throw error; 
    }
  },

  searchReviews: async (obj) => {
    try {
      return await db.collection(reviewsCollection).find(obj).toArray();
    } catch (error) {
      console.error("Error in searchReviews:", error);
      throw error; 
    }
  },

  addShift: async (item) => {
    try {
      return await db.collection(reviewsCollection).insertOne(item);
    } catch (error) {
      console.error("Error in addShift:", error);
      throw error; 
    }
  },

  findOneShift: async (item) => {
    try {
      return await db.collection(reviewsCollection).findOne({ shift: item.shift, name: item.name });
    } catch (error) {
      console.error("Error in findOneShift:", error);
      throw error; 
    }
  },

  findUser: async (name) => {
    try {
      return await db.collection(usersCollection).findOne({ username: name });
    } catch (error) {
      console.error("Error in findUser:", error);
      throw error; 
    }
  },
  addUser: async (user) => {
    try {
      return await db.collection(usersCollection).insertOne(user);
    } catch (error) {
      console.error("Error in addUser:", error);
      throw error;
    }
  },
  findByName: async (name) => {
    try {
      return await db.collection(reviewsCollection).find({ name: name }).toArray();
    } catch (error) {
      console.error("Error in findByName:", error);
      throw error; 
    }
  },
  getCheckInByName: async (obj) => {
    try {
      return await db.collection(checkinCollection).find(obj).toArray();
    } catch (error) {
      console.error("Error in getCheckInByName:", error);
      throw error; 
    }
  },
  giveReviews: async (item) => {
    try {
      return await db.collection(reviewsCollection).updateOne({ name: item.name, shift: item.shift }, { $set: item });
    } catch (error) {
      console.error("Error in giveReviews:", error);
      throw error; 
    }
  },
  addCheckIn: async (item) => {
    try {
      return await db.collection(checkinCollection).insertOne(item);
    } catch (error) {
      console.error("Error in addCheckIn:", error);
      throw error; 
    }
  },
  findOneCheckIn: async (item) => {
    try {
      return await db.collection(checkinCollection).findOne({ shift: item.shift, name: item.name, date: item.date });
    } catch (error) {
      console.error("Error in findOneCheckIn:", error);
      throw error; 
    }
  },
};