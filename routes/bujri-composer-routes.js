// title: bujri-composers-routes.js
// author: Ngi Bujri
// date: april 9 2023
// description: routing for composers API

const express = require("express");
const router = express.Router();
const Composer = require("../models/bujri-composers");

/**
 * findAllComposers
 * @openapi
 * /api/composers:
 *  get:
 *    tags:
 *      - Composers
 *    summary: Returns all composers
 *    description: Returns a list of all existing composers
 *    responses:
 *      "200":
 *        description: List of all composers
 *      "500":
 *        description: Server Exception
 *      "501":
 *        description: MongoDB Exception
 */
router.get("/composers", async (req, res) => {
  try {
    Composer.find({}, function (err, composers) {
      if (err) {
        res.status(501).send({ message: `MongoDB Exception: ${err}` });
      } else {
        console.log(composers);
        res.json(composers);
      }
    });
  } catch (e) {
    res.status(500).send({ message: `Server Exception: ${e.message}` });
  }
});

/**
 * findComposersById
 * @openapi
 * /api/composers/{id}:
 *  get:
 *    tags:
 *      - Composers
 *    summary: Returns a composer
 *    description: Search for a composer with a matching ID
 *    responses:
 *      "200":
 *        description: Return a composer
 *      "500":
 *        description: Server Exception
 *      "501":
 *        description: MongoDB Exception
 */
router.get("/composers/:id", async (req, res) => {
  try {
    Composer.findOne({ _id: req.params.id }, function (err, composer) {
      if (err) {
        res.status(501).send({ message: `MongoDB Exception: ${err}` });
      } else {
        res.json(composer);
      }
    });
  } catch (err) {
    res.status(500).send({ message: `Server Exception: ${err}` });
  }
});

/**
 * createComposer
 * @openapi
 * /api/composers:
 *  post:
 *    tags:
 *      - Composers
 *    name: createComposer
 *    summary: Add a new composer
 *    description: Creates a new composer
 *    requestBody:
 *      description: Composer information
 *      content:
 *        application/json:
 *          schema:
 *            required:
 *              - firstName
 *              - lastName
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *    responses:
 *      "200":
 *        description: New composer created
 *      "500":
 *        description: Server Exception
 *      "501":
 *        description: MongoDB Exception
 */
router.post("/composers", async (req, res) => {
  try {
    const newComposer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };

    await Composer.create(newComposer, function (err, composer) {
      if (err) {
        res.status(501).send({ message: `MongoDB Exception: ${err}` });
      } else {
        res.json(composer);
      }
    });
  } catch (e) {
    res.status(500).send({ message: `Server Exception: ${e.message}` });
  }
});

/**
 * updateComposerById
 * @openapi
 * /api/composers/{id}:
 *  put:
 *    tags:
 *      - Composers
 *    description: Update composer info with specified id
 *    summary: Update composer info
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      description: Updated composer info
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *    responses:
 *      "200":
 *        description: Array of composer documents
 *      "401":
 *        description: Invalid composer id
 *      "500":
 *        description: Server Exception
 *      "501":
 *        description: MongoDB Exception
 */
router.put("/composers/:id", async (req, res) => {
  try {
    // find matching composer
    const composer = await Composer.findOne({ _id: req.params.id });

    if (composer) {
      composer.set({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      });
      await composer.save();
    } else {
      res.status(401).send({ message: "Invalid composer id" });
    }
  } catch (e) {
    res.status(500).send({ message: `Server Exception: ${e.message}` });
  }
});

/**
 * deleteComposerById
 * @openapi
 * /api/composers/{id}:
 *  delete:
 *    tags:
 *      - Composers
 *    description: Delete composer with specified id
 *    summary: Delete composer
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: Composer document
 *      "500":
 *        description: Server Exception
 *      "501":
 *        description: MongoDB Exception
 */
router.delete("/composers/:id", async (req, res) => {
  try {
    await Composer.findByIdAndDelete(
      { _id: req.params.id },
      function (err, composer) {
        if (err) {
          res.status(501).send({ message: "MongoDB Exception" });
        } else {
          res.status(200).json(composer);
        }
      }
    );
  } catch (e) {
    res.status(500).send({ message: `Server Exception: ${e.message}` });
  }
});

module.exports = router;
