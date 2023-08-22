/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Get all notes available
 *     responses:
 *        '200':
 *          description: success
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  oneOf:   
 *                    - type: object
 *                      properties:
 *                        id: 
 *                          type: integer
 *                          format: int32
 *                          example: 1
 *                        body: 
 *                          type: string
 *                          example: This is a note
 *                        category: 
 *                          type: string
 *                          example: personal
 *                        UserId: 
 *                          type: string
 *                          example: 1
 *   post:
 *     summary: create an note
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               body: 
 *                 type: string
 *                 example: This is an example note
 *               category: 
 *                 type: string
 *                 example: personal
 *     responses:
 *        '200':
 *          description: success
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  oneOf:   
 *                    - type: object
 *                      properties:
 *                        id: 
 *                          type: integer
 *                          format: int32
 *                          example: 1
 *                        body: 
 *                          type: string
 *                          example: This is an example note
 *                        category: 
 *                          type: string
 *                          example: personal
 *                        UserId: 
 *                          type: string
 *                          example: 1
 * /notes/{id}:
 *   get:
 *     summary: Get a specific note based on the provided ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the note to retrieve
 *     responses:
 *        '200':
 *          description: success
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  oneOf:   
 *                    - type: object
 *                      properties:
 *                        id: 
 *                          type: integer
 *                          format: int32
 *                          example: 1
 *                        body: 
 *                          type: string
 *                          example: This is a note
 *                        category: 
 *                          type: string
 *                          example: personal
 *                        UserId: 
 *                          type: string
 *                          example: 1
 *   patch:
 *     summary: Modifies an existing note
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the note to retrieve
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               body: 
 *                 type: string
 *                 example: This is a note
 *               category: 
 *                 type: string
 *                 example: new personal
 *     responses:
 *        '200':
 *          description: on success, returns the ID of the modified note
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    description: the ID of the modified note
 *                    example: 1
 *   delete:
 *     summary: deletes an note
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the note to delete
 *     responses:
 *        '200':
 *          description: on success, returns the ID of the deleted note
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    description: the ID of the deleted note
 *                    example: 1
 */