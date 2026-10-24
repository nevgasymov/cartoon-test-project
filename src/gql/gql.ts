/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetCharacter($id: ID!) {\n    character(id: $id) {\n      ...CharacterDetails_Character\n    }\n  }\n": typeof types.GetCharacterDocument,
    "\n  query GetCharacters($page: Int, $filter: FilterCharacter) {\n    characters(page: $page, filter: $filter) {\n      info {\n        count\n        pages\n      }\n      results {\n        id\n        ...CharacterCard_Character\n      }\n    }\n  }\n": typeof types.GetCharactersDocument,
    "\n  fragment CharacterCard_Character on Character {\n    id\n    name\n    image\n    status\n    species\n  }\n": typeof types.CharacterCard_CharacterFragmentDoc,
    "\n  fragment CharacterDetails_Character on Character {\n    id\n    name\n    image\n    status\n    species\n    type\n    gender\n    origin {\n      name\n      dimension\n    }\n    location {\n      name\n      dimension\n    }\n    episode {\n      id\n      name\n      episode\n      air_date\n    }\n  }\n": typeof types.CharacterDetails_CharacterFragmentDoc,
};
const documents: Documents = {
    "\n  query GetCharacter($id: ID!) {\n    character(id: $id) {\n      ...CharacterDetails_Character\n    }\n  }\n": types.GetCharacterDocument,
    "\n  query GetCharacters($page: Int, $filter: FilterCharacter) {\n    characters(page: $page, filter: $filter) {\n      info {\n        count\n        pages\n      }\n      results {\n        id\n        ...CharacterCard_Character\n      }\n    }\n  }\n": types.GetCharactersDocument,
    "\n  fragment CharacterCard_Character on Character {\n    id\n    name\n    image\n    status\n    species\n  }\n": types.CharacterCard_CharacterFragmentDoc,
    "\n  fragment CharacterDetails_Character on Character {\n    id\n    name\n    image\n    status\n    species\n    type\n    gender\n    origin {\n      name\n      dimension\n    }\n    location {\n      name\n      dimension\n    }\n    episode {\n      id\n      name\n      episode\n      air_date\n    }\n  }\n": types.CharacterDetails_CharacterFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCharacter($id: ID!) {\n    character(id: $id) {\n      ...CharacterDetails_Character\n    }\n  }\n"): (typeof documents)["\n  query GetCharacter($id: ID!) {\n    character(id: $id) {\n      ...CharacterDetails_Character\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCharacters($page: Int, $filter: FilterCharacter) {\n    characters(page: $page, filter: $filter) {\n      info {\n        count\n        pages\n      }\n      results {\n        id\n        ...CharacterCard_Character\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCharacters($page: Int, $filter: FilterCharacter) {\n    characters(page: $page, filter: $filter) {\n      info {\n        count\n        pages\n      }\n      results {\n        id\n        ...CharacterCard_Character\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CharacterCard_Character on Character {\n    id\n    name\n    image\n    status\n    species\n  }\n"): (typeof documents)["\n  fragment CharacterCard_Character on Character {\n    id\n    name\n    image\n    status\n    species\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CharacterDetails_Character on Character {\n    id\n    name\n    image\n    status\n    species\n    type\n    gender\n    origin {\n      name\n      dimension\n    }\n    location {\n      name\n      dimension\n    }\n    episode {\n      id\n      name\n      episode\n      air_date\n    }\n  }\n"): (typeof documents)["\n  fragment CharacterDetails_Character on Character {\n    id\n    name\n    image\n    status\n    species\n    type\n    gender\n    origin {\n      name\n      dimension\n    }\n    location {\n      name\n      dimension\n    }\n    episode {\n      id\n      name\n      episode\n      air_date\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;