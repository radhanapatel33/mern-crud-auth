import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const token = () => localStorage.getItem('token');
console.log(token());


// All Data Read
export const getReadAllData = createAsyncThunk('readData', async (_, { rejectWithValue }) => {
    try {
        let response = await fetch('https://api-jwttoken-crud-backend-project.onrender.com/students/', {
            method: "GET",
            headers: {
                "authorization": `Bearer ${token()}`,
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) {
            return rejectWithValue({
                status: response.status,
                message: "Not authorized",
            });
        }
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        return rejectWithValue(error.message);
    }
});

//insert data

export const insertData = createAsyncThunk(
    'insertData',
    async (formData, { rejectWithValue }) => {
        try {
            let response = await fetch(
                'https://api-jwttoken-crud-backend-project.onrender.com/students/',
                {
                    method: "POST",
                    headers: {
                        "authorization": `Bearer ${token()}`,
                    },
                    body: formData
                }
            );
            let result = await response.json();
            console.log(result);
            return result;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    });

// Update Data
export const updateUserData = createAsyncThunk('updateData', async ({ id, formData }, { rejectWithValue }) => {
    let response = await fetch(`https://api-jwttoken-crud-backend-project.onrender.com/students/${id}`, {
        method: "PUT",
        headers: {
            "authorization": `Bearer ${token()}`,
        },
        body: formData
    });

    try {
        let result = await response.json();
        return result;
    }
    catch (error) {
        return rejectWithValue(error.message);
    }
});

// Delete Data
export const deleteUserData = createAsyncThunk('daletedata', async (_id, { rejectWithValue }) => {
    try {
        let response = await fetch(`https://api-jwttoken-crud-backend-project.onrender.com/students/${_id}`, {
            method: 'DELETE',
            headers: {
                "authorization": `Bearer ${token()
                    }`,
            }
        });
        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        return await response.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
}
);


// -------------------------------------------------------------------------------------------


export const CurdSlice = createSlice({
    name: 'CURD',
    initialState: {
        isLoading: false,
        data: [],
        // search: [],
        search: "",
        error: null
    },

    // search by Data

    reducers: {
        searchByData: (state, action) => {
            state.search = action.payload
        }
    },

    extraReducers: (builder) => {
        // Read Data
        builder.addCase(getReadAllData.pending, (state) => {
            state.isLoading = true;
        }),
            builder.addCase(getReadAllData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload
            }),
            builder.addCase(getReadAllData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })

        //Insert data
        builder.addCase(insertData.pending, (state) => {
            state.isLoading = true;
        }),
            builder.addCase(insertData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data.push(action.payload);
            }),
            builder.addCase(insertData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            });

        //Update data
        builder.addCase(updateUserData.pending, (state) => {
            state.isLoading = true;
        }),
            builder.addCase(updateUserData.fulfilled, (state, action) => {
                state.isLoading = false;
                const updatedStudent = action.payload;
                state.data = state.data.map((student) =>
                    student._id == updatedStudent._id ? updatedStudent : student);
            }),
            builder.addCase(updateUserData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })

        //delete data

        builder.addCase(deleteUserData.pending, (state) => {
            state.isLoading = true;
        }),
            builder.addCase(deleteUserData.fulfilled, (state, action) => {
                state.isLoading = false;
                const deletedStudent = action.payload;
                state.data = state.data.filter(student => student._id !== deletedStudent._id);
            }),
            builder.addCase(deleteUserData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })
    }
});

export default CurdSlice.reducer;
export const { searchByData } = CurdSlice.actions;


