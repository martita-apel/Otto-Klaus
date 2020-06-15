const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const express = require("express");
const cors = require("cors");

const router = express();

router.use(cors({ origin: true }));

router.get("/toy/:id", async (req, res) => {
  const product = await admin
    .firestore()
    .collection("toys")
    .doc(req.params.id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        return doc.data();
      } else {
        console.log("No such document!");
        return {};
      }
    });
  res.send(product);
});

router.get("/toys", async (req, res) => {
  const toys = await admin
    .firestore()
    .collection("toys")
    .get();
  var lista = [];

  toys.docs.forEach((doc) => {
    lista.push({ id: doc.id, data: doc.data() });
  });
  res.send(lista);
});

router.post("/toy", async (req, res) => {
  /*   const product = await admin
   */
  await admin
    .firestore()
    .collection("toys")
    .add(req.body);
  res.send(req.body);
});

router.put("/toy/:id", async (req, res) => {
  const product = await admin
    .firestore()
    .collection("toys")
    .doc(req.params.id)
    .update(req.body);
  res.send(product);
});

router.delete("/toy/:id", async (req, res) => {
  const product = await admin
    .firestore()
    .collection("toys")
    .doc(req.params.id)
    .delete();
  res.send(product);
});

exports.toys = functions.https.onRequest(router);
