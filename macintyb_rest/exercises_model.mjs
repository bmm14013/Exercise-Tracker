import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017/exercises",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

//Connect to database
const db = mongoose.connection;
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

//Define schema
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: {type: String, required: true },
    date: {type: String, required: true}
});

//Compile model from schema
const Exercise = mongoose.model("Exercise", exerciseSchema);

//Create exercise
const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date });
    return exercise.save();
}

//Retrieve exercises
const findExercises = async (filters) => {
    const query = Exercise.find();
    if(filters.length > 0){
        query.and(filters);
    }
    return query.exec();
}

//Replace/update exercise
const replaceExercise = async (id, updateObj) => {
    const filter = {"_id": id}
    let result = await Exercise.updateOne(filter, updateObj);
    return result.modifiedCount
}

//Delete exercise
const deleteExerciseById = async (id) => {
    const result = await Exercise.findByIdAndDelete(id)
    return result
}

export { createExercise, findExercises, replaceExercise, deleteExerciseById }