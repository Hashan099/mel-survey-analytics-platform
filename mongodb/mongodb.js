import { MongoClient } from 'mongodb';

let adminClient;
let readOnlyClient;
let readWriteClient;
let adminClientPromise;
let readOnlyClientPromise;
let readWriteClientPromise;


const adminURI = process.env.MONGODB_ADMIN_URI;  
const readOnlyURI = process.env.MONGODB_READ_ONLY_URI;
const readAWriteURI=process.env.MONGODB_READ_AND_WRITE_URI; 

if (!adminURI || !readOnlyURI || !readAWriteURI) {
  throw new Error('MongoDB URIs for Admin, Read-Only and ReadWrite are required.');
}

// Admin client connection
if (!global._mongoAdminClientPromise) {
  adminClient = new MongoClient(adminURI);
  global._mongoAdminClientPromise = adminClient.connect();
}
adminClientPromise = global._mongoAdminClientPromise;

// Read-Only client connection
if (!global._mongoReadOnlyClientPromise) {
  readOnlyClient = new MongoClient(readOnlyURI);
  global._mongoReadOnlyClientPromise = readOnlyClient.connect();
}
readOnlyClientPromise = global._mongoReadOnlyClientPromise;

// Read-Write client connection
if (!global._mongoReadWriteClientPromise) {
  readWriteClient = new MongoClient(readAWriteURI);
  global.readWriteClientPromise = readWriteClient.connect();
}
readWriteClientPromise = global.readWriteClientPromise;

export { adminClientPromise, readOnlyClientPromise, readWriteClientPromise };
