import { Router } from "express";
import { createTask , getTasks , deleteTask , updateTask , getTask , getTaskByUser} from "../controller/tasks.js";


const  router = Router();


router.get('/',getTasks);
router.post('/',createTask);
router.put('/:id',updateTask);
router.delete('/:id' ,deleteTask);
router.get('/:id' ,getTask);
router.get('/:userId',getTaskByUser);


export default router;