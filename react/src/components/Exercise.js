import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

function Exercise({ exercise, onDelete, onEdit }) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td><MdEdit onClick={ () => onEdit(exercise)}></MdEdit></td>
            <td><MdDelete onClick={ () => onDelete(exercise._id)}></MdDelete></td>
        </tr>
    );
}

export default Exercise;