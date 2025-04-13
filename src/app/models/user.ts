import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import { sequelize } from "@/app/db";
import Bot from "./bot";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: number;
    declare username: string;
    declare password: string;
    declare email: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare bots?: NonAttribute<Bot[]>; 
}

User.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            autoIncrement: false,
            primaryKey: true,
        },
        username: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        password: {
            type: new DataTypes.STRING(256),
            allowNull: false,
        },
        email: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, 
    {
        sequelize: sequelize,
        tableName: 'users',
        timestamps: true,
    }
);

User.hasMany(Bot, {
    sourceKey: 'id',
    foreignKey: 'ownerId',
});


export { User };
export default User;