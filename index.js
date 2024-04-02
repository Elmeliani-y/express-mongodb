const express = require("express");
const bodyParser = require("body-parser");
const Parking = require("./connect"); 
const app = express();

app.use(bodyParser.json());

app.post('/add-parking', async (req, res) => {
  try {
    const { id, name, type, city } = req.body;

    const newParking = new Parking({ _id: id, name, type, city });
    await newParking.save();

    res.status(201).json(newParking);
  } catch (error) {
    console.error("Error creating parking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/parkings", (req, res) => { 
  Parking.find()
    .then(parkings => res.status(200).json(parkings))
    .catch(error => res.status(400).json(error));
});


app.get("/parkings/:id", (req, res) => { 
        const id = req.params ; 
        Parking.find(id)
          .then(parkings => res.status(200).json(parkings))
          .catch(error => res.status(400).json(error));
      });

app.put("/update-parking/:id", async (req, res) => {
        try {
          const { id } = req.params;
          const { name, type, city } = req.body;
      
          const updatedParking = await Parking.findByIdAndUpdate(id, { name, type, city }, { new: true });
      
          if (!updatedParking) {
            return res.status(404).json({ error: "Parking entry not found" });
          }
      
          res.status(200).json(updatedParking);
        } catch (error) {
          console.error("Error updating parking:", error);
          res.status(500).json({ error: "Internal server error" });
        }
      });


app.delete("/delete-parking/:id", async (req, res) => {
        try {
          const { id } = req.params;
      
          const deletedParking = await Parking.findByIdAndDelete(id);
      
          if (!deletedParking) {
            return res.status(404).json({ error: "Parking entry not found" });
          }
      
          res.status(200).json({ message: "Parking entry deleted successfully" });
        } catch (error) {
          console.error("Error deleting parking:", error);
          res.status(500).json({ error: "Internal server error" });
        }
      });
      
      const PORT = 3000;
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });

