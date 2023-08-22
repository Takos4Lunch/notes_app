/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users available
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
 *                        role: 
 *                          type: string
 *                          example: user
 *                        username: 
 *                          type: string
 *                          example: jhontest
 *                        password: 
 *                          type: string
 *                          example: $2a$10$dOdLbLWWZL6DJLZlR/FriOohvlKZ4sfvk0iJQp9PnWt/8AkqJDkuC
 *                        email: 
 *                          type: string
 *                          example: jhon@test.com
 *   post:
 *     summary: create an user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 description: The user's role, which grants different access levels
 *                 example: user
 *               username:
 *                 type: string
 *                 description: The desired username for the user
 *                 example: johntest
 *               password:
 *                 type: string
 *                 description: The desired password for the user
 *                 example: password123
 *               email:
 *                 type: string
 *                 description: The user's email address
 *                 example: johntest@email.com
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
 *                        username: 
 *                          type: string
 *                          example: jhontest
 *                        email: 
 *                          type: string
 *                          example: jhon@test.com
 * /user/{id}:
 *   get:
 *     summary: Get a specific user based on the provided ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve
 *         schema:
 *           type: integer
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
 *                        role: 
 *                          type: string
 *                          example: user
 *                        username: 
 *                          type: string
 *                          example: jhontest
 *                        password: 
 *                          type: string
 *                          example: $2a$10$dOdLbLWWZL6DJLZlR/FriOohvlKZ4sfvk0iJQp9PnWt/8AkqJDkuC
 *                        email: 
 *                          type: string
 *                          example: jhon@test.com
 *   patch:
 *     summary: Modifies an existing user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to modify
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 description: The user's role, which grants different access levels
 *                 example: user
 *               username:
 *                 type: string
 *                 description: The desired username for the user
 *                 example: johntest
 *               email:
 *                 type: string
 *                 description: The user's email address
 *                 example: johntest@email.com
 *     responses:
 *        '200':
 *          description: on success, returns the ID of the modified user
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    description: the ID of the modified user
 *                    example: 1
 *   delete:
 *     summary: deletes an user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to delete
 *         schema:
 *           type: integer
 *     responses:
 *        '200':
 *          description: on success, returns the ID of the deleted user
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    description: the ID of the modified user
 *                    example: 1
 */