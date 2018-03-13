import * as sequelize from 'sequelize';

import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

import { BaseModelInterface } from '../interfaces/BaseModelInterface';

export interface UserAttibutes {

    id?: number;
    name?: string;
    email?: string;
    password?: string;
    photo?: string;
    createdAt?: string;
    updatedAt?: string;

}

export interface UserInstance extends sequelize.Instance<UserAttibutes>, UserAttibutes {

    isPassword(encodedPassword: string, password: string): boolean;

}

export interface UserModel extends BaseModelInterface, sequelize.Model<UserInstance, UserAttibutes> {}

export default (sequelize: sequelize.Sequelize, dataTypes: sequelize.DataTypes): UserModel => {
   
    const User: UserModel = sequelize.define('User', {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(128),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(128),
            allowNull: false,
            unique: true
        },
        password: {
            type: dataTypes.STRING(128),
            allowNull: false, 
            validate: {
                notEmpty: true
            }
        },
        photo: {
            type: dataTypes.BLOB({ length: 'long' }),
            allowNull: true,
            defaultValue: null
        },
    }, {
        tableName: 'users',
        hooks: {
            beforeCreate: (user: UserInstance, options: sequelize.CreateOptions): void => {
                const salt = genSaltSync();
                user.password = hashSync(user.password, salt);
            },
            beforeUpdate: (user: UserInstance, options: sequelize.CreateOptions): void => {
                if (user.changed('password')) {
                    const salt = genSaltSync();
                    user.password = hashSync(user.password, salt);
                }
            }
        }
    });

    User.prototype.isPassword = (encodedPassword: string, password: string): boolean => {
        return compareSync(password, encodedPassword);
    };

    return User;
}
