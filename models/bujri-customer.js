/**
 * title: bujri-customer.js
 * author: ngi bujri
 * date: april 30 2023
 * description: customer schema
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// line item schema
const lineItemSchema = new Schema({
  name: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});

// invoice schema
const invoiceSchema = new Schema({
  subtotal: { type: Number },
  tax: { type: Number },
  dateCreated: { type: String },
  dateShipped: { type: String },
  lineItems: [lineItemSchema],
});

// customer schema
const customerSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  userName: { type: String },
  invoices: [invoiceSchema],
});

module.exports = mongoose.model("Customer", customerSchema);
