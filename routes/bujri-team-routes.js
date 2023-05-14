/**
 * title: bujri-team-routes.js
 * author: ngi bujri
 * date: may 12 2023
 * description: routing for teams api
 */

const express = require("express");
const router = express.Router();
const Team = require("../models/bujri-team");

/**
 * findAllTeams
 * @openapi
 * /api/teams:
 *  get:
 *    tags:
 *      - Teams
 *    summary: Find all teams
 *    description: Return an array of all team documents
 *    responses:
 *      "200":
 *        description: Array of team documents
 *      "500":
 *        description: Server Exception
 *      "501":
 *        description: MongoDB Exception
 */
router.get("/teams", async (req, res) => {
  try {
    await Team.find({}, function (error, teams) {
      if (error) {
        res.status(501).send({ message: `MongoDB Exception: ${error}` });
      } else {
        res.json(teams);
      }
    });
  } catch (error) {
    res.status(500).send({ message: `Server Exception: ${error.message}` });
  }
});

/**
 * assignPlayerToTeam
 * @openapi
 * /api/teams/{id}/players:
 *  post:
 *    tags:
 *      - Teams
 *    summary: Assign player to a team
 *    description: Assign player to a team
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      description: Player info
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              salary:
 *                type: number
 *    responses:
 *      "200":
 *        description: Player document
 *      "401":
 *        description: Invalid team id
 *      "500":
 *        description: Server Exception
 *      "501":
 *        description: MongoDB Exception
 */
router.post("/teams/:id/players", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (team) {
      const newPlayer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        salary: req.body.salary,
      };
      team.players.push(newPlayer);
      await team.save(function (error, team) {
        if (error) {
          res.status(501).send({ message: `MongoDB Exception: ${error}` });
        } else {
          // get newly added player at the end of array
          const player = team.players[team.players.length - 1];
          res.json(player);
        }
      });
    } else {
      res.status(401).send({ message: "Invalid team id" });
    }
  } catch (error) {
    res.status(500).send({ message: `Server Exception: ${error.message}` });
  }
});

/**
 * findAllPlayersByTeamId
 * @openapi
 * /api/teams/{id}/players:
 *  get:
 *    tags:
 *      - Teams
 *    summary: Find all players in a specified team
 *    description: Find all players in a specified team
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: Array of player documents
 *      "401":
 *        description: Invalid team id
 *      "500":
 *        description: Server Exception
 *      "501":
 *        description: MongoDB Exception
 */
router.get("/teams/:id/players", async (req, res) => {
  try {
    await Team.findById(req.params.id, function (error, team) {
      if (error) {
        res.status(401).send({ message: "Invalid team id" });
      } else {
        res.json(team.players);
      }
    });
  } catch (error) {
    res.status(500).send({ message: `Server Exception: ${error.message}` });
  }
});

/**
 * deleteTeamById
 * @openapi
 * /api/teams/{id}:
 *  delete:
 *    tags:
 *      - Teams
 *    summary: Delete a team
 *    description: Delete a team
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: Team document
 *      "401":
 *        description: Invalid team id
 *      "500":
 *        description: Server Exception
 *      "501":
 *        description: MongoDB Exception
 */
router.delete("/teams/:id", async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id, function (error, team) {
      if (error) {
        res.status(401).send({ message: "Invalid team id" });
      } else {
        res.json(team);
      }
    });
  } catch (error) {
    res.status(500).send({ message: `Server Exception: ${error.message}` });
  }
});

module.exports = router;
