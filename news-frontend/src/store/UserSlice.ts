// User store slice
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import auth from "../config/firebase.config";

export interface User {
  userid: string;
  username: string;
  role: string;
  tags: string;
}

const initialState: User = {
  userid: "",
  username: "",
  role: "",
  tags: "",
};

// Handle user data fetching
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userid: string | undefined, { rejectWithValue }) => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const url =
        !process.env.NODE_ENV || process.env.NODE_ENV === "development"
          ? "http://localhost:8080/api/users"
          : "/api/users";
      const response = await fetch(`${url}/${userid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Add tags to database
export const addTags = createAsyncThunk(
  "user/addTags",
  async (tags: string, { rejectWithValue }) => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const url =
        !process.env.NODE_ENV || process.env.NODE_ENV === "development"
          ? "http://localhost:8080/api/users"
          : "/api/users";
      const response = await fetch(`${url}/${auth.currentUser?.uid}/tags`, {
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
      return rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.userid = action.payload.userid;
      state.username = action.payload.username;
      state.role = action.payload.role;
      if (action.payload.tags) {
        state.tags = action.payload.tags;
      } else {
        state.tags = "";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.userid = action.payload.userid;
      state.username = action.payload.username;
      state.role = action.payload.role;
      if (action.payload.tags) {
        state.tags = action.payload.tags;
      } else {
        state.tags = "";
      }
      console.log(action.payload.tags);
    });
    builder.addCase(addTags.fulfilled, (state, action) => {
      if (action.payload.tags) {
        state.tags = action.payload.tags;
      } else {
        state.tags = "";
      }
    });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
