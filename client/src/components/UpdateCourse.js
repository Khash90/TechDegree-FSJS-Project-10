import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";


export default function UpdateCourse({ context }) {
    
    //states
    const navigate = useNavigate()
    const {id} = useParams()

    const [course, setCourse] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState('');

    


}