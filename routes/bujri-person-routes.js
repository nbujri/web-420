/**
 * title: bujri-person-routes.js
 * author: ngi bujri
 * date: april 16 2023
 * description: routing for person API
 */

const express = require("express");
const router = express.Router();
const Person = require("../models/bujri-person");

/**
 * findAllPersons
 * @openapi
 * /api/persons:
 *  get:
 *    tags:
 *      - People
 *    summary: Returns all people
 *    Description: Returns all people
 *    responses:
 *      "200":
 *        description: Array of person documents
 *      "500":
 *        description: Server Exception
 *      "501":
 *        description: MongoDB Exception
 */
router.get("/persons", async (req, res) => {
  try {
    // return all people
    // or return appropriate error message
    Person.find({}, function (err, people) {
      if (err) {
        res.status(501).send({ message: `MongoDB Exception: ${err}` });
      } else {
        console.log(people);
        res.json(people);
      }
    });
  } catch (e) {
    res.status(500).send({ message: `Server Exception: ${e.message}` });
  }
});

/**
 * createPerson
 * @openapi
 * /api/persons:
 *  post:
 *    tags:
 *      - People
 *    summary: Create a new person
 *    description: Create a new person
 *    requestBody:
 *      description: Person information
 *      content:
 *        application/json:
 *          schema:
 *            required:
 *              - firstName
 *              - lastName
 *              - roles
 *              - dependents
 *              - birthDate
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              roles:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    text:
 *                      type: string
 *              dependents:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    firstName:
 *                      type: string
 *                    lastName:
 *                      type: string
 *    responses:
 *      "200":
 *        description: Array of person documents
 *      "500":
 *        description: Server Exception
 *      "501":
 *        description: MongoDB Exception
 */
router.post("/persons", async (req, res) => {
  try {
    // get person info
    const newPerson = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      roles: req.body.roles,
      dependents: req.body.dependents,
      birthDate: req.body.birthDate,
    };

    // create new person document
    // or send appropriate error message
    await Person.create(newPerson, function (err, person) {
      if (err) {
        res.status(501).send({ message: `MongoDB Exception: ${err}` });
      } else {
        console.log(person);
        res.json(person);
      }
    });
  } catch (e) {
    res.status(500).send({ message: `Server Exception: ${e.message}` });
  }
});

module.exports = router;
