import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';
 
const Api = "http://65.108.148.136:8080/ToDo";

export const getData = createAsyncThunk("TodoSlice/getData", async (search) => {
  try {
    const { data } = await axios.get(search ? `${Api}/get-to-dos?ToDoName=${search}` : `${Api}/get-to-dos`);
    return data;
  } catch (error) {
    toast.error("Failed to fetch data");
    throw error;
  }
});

export const postData = createAsyncThunk("TodoSlice/postData", async (obj, { dispatch }) => {
  let form = new FormData();
  form.append(`Images`, obj.img);
  form.append(`Name`, obj.name);
  form.append(`Description`, obj.desc);

  try {
    const { data } = await axios.post(`${Api}/add-to-do`, form);
    dispatch(getData());
    toast.success("Todo added successfully!");
    return data;
  } catch (error) {
    toast.error("Failed to add todo");
    throw error;
  }
});

export const EditData = createAsyncThunk("TodoSlice/editData", async (obj, { dispatch }) => {
  let user = {
    name: obj.name,
    description: obj.description,
    id: obj.id,
  };

  try {
    const { data } = await axios.put(`${Api}/update-to-do`, user);
    dispatch(getData());
    toast.success("Todo edited successfully!");
    return data;
  } catch (error) {
    toast.error("Failed to edit todo");
    throw error;
  }
});

export const checked = createAsyncThunk("TodoSlice/checked", async (id, { dispatch, getState }) => {
  const todo = getState().TodoSlice.data.find(todo => todo.id === id);
  try {
    const { data } = await axios.put(`${Api}/is-completed?id=${id}`, { isCompleted: !todo.isCompleted });
    dispatch(getData());
    toast.success("Todo status updated successfully!");
    return data;
  } catch (error) {
    toast.error("Failed to update todo status");
    throw error;
  }
});


export const deleteImg = createAsyncThunk("TodoSlice/deleteImg", async (id, { dispatch }) => {
  try {
    const { data } = await axios.delete(`${Api}/delete-to-do-image?imageId=${id}`);
    dispatch(getData());
    toast.success("Image deleted successfully!");
    return data;
  } catch (error) {
    toast.error("Failed to delete image");
    throw error;
  }
});

export const getById = createAsyncThunk('TodoSlice/getById' , async (id)=> {
  try {
    let {data} = await axios.get(`${Api}/get-to-do-by-id?id=${id}`)
    return data
    
  } catch (error) {
    console.error(error);
  }
})

export const deleteData = createAsyncThunk("TodoSlice/deleteData", async (id, { dispatch }) => {
  try {
    const { data } = await axios.delete(`${Api}/delete-to-do?id=${id}`);
    console.log(data);
    dispatch(getData());
    toast.success("Todo deleted successfully!");
   
  } catch (error) {
    toast.error("Failed to delete todo");
    throw error;
  }
});

export const TodoSlice = createSlice({
  name: "TodoSlice",
  initialState: {
    data: [],
    databyId: [],
    loading: false,
    addName: "",
    addDescription: "",
    addImg: null,
    open: false,
    base64: [],
    editName: '',
    editDescription: '',
    editImg: null,
    editOpen: false,
    editingTodo: null,
  },
  reducers: {
    setAddName(state, action) {
      state.addName = action.payload;
    },
    setAddDescription(state, action) {
      state.addDescription = action.payload;
    },
    setAddImg(state, action) {
      state.addImg = action.payload;
    },
    setOpen(state, action) {
      state.open = action.payload;
    },
    setBase64(state, action) {
      state.base64 = action.payload;
    },
    setEditName(state, action) {
      state.editName = action.payload;
    },
    setEditDescription(state, action) {
      state.editDescription = action.payload;
    },
    setEditImg(state, action) {
      state.editImg = action.payload;
    },
    setEditingTodo(state, action) {
      state.editingTodo = action.payload;
    },
    setEditOpen(state, action) {
      state.editOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload?.data || [];
        state.loading = false;
      })
      .addCase(getData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        state.data = state.data.filter(todo => todo.id !== action.meta.arg);
      })
      .addCase(deleteImg.fulfilled, (state, action) => {
        const updatedTodos = state.data.map(todo => {
          if (todo.images) {
            todo.images = todo.images.filter(img => img.id !== action.meta.arg);
          }
          return todo;
        });
        state.data = updatedTodos;
      })
      .addCase(EditData.fulfilled, (state, action) => {
        const updatedTodos = state.data.map(todo =>
          todo.id === action.payload.id ? action.payload : todo
        );
        state.data = updatedTodos;
      });
      builder
      .addCase(getById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.databyId = action.payload?.data || [];
        state.loading = false;
      })
      .addCase(getById.rejected, (state) => {
        state.loading = false;
      });
    
  },
});

export const { setOpen, setAddImg, setAddDescription, setAddName, setEditOpen, setBase64, setEditDescription, setEditImg, setEditName, setEditingTodo } = TodoSlice.actions;

export default TodoSlice.reducer;
