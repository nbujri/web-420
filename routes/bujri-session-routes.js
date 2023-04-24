/**
 * title: bujri-session-routes.js
 * author: ngi bujri
 * date: april 23 2023
 * description: routing for registration and login
 */

// imports
const express = require("express");
const router = express.Router();
const User = require("../models/bujri-user");
const bcrypt = require("bcryptjs");

const saltRounds = 10;

/**
 * signup
 * @openapi
 * /api/signup:
 *  post:
 *    tags:
 *      - User
 *    description: Registration for new user
 *    summary: Registration for new user
 *    requestBody:
 *      description: Register user
 *      content:
 *        application/json:
 *          schema:
 *            required:
 *              - userName
 *              - password
 *              - emailAddress
 *            properties:
 *              userName:
 *                type: string
 *              password:
 *                type: string
 *              emailAddress:
 *                type: string
 *    responses:
 *      "200":
 *        description: Registered user
 *      "401":
 *        description: Username is already in use
 *      "500":
 *        description: Server Exception
 *      "501":
 *        description: MongoDB Exception
 */
router.post("/signup", async (req, res) => {
  try {
    const newUser = {
      userName: req.body.userName,
      password: req.body.password,
      emailAddress: req.body.emailAddress,
    };
    // check if userName exists
    const user = await User.findOne({ userName: newUser.userName });
    // if userName available, register user
    if (!user) {
      // hash user password
      const hash = bcrypt.hashSync(newUser.password, saltRounds);
      const newRegisteredUser = {
        userName: newUser.userName,
        password: hash,
        emailAddress: newUser.emailAddress,
      };

      // create user
      await User.create(newRegisteredUser, function (err, user) {
        if (err) {
          res.status(501).send({ message: `MongoDB Exception: ${err}` });
        } else {
          console.log(user);
          res.json(user);
        }
      });
    } else {
      res.status(401).send({ message: "Username is already in use" });
    }
  } catch (e) {
    res.status(500).send({ message: `Server Exception: ${e.message}` });
  }
});

/**
 * login
 * @openapi
 * /api/login:
 *  post:
 *    tags:
 *      - User
 *    description: Verify login credentials
 *    summary: Verify login credentials
 *    requestBody:
 *      description: user login credentials
 *      content:
 *        application/json:
 *          schema:
 *            required:
 *              - userName
 *              - password
 *            properties:
 *              userName:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      "200":
 *        description: User logged in
 *      "401":
 *        description: Invalid username and/or password
 *      "500":
 *        description: Server Exception
 *      "501":
 *        description: MongoDB Exception
 */
router.post("/login", async (req, res) => {
  try {
    const userCredentials = {
      userName: req.body.userName,
      password: req.body.password,
    };

    const user = await User.findOne({ userName: userCredentials.userName });
    // if user exists, check password
    if (user) {
      let passwordIsValid = bcrypt.compareSync(
        userCredentials.password,
        user.password
      );
      // if valid password, tell user has logged in
      if (passwordIsValid) {
        res.status(200).send({ message: "User logged in" });
      } else {
        res.status(401).send({ message: "Invalid username and/or password" });
      }
    } else {
      res.status(401).send({ message: "Invalid username and/or password" });
    }
  } catch (e) {
    res.status(500).send({ message: `Server Exception: ${e.message}` });
  }
});

module.exports = router;
