import { Router } from "express"

import expressAsyncHandler from "express-async-handler"
import { validation } from "../../middlewares/validation.middleware.js"
import { auth } from "../../middlewares/auth.middleware.js";
import { endPointsRoles } from "./task.endpoints.js";
import * as taskController from './task.controller.js'
import * as taskValidationSchema from './task.validationSchemas.js'

const router = Router();

router.get('/', 
validation(taskValidationSchema.getAllTasksSchema),
auth(endPointsRoles.USER_PERMS),
expressAsyncHandler(taskController.getAllTasks))

router.post('/', 
validation(taskValidationSchema.createTaskSchema),
auth(endPointsRoles.USER_PERMS),
expressAsyncHandler(taskController.createTask))

router.get('/:id',
validation(taskValidationSchema.getTaskByIdSchema),
auth(endPointsRoles.USER_PERMS),
expressAsyncHandler(taskController.getTaskById))

router.patch('/:id',
validation(taskValidationSchema.updateTaskSchema),
auth(endPointsRoles.USER_PERMS),
expressAsyncHandler(taskController.updateTask))

router.delete('/:id',
validation(taskValidationSchema.deleteTaskSchema),
auth(endPointsRoles.USER_PERMS),
expressAsyncHandler(taskController.deleteTask))

router.patch('/complete/:id',
validation(taskValidationSchema.completeTaskSchema),
auth(endPointsRoles.USER_PERMS),
expressAsyncHandler(taskController.completeTask))

router.patch('/uncomplete/:id',
validation(taskValidationSchema.uncompleteTaskSchema),
auth(endPointsRoles.USER_PERMS),
expressAsyncHandler(taskController.uncompleteTask))


export default router;