"use strict";

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Course extends Model{}
    Course.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A title is required'
                },
                notEmpty: {
                    msg: 'Please provide a title'
                },
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A description is required'
                },
                notEmpty: {
                    msg: 'Please provide a description'
                },
            },
        },
        estimatedTime: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        materialsNeeded: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: "Course"
    });

    //Associate with Belongs To
    Course.associate = (models) => {
        Course.belongsTo(models.User, {
            foreignKey: {
                field: "userId",
            },
        });
    }

    return Course;
}