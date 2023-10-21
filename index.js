const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

//middelwares
app.use(cors());
app.use(express.json());

//------------------------
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zelauzs.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const carCollection = client.db("cardb").collection("car");

    //insert data
    app.post("/addProduct", async (req, res) => {
      const newCar = req.body;
      console.log("new Car", newCar);
      const result = await carCollection.insertOne(newCar);
      res.send(result);
    });

    //show data
    app.get("/addProduct", async (req, res) => {
      const cursor = carCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    //details
    app.get("/addProduct/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await carCollection.findOne(query);
      res.send(result);
      console.log(id);
    });

    //update
    app.get("/addProduct/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const result = await carCollection.findOne(query);
      res.send(result);
    });

    app.put("/addProduct/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upset: true };
      const updateCar = req.body;
      const car = {
        $set: {
          name: updateCar.name,
          BName: updateCar.BName,
          type: updateCar.type,
          price: updateCar.price,
          SDescription: updateCar.SDescription,
          rating: updateCar.rating,
          photo: updateCar.photo,
        },
      };
      const result = await carCollection.updateOne(filter, car, options);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

//---------------------------
app.get("/", (req, res) => {
  res.send("Automotive server is running");
});
app.listen(port, () => {
  console.log(`Automotive app listening on port ${port}`);
});
