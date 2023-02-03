
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class User {
    id: string;
    name: string;
    email: string;
    profilePicture: string;
    language: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export abstract class IQuery {
    abstract getUser(): User | Promise<User>;
}

export type DateTime = any;
type Nullable<T> = T | null;
