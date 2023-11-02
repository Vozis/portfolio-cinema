import { NextPage } from 'next';

export type TypeRoles = {
  isOnlyAdmin?: boolean;
  isOnlyUser?: boolean;
};

export type NextPageAuth<T = {}> = NextPage<T> & TypeRoles;

export type TypeComponentAuthFields = { Component: TypeRoles };
