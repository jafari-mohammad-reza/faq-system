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
 *      summary: Get section and its topics and count of questions and answers
 *      tags:
 *          - Section
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: The ID of the section to retrieve
 *      responses:
 *          200:
 *              description: Success
 */




/**
 * @swagger
 *
 * /section/:
 *  post:
 *      summary: Create new section
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
 *                          - status
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: Title of topic
 *                          status:
 *                              type: string
 *                              enum: [Draft, Published]
 *                              description: Status of topic
 *      responses:
 *          200:
 *              description: Success
 */

/**
 * @swagger
 *
 * /section/{id}:
 *  patch:
 *      summary: Update section
 *      tags:
 *          - Section
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: The ID of the section to retrieve
 *      requestBody:
 *          required: false
 *          content:
 *              application/x-www-form-urlencoded:
 *                 schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: Title of topic
 *                          status:
 *                              type: string
 *                              enum: [Draft, Published]
 *                              description: Status of topic (optional for update)
 *      responses:
 *          200:
 *              description: Success
 */


/**
 * @swagger
 *
 * /section/{id}:
 *  delete:
 *      summary: delete section and its topics and count of questions and answers
 *      tags:
 *          - Section
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: The ID of the section to retrieve
 *      responses:
 *          200:
 *              description: success
 */
