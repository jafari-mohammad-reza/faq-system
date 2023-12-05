/**
 * @swagger
 *  components:
 *      schemas:
 *          name:
 *              type: object
 *              required:
 *                  - name
 *              properties:
 *                  name:
 *                      type: string
 *                      description: name of topic
 */


/**
 * @swagger
 * tags:
 *  name: Section
 *  description: Section Module Endpoints
 */

/**
 * @swagger
 *
 * /section/:
 *  get:
 *      summary: get list of sections and their topics and count of questions and answers
 *      tags:
 *          - Section
 *      responses:
 *          200:
 *              description: success
 */


/**
 * @swagger
 *
 * /section/{id}:
 *  get:
 *      summary: get section and its topics and count of questions and answers
 *      tags:
 *          - Section
 *      responses:
 *          200:
 *              description: success
 */



/**
 * @swagger
 *
 * /section/:
 *  post:
 *      summary: create new section
 *      tags:
 *          - Section
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - name
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: name of topic
 *      responses:
 *          200:
 *              description: success
 */



/**
 * @swagger
 *
 * /section/{id}:
 *  patch:
 *      summary: update section
 *      tags:
 *          - Section
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                 schema:
 *                      type: object
 *                      required:
 *                          - name
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: name of topic
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /section/{id}:
 *  delete:
 *      summary: delete section and its topics and count of questions and answers
 *      tags:
 *          - Section
 *      responses:
 *          200:
 *              description: success
 */
