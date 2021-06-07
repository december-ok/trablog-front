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
  avatarImg: Scalars['String'];
  description: Scalars['String'];
};

export type CreateUserOutput = {
  __typename?: 'CreateUserOutput';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};


export type DeletePostInput = {
  id: Scalars['Int'];
};

export type DeletePostOutput = {
  __typename?: 'DeletePostOutput';
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

export type GetPostsInput = {
  skipFrom: Scalars['Int'];
};

export type GetPostsOutput = {
  __typename?: 'GetPostsOutput';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  postList?: Maybe<Array<Post>>;
};

export type GetUserPostsInput = {
  id: Scalars['Int'];
  skipFrom: Scalars['Int'];
};

export type GetUserPostsOutput = {
  __typename?: 'GetUserPostsOutput';
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
  getPosts: GetPostsOutput;
  getUserPosts: GetUserPostsOutput;
  createPost: CreatePostOutput;
  searchPost: SearchPostOutput;
  tagSearchPost: TagSearchPostOutput;
  deletePost: DeletePostOutput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationGetPostsArgs = {
  input: GetPostsInput;
};


export type MutationGetUserPostsArgs = {
  input: GetUserPostsInput;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationSearchPostArgs = {
  input: SearchPostInput;
};


export type MutationTagSearchPostArgs = {
  input: TagSearchPostInput;
};


export type MutationDeletePostArgs = {
  input: DeletePostInput;
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
  skipFrom: Scalars['Int'];
};

export type SearchPostOutput = {
  __typename?: 'SearchPostOutput';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  postList?: Maybe<Array<Post>>;
};

export type TagSearchPostInput = {
  tag: Scalars['String'];
  skipFrom: Scalars['Int'];
};

export type TagSearchPostOutput = {
  __typename?: 'TagSearchPostOutput';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  postList?: Maybe<Array<Post>>;
  searchTerm?: Maybe<Scalars['String']>;
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
