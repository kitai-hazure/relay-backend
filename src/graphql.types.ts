
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

export class ChatUser {
    id: string;
    socketId: string;
    userId: string;
    latitude: number;
    longitude: number;
}

export class Person {
    distance: number;
    user: ChatUser;
}

export abstract class IQuery {
    abstract findPeople(): Person[] | Promise<Person[]>;

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
