import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ================= REGISTER =================

export const userRegister = createAsyncThunk("register", async (data, { rejectWithValue }) => {
  console.log(data);
  const response = await fetch("https://api-jwttoken-crud-backend-project.onrender.com/user/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    }
  );

  try {
    const result = await response.json();
    console.log(result);
    if (!response.ok) {
      return rejectWithValue(result.message);
    }

    return result;

  } catch (error) {
    return rejectWithValue("Server error");

    // return error;
  }
});

// ================= LOGIN =================

// export const userLogin = createAsyncThunk(
//   "login",
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await fetch(
//         "https://api-jwttoken-crud-backend-project.onrender.com/user/login",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         }
//       );

//       const result = await response.json();
//       console.log(result);

//       if (!response.ok) {
//         return rejectWithValue(result.message || "Login failed");
//       }

//       if (result.jwtToken) {
//         localStorage.setItem("token", result.jwtToken);
//       }

//       return result;

//     } catch (error) {
//       return rejectWithValue("Server error");
//     }
//   }
// );

export const userLogin = createAsyncThunk("login", async (data, { rejectWithValue }) => {
  console.log(data);
  
 try {
  const response = await fetch("https://api-jwttoken-crud-backend-project.onrender.com/user/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

 
    const result = await response.json();
    console.log(result);
    
    if(result.jwtToken){
      localStorage.setItem("token", result.jwtToken)
    }
    return result;

  } catch (error) {
    return rejectWithValue("Login failed");
    // return error;
  }
});

// ================= USER SLICE =================
export const UserSlice = createSlice({
  name: "USER",
  initialState: {
    isLoading: false,
    data: [],
    token: localStorage.getItem("token"),
    error: null,
  },

  reducers: {
    logout: (state) => {
      state.data = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    // -------- REGISTER --------

    builder.addCase(userRegister.pending, (state) => {
      state.isLoading = true;
      state.error = null;

    }),
      builder.addCase(userRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      }),
      builder.addCase(userRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // -------- LOGIN --------

    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
      state.error = null;

    }),
      builder.addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.jwtToken;
        state.error = null;

      }),
      builder.addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default UserSlice.reducer;


// export const userLogin = createAsyncThunk("login", async (data, { rejectWithValue }) => {
//   console.log(data);
  
//  try {
//   const response = await fetch("https://api-jwttoken-crud-backend-project.onrender.com/user/login",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     }
//   );

 
//     const result = await response.json();
//     console.log(result);
    
//     if(result.jwtToken){
//       localStorage.setItem("token", result.jwtToken)
//     }
//     return result;

//   } catch (error) {
//     return rejectWithValue("Login failed");
//     // return error;
//   }
// });

