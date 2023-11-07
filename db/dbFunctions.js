const {MongoClient} = require('mongodb');
// const { ObjectId } = require('mongodb');
const dbName = 'AlwaysOnTime';
const coll = 'reviews';
const collUser = 'users';
const coll2='checkin';
const url = process.env.MOGO_URL || "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

const db = client.db(dbName);

module.exports = {

  getAllReviews: async () => {
    return await db.collection(coll).find().toArray();
  },

  searchReviews:async (obj) => {
    return await db.collection(coll).find(obj).toArray();
  },

  addShift: async (item) => {
    return await db.collection(coll).insertOne(item);
  },

  findOneShift:async (item)=>{
    return await db.collection(coll).findOne({shift:item.shift,name:item.name});
  },

  findUser:async(name)=>{
    let obj=db.collection(collUser).findOne({username:name});
    return await db.collection(collUser).findOne({username:name});
  },
  addUser:async(user)=>{
    return await db.collection(collUser).insertOne(user);
  },
  findByName:async(name)=>{
    return await db.collection(coll).find({name:name}).toArray();
  },
  getCheckInByName:async(obj)=>{
    return await db.collection(coll2).find(obj).toArray();
  },
  giveReviews:async(item)=>{
    return await db.collection(coll).updateOne({name:item.name,shift:item.shift},{$set:item});
  },
  addCheckIn:async(item)=>{
    return await db.collection(coll2).insertOne(item);
  },
  findOneCheckIn:async (item)=>{
    return await db.collection(coll2).findOne({shift:item.shift,name:item.name,date:item.date});
  },
};