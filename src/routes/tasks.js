import { Router } from "express";
import { createTask , getTasks , deleteTask , updateTask , getTask , getTaskByUser} from "../controller/tasks.js";
import { protect } from "../middlewares/auth.js";


const  router = Router();


router.get('/',getTasks);
router.post('/',protect, createTask);
router.get('/:id' , getTask);
router.get('/:userId',getTaskByUser);
router.put('/:id',updateTask);
router.delete('/:id' , deleteTask);


export default router;