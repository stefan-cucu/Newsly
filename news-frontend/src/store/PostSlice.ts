// Post store slice

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import auth from "../config/firebase.config";

export interface NewsPost {
    postid: string;
    title: string;
    content: string;
    createdAt: string;
    tags: string;
    user: any;
}

export interface NewsPostStorage {
    posts: NewsPost[];
    loaded: boolean;
}

const initialState: NewsPostStorage = {
    posts: [],
    loaded: false,
};

// Handle loading of posts
export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts",
    async (tags: string | null, { rejectWithValue }) => {
        try {
            const token = await auth.currentUser?.getIdToken();
            if(token === null || token === undefined) {
                throw new Error("No token");
            }
            const url = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? "http://localhost:8080/api/posts" : "/api/posts";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    tags: tags,
                }),
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error);
        }
    }
);

// Handle new post
export const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<NewsPost[]>) => {
            state.posts = action.payload;
        },
        addPost: (state, action: PayloadAction<NewsPost>) => {
            state.posts.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.loaded = true;
        });
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.posts = [];
            state.loaded = true;
        });
    },
});

export const { setPosts, addPost } = postSlice.actions;

export const getPosts = (state: any) => state.posts;
export const getPostsLoaded = (state: any) => state.loaded;
export const getPost = (state: any, id: string) =>
    state.posts.find((post: any) => post.postid === id);

export default postSlice.reducer;