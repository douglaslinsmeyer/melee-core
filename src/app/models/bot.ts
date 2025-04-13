import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "@/app/db";
import { User } from "./user";

class Bot extends Model<InferAttributes<Bot>, InferCreationAttributes<Bot>> {
    declare id: number;
    declare name: string;
    declare description: string;
    declare createdAt: CreationOptional<Date>;;
    declare updatedAt: CreationOptional<Date>;;
    declare ownerId: ForeignKey<User['id']>;
}

Bot.init(
    {
        id: {
            type: 'UUIDV4',
            autoIncrement: false,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        description: {
            type: new DataTypes.STRING(256),
            allowNull: true,
        },

        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, 
    {
        sequelize: sequelize,
        timestamps: true,
    }
);

Bot.belongsTo(User, {
    foreignKey: 'ownerId',
});

export { Bot };
export default Bot;