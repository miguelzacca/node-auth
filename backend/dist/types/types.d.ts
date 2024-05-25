import { Model } from "sequelize";
export interface Obj {
    [key: string]: string;
}
export interface InputData extends Obj {
}
export interface UserModel extends Model {
    [key: string]: any;
}
