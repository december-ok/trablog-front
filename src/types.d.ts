export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type CreatePostInput = {
  title: Scalars['String'];
  tags: Array<Scalars['String']>;
  thumb?: Maybe<Scalars['String']>;
  body: Scalars['String'];
  text: Scalars['String'];
};

export type CreatePostOutput = {
  __typename?: 'CreatePostOutput';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  post?: Maybe<Post>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  nickName: Scalars['String'];
};

export type CreateUserOutput = {
  __typename?: 'CreateUserOutput';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};


export type GetPostInput = {
  id: Scalars['Int'];
};

export type GetPostOutput = {
  __typename?: 'GetPostOutput';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  post?: Maybe<Post>;
};

export type GetPostsOutput = {
  __typename?: 'GetPostsOutput';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  postList?: Maybe<Array<Post>>;
};

export type GetUserProfileInput = {
  id: Scalars['Int'];
};

export type GetUserProfileOutput = {
  __typename?: 'GetUserProfileOutput';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type MeOutput = {
  __typename?: 'MeOutput';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: CreateUserOutput;
  login: LoginOutput;
  createPost: CreatePostOutput;
  searchPost: SearchPostOutput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationSearchPostArgs = {
  input: SearchPostInput;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  title: Scalars['String'];
  tags: Array<Scalars['String']>;
  thumb: Scalars['String'];
  body: Scalars['String'];
  text: Scalars['String'];
  likes: Scalars['Float'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  getUserProfile: GetUserProfileOutput;
  me: MeOutput;
  getPosts: GetPostsOutput;
  getPost: GetPostOutput;
};


export type QueryGetUserProfileArgs = {
  input: GetUserProfileInput;
};


export type QueryGetPostArgs = {
  input: GetPostInput;
};

export type SearchPostInput = {
  search: Scalars['String'];
};

export type SearchPostOutput = {
  __typename?: 'SearchPostOutput';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  postList?: Maybe<Array<Post>>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  email: Scalars['String'];
  password: Scalars['String'];
  nickName: Scalars['String'];
  avatarImg: Scalars['String'];
  description: Scalars['String'];
  postList?: Maybe<Array<Post>>;
};
