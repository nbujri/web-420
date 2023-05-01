/**
 * title: bujri-node-shopper-routes.js
 * author: ngi bujri
 * date: april 30 2023
 * description: routing for node shopper api
 */

const express = require("express");
const router = express.Router();
const Customer = require("../models/bujri-customer");

/**
 * createCustomer
 * @openapi
 * /api/customers:
 *  post:
 *    tags:
 *      - Customers
 *    description: Create a new customer
 *    summary: Create a new customer
 *    requestBody:
 *      description: Customer info
 *      content:
 *        application/json:
 *          schema:
 *            required:
 *              - firstName
 *              - lastName
 *              - userName
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              userName:
 *                type: string
 *    responses:
 *      "200":
 *        description: Customer added to MongoDB
 *      "500":
 *        description: Server Exception
 *      "501":
 *        description: MongoDB Exception
 */
router.post("/customers", async (req, res) => {
  try {
    const newCustomer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.lastName,
    };

    await Customer.create(newCustomer, function (err, customer) {
      if (err) {
        res.status(501).send({ message: `MongoDB Exception: ${err}` });
      } else {
        console.log(customer);
        res.json(customer);
      }
    });
  } catch (e) {
    res.status(500).send({ message: `Server Exception: ${e.message}` });
  }
});

/**
 * createInvoiceByUserName
 * @openapi
 * /api/customers/:username/invoices:
 *  post:
 *    tags:
 *      - Customers
 *    description: Create customer invoice
 *    summary: Create customer invoice
 *    parameters:
 *      - name: userName
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      description: Customer username
 *      content:
 *        application/json:
 *          schema:
 *            required:
 *              - subtotal
 *              - tax
 *              - dateCreated
 *              - dateShipped
 *              - lineItems
 *            properties:
 *              subtotal:
 *                type: number
 *              tax:
 *                type: number
 *              dateCreated:
 *                type: string
 *              dateShipped:
 *                type: string
 *              lineItems:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    name:
 *                      type: string
 *                    price:
 *                      type: number
 *                    quantity:
 *                      type: number
 *    responses:
 *      "200":
 *        description: Customer invoice added to MongoDB
 *      "500":
 *        description: Server Exception
 *      "501":
 *        description: MongoDB Exception
 */
router.post("/customers/:username/invoices", async (req, res) => {
  try {
    const newInvoice = {
      subtotal: parseFloat(req.body.subtotal),
      tax: parseFloat(req.body.tax),
      dateCreated: req.body.dateCreated,
      dateShipped: req.body.dateShipped,
      lineItems: req.body.lineItems,
    };

    Customer.findOne(
      { userName: req.params.username },
      function (err, customer) {
        if (err) {
          res.status(501).send({ message: `MongoDB Exception: ${err}` });
        } else {
          customer.invoices.push(newInvoice);
          customer.save();
        }
      }
    );
  } catch (e) {
    res.status(500).send({ message: `Server Exception: ${e.message}` });
  }
});

/**
 * findAllInvoicesByUserName
 * @openapi
 * /api/customers/:username/invoices:
 *  get:
 *    tags:
 *      - Customers
 *    description: Find a customers invoices
 *    summary: Find a customers invoices
 *    parameters:
 *      - name: username
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: Invoices retrieved
 *      "500":
 *        description: Server Exception
 *      "501":
 *        description: MongoDB Exception
 */
router.get("/customers/:username/invoices", async (req, res) => {
  try {
    Customer.findOne(
      { userName: req.params.username },
      function (err, customer) {
        if (err) {
          res.status(501).send({ message: `MongoDB Exception: ${err}` });
        } else {
          res.json(customer);
        }
      }
    );
  } catch (e) {
    res.status(500).send({ message: `Server Exception: ${e.message}` });
  }
});

module.exports = router;
