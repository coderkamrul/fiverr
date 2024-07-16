const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Connect to MongoDB
mongoose.connect("mongodb+srv://kamrulhasan13020:kamrulhasan13020@crud.q0y6kmc.mongodb.net/text?retryWrites=true&w=majority&appName=crud").then(()=>{
    console.log("Connected");
})

// Gig schema
const gigSchema = new mongoose.Schema({
  setps: Array,
  Gigtitle: String,
  selectedCategory: String,
  selectedSubcategory: String,
  tags: Array,
  packageNames: Array,
  packageDescriptions: Array,
  selectedDeliveryOptions: Array,
  pageNumber: Array,
  revisionNumber: Array,
  checkboxes: Object,
  prices: Object,
  content: String,
  imagePreview: Array,
});

const Gig = mongoose.model('Gig', gigSchema);

// POST endpoint to save a new gig
app.post('/api/gigs', async (req, res) => {
  try {
    const newGig = new Gig(req.body);
    await newGig.save();
    res.status(201).json(newGig);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET endpoint to retrieve a gig by ID
app.get('/api/gigs/:id', async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    res.status(200).json(gig);
  } catch (error) {
    res.status(404).json({ error: 'Gig not found' });
  }
});


// GET endpoint to retrieve all gig
app.get('/api/gigs', async (req, res) => {
  try {
    const gigs = await Gig.find().select('Gigtitle images prices imagePreview'); // Selecting only Gigtitle, images, and prices
    res.status(200).json(gigs);
  } catch (error) {
    res.status(404).json({ error: 'Gigs not found' });
  }
});


// Delete endpoint to Delete a gig by ID
app.delete('/api/gigs/delete/:id', async (req, res) => {
  try {
    const gig = await Gig.findByIdAndDelete(req.params.id);
    if (!gig) {
      return res.status(404).json({ error: 'Gig not found' });
    }
    res.status(200).json(gig);
  } catch (error) {
    console.error("Error deleting gig:", error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
