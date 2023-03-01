import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';


export default function CreateCourse({ context }) {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState([]);

    
}