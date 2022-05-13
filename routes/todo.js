import express from "express";
import Todo from '../models/Todo.js';

const router = express.Router();

router.route('/')
    .get(async(req, res, next) => {
        try {
            let skip = req.query.skip;

            //removes skip from request so that it is not a criteria with the find method
            delete req.query.skip;

            //.sort({ createdAt: -1 }) bad because the client is doing the sort not the server
            // 1 = ascending, -1 = descending 
            let data = await Todo.find(req.query).skip(+skip).limit(20); //+skip to make it  a number

            res.json(data);

        } catch (error) {
            next(error);
        }

    })
    .post(async(req, res, next) => {
        let todo = req.body;
        console.log(todo);

        const newTodo = new Todo(todo);
        try {

            await newTodo.save();

            res.json(newTodo);

        } catch (error) {
            next(error);
        }
    });

// todo/id
router.route('/:id')
    .put(async(req, res, next) => {
        try {

            if (false && req.body.title == null) { //if we do not want the title to be edited
                let err = new Error('Title cannot be edited');
                err.status = 500;
                throw err;
            }
            let updatedData = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(updatedData);

        } catch (error) {
            next(error);
        }

    })
    .delete(async(req, res, next) => {
        try {


            let deletedData = await Todo.findByIdAndRemove(req.params.id);
            res.json(deletedData);

        } catch (error) {
            next(error);
        }

    })
router.get('/count', async(req, res, next) => {
    try {
        let count = await Todo.countDocuments(req.query);

        res.json({ count });

    } catch (error) {
        next(error);
    }

});


// .delete((req, res, next) => {
//     let data = Todo.findByIdAndDelete(req.params.id, (error, data) => {
//         if (error) {
//             next(error);
//         } else {
//             console.log("DELETED SUCCESSFUL");
//             res.json({
//                 message: data
//             });;
//         }
//     });
// });



export default router;