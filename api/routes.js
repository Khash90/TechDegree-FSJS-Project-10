'use strict';

//Import modules
const express = require('express');


//express router
const router = express.Router();


//Import models
const { User, Course } = require('./models');
const { asyncHandler } = require('./middleware/async-handler');
const { authenticateUser } = require("./middleware/auth-user");


/***************/
/* USER ROUTES */
/***************/

//Get all properties and values for the currently authenticated User

router.get('/users', authenticateUser ,asyncHandler(async(req,res) => {

    const user = req.currentUser;
    res.status(200).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress
    });
 })
);

//create new user , setting location header to "/" 
router.post("/users", asyncHandler(async(req,res) => {
    try {
        await User.create(req.body);
        res.location("/");
        res.json({message: 'Account successfully created'});
        res.status(201).end();
    } catch (error) {
        if(error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
            const errors = error.errors.map((err) => err.message);
            res.status(400).json({ errors })
        } else {
            throw error;
        }
     }
  })
);


/*****************/
/* COURSE ROUTES */
/*****************/
const AssociateOptions = {
    model: User
}

const userExclusions = {
    attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
    },
}

//GET all courses including associated user for each
router.get("/courses", asyncHandler(async(req,res) => {
    const course = await Course.findAll({
        include: [
        {
            ...AssociateOptions,
            ...userExclusions,
        },
       ],
       attributes: {exclude: ['createdAt', 'updatedAt', 'userId']}
    });
    if (course){
        res.json(course);
    } else {
        res.status(404).json({ message: "Course not found." })
    }
  })
);

//GET specific course and associated user
router.get("/courses/:id", asyncHandler(async(req,res) => {
    const course = await Course.findOne({
        where: {
            id: req.params.id,
        },
        include: [
            {
                ...AssociateOptions,
                ...userExclusions,
            },
        ],
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        },
    });
    if(course){
        res.json(course);
    } else {
        res.status(404).json({ message: "No course found with mentioned id" })
    }
  })
);

// POST new course
router.post("/courses", authenticateUser, asyncHandler(async(req,res) => {
    try {
        const user = req.currentUser;
        const course = await Course.create({
            title: req.body.title,
            description: req.body.description,
            estimatedTime: req.body.estimatedTime,
            materialsNeeded: req.body.materialsNeeded,
            userId: user.id,
        });
        res.status(201).location(`courses/${course.id}`).end();

    } catch (error) {
        if (
            error.name === 'SequelizeValidationError' || 
            error.name === 'SequelizeUniqueConstraintError') {
                const errors = error.errors.map((err) => err.message);
                res.status(400).json({ errors });
        } else {
            res.status(500).json({message: 'cannot add course to the database'})
        }
    }
 })
);

//Update specific course
router.put("/courses/:id", authenticateUser , asyncHandler(async(req,res) => {
  try {
    const user = req.currentUser;
    const course = await Course.findOne({
        where:{
            id: req.params.id,
        }
    });
    if(course.userId === user.id) {
        await course.update(req.body)
        res.status(204).end()
    } else {
        res.status(403).json({message: `you dont have permission to edit "${course.title}" `}).end()
    }

  } catch (error) {
    if(error.name === 'SequelizeValidationError' ||
       error.name === 'SequelizeUniqueConstraintError') {
        const errors = error.errors.map((err) => err.message);
                res.status(400).json({ errors });
       } else {
        res.status(500).json({message: 'cannot add course to the database'})
    }
  }
}));


//Delete course
router.delete('/courses/:id', authenticateUser , asyncHandler(async(req,res) => {
    const user = req.currentUser;
    const course = await Course.findOne({
        where:{
            id: req.params.id,
        }
    });

    if(course.userId === user.id){
        await course.destroy()
        res.status(204).end()
    } else {
        res.status(403).json({message: `You dont have permission to delete "${course.title}" `}).end()
    }
}));


module.exports = router;