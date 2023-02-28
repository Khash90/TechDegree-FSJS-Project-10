"use strict";

const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
    class User extends Model {}

    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'FirstName is required'
                },
                notEmpty: {
                    msg: 'Please provide a FirstName'
                }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'LastName is required'
                },
                notEmpty: {
                    msg: 'Please provide a LastName'
                }
            }
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'the Email you entered already exists'
            },
            validate: {
                notNull: {
                    msg: 'An email is required'
                },
                notEmpty: {
                    msg: 'Please provide a valid Email'
                },
                isEmail: {
                    msg: 'Please provide a valid email address'
                  },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Password is required'
                },
                notEmpty: {
                    msg: 'Please provide a password'
                },
            },
            set(val){
                const hashedPassword = bcrypt.hashSync(val, 10);
                this.setDataValue("password", hashedPassword)
            },
        },
    }, {
        sequelize,
        modelName: "User"
        
        });

    //Associate hasMany
    User.associate = (models) => {
        User.hasMany(models.Course, {
            foreignKey: {
                fieldName: 'userId',
                allowNull: false,
            },
        });
    };
        
    return User;
}