import Joi from "joi"
import { generalValidationRule } from "../../utils/general.validation.rule.js"

export const getAllTasksSchema = {

    query: Joi.object(
    {
        page: Joi.number(),
        limit: Joi.number(),
        status: Joi.string().valid("pending", "completed", "all"),
        priority: Joi.string().valid("low", "medium", "high"),
        dueDate: Joi.string().isoDate(),
    }),
    headres: generalValidationRule.headersRule
}

export const createTaskSchema = 
{
    body: Joi.object(
    {
        title: Joi.string().required(),
        description: Joi.string().required(),
        assignedTo: generalValidationRule.dbId.required(),
        priority: Joi.string().valid("low", "medium", "high"),
        dueDate: Joi.string().isoDate()
    }),
    headres: generalValidationRule.headersRule
}

export const getTaskByIdSchema =
{
    params: Joi.object(
    {
        id: generalValidationRule.dbId.required()
    }),
    headres: generalValidationRule.headersRule
}

export const updateTaskSchema =
{
    params: Joi.object(
    {
        id: generalValidationRule.dbId.required()
    }),
    body: Joi.object(
    {
        title: Joi.string(),
        description: Joi.string(),
        assignedTo: generalValidationRule.dbId,
        dueDate: Joi.string().isoDate()
    }),
    headres: generalValidationRule.headersRule
}

export const deleteTaskSchema =
{
    params: Joi.object(
    {
        id: generalValidationRule.dbId.required()
    }),
    headres: generalValidationRule.headersRule
}

export const completeTaskSchema =
{
    params: Joi.object(
    {
        id: generalValidationRule.dbId.required()
    }),
    headres: generalValidationRule.headersRule
}

export const uncompleteTaskSchema =
{
    params: Joi.object(
    {
        id: generalValidationRule.dbId.required()
    }),
    headres: generalValidationRule.headersRule
}

export const updatePrioritySchema =
{
    params: Joi.object(
    {
        id: generalValidationRule.dbId.required()
    }),
    body: Joi.object(
    {
        priority: Joi.string().valid("low", "medium", "high").required()
    }),
    headres: generalValidationRule.headersRule
}