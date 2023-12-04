/**
 * @swagger
 *  components:
 *      schemas:
 *          login:
 *              type: object
 *              required:
 *                  - username
 *                  - password
 *              properties:
 *                  username:
 *                      type: string
 *                      description: username of user
 *                  password:
 *                      type: string
 *                      description: password of user
 */


/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth Module Endpoints
 */

/**
 * @swagger
 *
 * /auth/login:
 *  post:
 *      summary: login into your account
 *      tags:
 *          - Auth
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - username
 *                          - password
 *                      properties:
 *                          username:
 *                              type: string
 *                              description: username of user
 *                          password:
 *                              type: string
 *                              description: password of user
 *      responses:
 *          200:
 *              description: success
 */


/**
 * @swagger
 *
 * /auth/register:
 *  post:
 *      summary: register your account
 *      tags:
 *          - Auth
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - username
 *                          - password
 *                      properties:
 *                          username:
 *                              type: string
 *                              description: username of user
 *                          password:
 *                              type: string
 *                              description: password of user
 *      responses:
 *          200:
 *              description: success
 */
