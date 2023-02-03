
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class TranslateInput {
    text: string;
    source: string;
    target: string;
}

export class SignupInput {
    name: string;
    email: string;
    profilePicture: string;
    language: string;
}

export abstract class IQuery {
    abstract translate(input: TranslateInput): string | Promise<string>;

    abstract getUser(): User | Promise<User>;
}

export class User {
    id: string;
    name: string;
    email: string;
    profilePicture: string;
    language: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export abstract class IMutation {
    abstract signup(input: SignupInput): string | Promise<string>;
}

export type DateTime = any;
type Nullable<T> = T | null;
