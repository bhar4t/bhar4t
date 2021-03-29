---
title: "Generate incremental Firebase Firestore order/number vs ordered document ID"
date: "2020-01-26"
cover: "firebase_increment.jpeg"
keywords: "Firebase, Javascript, Firestore"
author: "Bharat Sahu"
---

Before going for incremental Firestore order or incremental document ID please go through [Firestore documentation](https://firebase.google.com/docs/firestore/manage-data/add-data) you’ll get some use cases there with an important note:

> Important: Unlike "push IDs" in the Firebase Realtime Database, Cloud Firestore auto-generated IDs do not provide any automatic ordering. If you want to be able to order your documents by creation date, you should store a timestamp as a field in the documents.

I don’t recommend custom document ID over Firestore auto-generated ids cause the scalability comes from how Firestore spreads the document out over its storage layer. In a simplified way: sequential IDs have more hashing collisions, which means you hit write limitations sooner. Having more random IDs ensures the writes are spread out evenly across the storage layer. At the reading, there is no such bottleneck, which is why the recommended approach is to use random keys and a field for ordering upon reads.

Before starting it requires some basic knowledge of [Firestore transactions](https://firebase.google.com/docs/firestore/manage-data/transactions). And, if you want to store your data a field with custom incremental order, Let’s start…

Suppose we have 2 collections first as _Organisations_ and the other is _Purchases_. I have an application that has organizations that can maintain their purchase records on Firebase Firestore and, Every organization will have its incremental serial number for their respective purchases. quick look of both objects:

```json
organisation: {
  name: 'traderA',
  serialNumerGenerated: 0,
}
```

```json
purchase: {
  created_at: new  Date(),
  amount: 889.99,
  serialNumber: 'traderA_025'   // Can be Number or Alphanumeric
}
```

Now, The `serialNumber` can be stored with purchase document two types, first as custom `document_id` or it can be stored as an object field/property. As we already talked about storing data with custom `document_id` is an anti-pattern, I don’t recommend custom `document_id`. But we can maintain a field/property in an ordered way.

Before starting transactions we need Firestore document reference of the selected organization and another reference from _purchases_ with a random `document_id` to be stored with data.

```js
// Create a reference to the organisations doc.
const orgRef = db.collection("organisations").doc("traderA_docId");

// Get random document id for purchases
const purchaseRef = db.collection("purchases").doc();
```

After this, we need to fetch serial numbers (`serialNumberGenerated`) till generated for _purchases_ which is stored in _organizations_ for a particular organization. For the next purchase data, it will be incremented by one to maintain order and, must be stored in both organizations and purchase documents. We’ll do this work inside transactions.

```js
return db
  .runTransaction((trx) => {
    return trx.get(orgRef).then((orgDoc) => {
      if (!orgDoc.exists) throw "Document does not exist!";

      // Increment one serialNumberGenerated to the organisations.
      const nextSerial = orgDoc.data().serialNumerGenerated + 1;

      trx.set(purchaseRef, {
        created_at: new Date(),
        amount: 888.99,
        serialNumber: nextSerial, // OR concat with String.
      });

      trx.update(orgRef, { serialNumerGenerated: nextSerial });
    });
  })
  .then(() => console.log("Transaction successfully committed!"))
  .catch((error) => console.log("Transaction failed: ", error));
```

Note:

1. You can’t run **transactions** when **offline**.
2. Increment operation could be done using function `FieldValue.increment`.

[Read on Medium](https://medium.com/@BHAR4T/generate-incremental-firebase-firestore-order-number-vs-ordered-document-id-d03e0ce9d4a5)
