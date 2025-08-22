const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    filename: String,
    url: String,
  },
  price: Number,
  location: String,
  country: String,

  // ⭐ New field for categories
  category: {
  type: String,
  enum: [
    "Trending",
    "Rooms",
    "Iconic Cities",
    "Mountains",
    "Amazing Pools",
    "Castles",
    "Camping",
    "Farms",
    "Arctic"
  ],
  required: true,
},

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// Middleware to delete reviews if listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
