import { Obj, UserModel } from "@types";
/**
 * @example
 * const inputValidated = validateInput(input)
 * @throws
 */
export declare const validateInput: (input: object) => {
    name?: string | undefined;
    email?: string | undefined;
    cpf?: string | undefined;
    passwd?: string | undefined;
};
/**
 * @async
 * @example
 * const user = await findUserByField({ name: "example" })
 */
export declare const findUserByField: (field: Obj, restrict?: boolean) => Promise<import("sequelize").Model<any, any> | null>;
/**
 * @example
 * const sanitizedInput = sanitizeInput(input)
 */
export declare const sanitizeInput: (input: Obj) => Obj;
/**
 * @example
 * updateUserField(user, { name: "example" })
 */
export declare const updateUserField: (user: UserModel, field: Obj) => Promise<UserModel>;
/**
 * @example
 * const id = jwtVerify(token)
 * @throws
 */
export declare const jwtVerify: (token: string) => any;
