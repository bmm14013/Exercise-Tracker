import * as exercises from './exercises_model.mjs';
import express from 'express';

const PORT = 3000;

const app = express();

app.use(express.json());

//Create new exercise
app.post('/exercises', (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: `Exercise could not be created due to ${error}`});
        });
});

//Retrieve collection
app.get('/exercises', (req, res) => {
    let filter = [];
    exercises.findExercises(filter)
        .then(exercises => {
            res.send(exercises);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: `Request failed. Could not retrieve exercises due to ${error}`});
        });
});

//Update an exercise
app.put('/exercises/:_id', (req, res) => {
    exercises.replaceExercise(req.params._id, req.body)
        .then(numUpdated => {
            res.json({ _id: req.params._id, name: req.body.name, reps: req.body.reps,
                weight: req.body.weight, unit: req.body.unit, date: req.body.date });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: `Request failed. Could not update exercise due to ${error}`});
        });
});

//Delete an exercise
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteExerciseById(req.params._id)
    .then(deletedCount => {
        res.status(204).send();
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ Error: `Reqeust failed. Could not delete exercise due to ${error}`});
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
})