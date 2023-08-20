const Joi = require('joi');

const id = Joi.number();
const category = Joi.string().alphanum().min(4).max(20).required();
const body = Joi.string().max(200).required();

const createNoteSchema = Joi.object({
    category,
    body
})

const updateNoteSchema = Joi.object({
    category,
    body,
})

const getNoteSchema = Joi.object({
    id: id.required(),
})

module.exports = { createNoteSchema, updateNoteSchema, getNoteSchema }