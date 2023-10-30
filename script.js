// const http = require('http');
// const mongoose = require('mongoose')
const cors = require("cors");
// const sensor = mongoose.model('sensor', {
//   sensorId: String,
//   sensorName: String,
//   sensorDes:String,
// });
// mongoose.connect("mongodb+srv://Guru:prasad19092002@cluster0.nxyuauj.mongodb.net/?retryWrites=true&w=majority");

// const server = http.createServer((req, res) => {
//   cors()(req, res, () => {
//     if (req.method === 'POST' && req.url === '/data') {
//       let body = '';

//       req.on('data', (chunk) => {
//         body += chunk;
//       });

//       req.on('end', () => {
//         const data = JSON.parse(body);
//         const { sensorId ,sensorName,sensorDes  } = data;
//         // const postInfo= async()=>{
//         //     const savedTodo = await sensor.create({ sensorId ,sensorName,sensorDes });
//         // }
//         // postInfo();
//         res.writeHead(200, { 'Content-Type': 'text/plain' });
//         let postData = new sensor();
//         postData.sensorId = sensorId;
//         postData.sensorName = sensorName;
//         postData.sensorDes = sensorDes;
//         postData.save((err,data)=>{
//           if(err){
//             console.error(err);
//           }else{
//             res.end("Inserted to DB")
//           }
//         })
//       });
//     } else {
//       res.writeHead(404, { 'Content-Type': 'text/plain' });
//       res.end('Not Found');
//     }
//   });

// });

// const port = 3001;
// // const start = async()=>{
// //   mongoose.connect('mongodb+srv://Guru:@cluster0.nxyuauj.mongodb.net/')
// // }
// server.listen(port, () => {
//   console.log(`Server is running on port ${port} and DB connected`);
// });

// const http = require('http');
// const { MongoClient } = require('mongodb');

// const PORT = 3001;

// const server = http.createServer((req, res) => {
//   cors()(req, res, () => {
//   if (req.method === 'POST' && req.url === '/data') {
//     // Handle POST request to add data to MongoDB
//     let data = '';

//     req.on('data', (chunk) => {
//       data += chunk;
//     });

//     req.on('end', () => {
//       // Parse the JSON data from the request
//       const postData = JSON.parse(data);
//       console.log(data);
//       // Connect to MongoDB Atlas and insert data
//       MongoClient.connect("mongodb+srv://Guru:prasad19092002@cluster0.nxyuauj.mongodb.net", (err, client) => {
//         if (err) {
//           console.error(err);
//           res.statusCode = 500;
//           res.end('Internal Server Error');
//           return;
//         }
//         console.log(data);

//         const db = client.db("test"); // Replace with your database name
//         const collection = db.collection('sensors'); // Replace with your collection name

//         collection.insertOne(postData, (err, result) => {
//           if (err) {
//             console.error(err);
//             res.statusCode = 500;
//             res.end('Internal Server Error');
//           } else {
//             console.log('Data inserted:', result.ops);
//             res.end('Data inserted');
//           }
//           client.close();
//         });
//       });
//     });
//   } else if (req.method === 'GET' && req.url === '/search') {
//     // Handle GET request to search data in MongoDB
//     MongoClient.connect(process.env.MONGODB_URI, { useUnifiedTopology: true }, (err, client) => {
//       if (err) {
//         console.error(err)
//         res.statusCode = 500;
//         res.end('Internal Server Error');
//         return;
//       }

//       const db = client.db(process.env.MONGODB_DB); // Replace with your database name
//       const collection = db.collection('mycollection'); // Replace with your collection name

//       collection.find({}).toArray((err, data) => {
//         if (err) {
//           console.error(err);
//           res.statusCode = 500;
//           res.end('Internal Server Error');
//         } else {
//           console.log('Data retrieved:', data);
//           res.setHeader('Content-Type', 'application/json');
//           res.end(JSON.stringify(data));
//         }
//         client.close();
//       });
//     });
//   } else {
//     res.end('Invalid route or method');
//   }
// });
// });

// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const http = require("http");
const url = require("url");
const mongoose = require("mongoose");

mongoose.connect(
  // "mongodb+srv://Guru:<password>@cluster0.nxyuauj.mongodb.net/?retryWrites=true&w=majority"
  "mongodb+srv://Guru:prasad19092002@cluster0.nxyuauj.mongodb.net/?retryWrites=true&w=majority/test",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: {
      w: "majority",
      wtimeout: 0,
    },
  }
);

const Schema = mongoose.Schema;
// const itemSchema = new Schema({
//   name: String,
//   description: String,
//   price: Number
// });
const sensor = new Schema({
  sensorId: String,
  sensorName: String,
  sensorDes: String,
});
const Sensor = mongoose.model("Sensor", sensor);

const server = http.createServer((req, res) => {
  cors()(req, res, () => {
    if (req.method === "GET" && req.url === "/details") {
      const fetchD = async () => {
        try {
          const data =await Sensor.find();
          console.log(data);
          if (data) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ data }));
          }
        } catch (error) {
          console.error(error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "An error occurred" }));
        }
      };
    
      fetchD();
      // const relevantData = data.map(item => ({
      //   sensorId: item.sensorId,
      //   sensorName: item.sensorName,
      //   sensorDes:item.sensorDes
      // }));
    } else if (req.method === "POST" && req.url === "/data") {
      let data = "";

      req.on("data", (chunk) => {
        data += chunk;
      });

      req.on("end", () => {
        const sensorData = JSON.parse(data);
        console.log(sensorData.data.sensorId);
        const itemData = {
          sensorId: sensorData.data.sensorId,
          sensorName: sensorData.data.sensorName,
          sensorDes: sensorData.data.sensorDes,
        };
        const type = new Sensor(itemData);

        type.save();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Successfully Added" }));
      });
    }else if (req.method === "POST" && req.url === "/update") {
      let data = "";

      req.on("data", (chunk) => {
        data += chunk;
      });

      req.on("end", () => {
        const sensorData = JSON.parse(data);
        // console.log(sensorData.data.sensorId);
        const itemData = {
          sensorId: sensorData.data.sensorId,
          sensorName: sensorData.data.sensorName,
          sensorDes: sensorData.data.sensorDes,
        };
        const fetchD = async () => {
          // data = await Sensor.find();
          try{
          const deta = await Sensor.findOne({
            sensorId: sensorData.data.sensorId,
          });
          // console.log(deta._id);
          // const updatedItem = Sensor.findByIdAndUpdate(deta._id.toString(), {
          //   sensorDes: "sensorData.data.sensorDes",
          // }, { new: true });
          const result = await Sensor.findByIdAndUpdate(deta._id, itemData);
          // console.log(updatedItem);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Successfully Updated" }));
          }catch(err){
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Item not found" }));
          }
        };
        fetchD();
      });
    }else if (req.method === "POST" && req.url === "/delete") {
      let data = "";

      req.on("data", (chunk) => {
        data += chunk;
      });

      req.on("end", () => {
        const sensorData = JSON.parse(data);
        const itemData = {
          sensorId: sensorData.data.sensorId,
          sensorName: sensorData.data.sensorName,
          sensorDes: sensorData.data.sensorDes,
        };
        const fetchD = async () => {
          // data = await Sensor.find();
          const deta = await Sensor.findOne({
            sensorId: sensorData.data.sensorId,
          });
          // console.log(deta._id);
          // const updatedItem = Sensor.findByIdAndUpdate(deta._id.toString(), {
          //   sensorDes: "sensorData.data.sensorDes",
          // }, { new: true });
          const result = await Sensor.findByIdAndDelete(deta._id);
          // console.log(updatedItem);
          if (!result) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Item not found" }));
          } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Successfully Deleted" }));
          }
        };
        fetchD();
      });
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Server Not Found!!!" }));
    }
  });
});

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
