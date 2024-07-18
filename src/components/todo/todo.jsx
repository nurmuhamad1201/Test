import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import { EditData, deleteData, deleteImg, getData, setEditName, setEditDescription, setEditOpen, setEditingTodo, checked } from "../../todoSlise/todoSlice";
import Add from "../add/add";
import { Box, Button, Card, CardContent, CardMedia, Checkbox, Container, Grid, LinearProgress, Modal, TextField, Typography } from "@mui/material";
import { Link } from 'react-router-dom';

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

const Todo = () => {
  const ImageApi = "http://65.108.148.136:8080/images";
  const dispatch = useDispatch();
  const data = useSelector((state) => state.TodoSlice.data);
  const loading = useSelector((state) => state.TodoSlice.loading);
  const editName = useSelector((state) => state.TodoSlice.editName);
  const editDescription = useSelector((state) => state.TodoSlice.editDescription);
  const editOpen = useSelector((state) => state.TodoSlice.editOpen);
  const editingTodo = useSelector((state) => state.TodoSlice.editingTodo);

  const [search1, setSearch1] = useState("");
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  useEffect(() => {
    if (loading) {
      const timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
      }, 800);
      return () => clearInterval(timer);
    }
  }, [loading]);

  const handleSearch = () => {
    dispatch(getData(search1));
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteData(id)).unwrap();
      toast.success("Todo deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete todo.");
    }
  };

  const handleDeleteImage = async (id) => {
    try {
      await dispatch(deleteImg(id)).unwrap();
      toast.success("Image deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete image.");
    }
  };

  const handleEdit = (todo) => {
    dispatch(setEditingTodo(todo));
    dispatch(setEditName(todo.name));
    dispatch(setEditDescription(todo.description));
    dispatch(setEditOpen(true));
  };

  const handleEditSubmit = async () => {
    try {
      await dispatch(EditData({ id: editingTodo.id, name: editName, description: editDescription })).unwrap();
      dispatch(setEditOpen(false));
      toast.success("Todo edited successfully!");
    } catch (error) {
      toast.error("Failed to edit todo.");
    }
  };

  const handleCheckboxChange = (id) => {
    dispatch(checked(id));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="background.default">
        <Box textAlign="center">
          <Typography variant="h5" color="textPrimary">
            Loading...
          </Typography>
          <Box mt={2}>
            <LinearProgressWithLabel value={progress} />
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Container className=' py-[30px] '>
      <ToastContainer />
     
      <Box mb={4} display="flex" justifyContent={'space-around'} alignItems="center">
      <Typography variant="h4" gutterBottom>Test</Typography>
      <div className=' w-[50%]  flex items-center '> 
         <TextField
         value={search1}
          onChange={(e) => setSearch1(e.target.value)}
          type="search"
          variant="outlined"
          placeholder="Search..."
          className=' rounded-[50px] '
        />
        <Button onClick={handleSearch} variant="outlined" color="primary" style={{ marginLeft: '8px', height: "40px" }}>
          Search
        </Button></div>
      </Box>
      <Add />
      <Grid container spacing={3}>
        {data.map((elem) => (
          <Grid item xs={12} md={6} lg={4} key={elem.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" color={elem.isCompleted ? 'error' : 'textPrimary'}>
                  {elem.name}
                </Typography>
                <div>
                  {elem.images.map((img) => (
                    <CardMedia
                      key={img.id}
                      component="img"
                      alt=""
                      height="140"
                      image={`${ImageApi}/${img.imageName}`}
                      style={{ marginTop: '16px' }}
                    />
                  ))}
                  <Typography variant="body2" color="textSecondary">
                    {elem.description}
                  </Typography>
                </div>
                <Box mt={2} display="flex" alignItems="center">
                  <Button onClick={() => handleDelete(elem.id)} color="secondary">
                    Delete
                  </Button>
                  <Button onClick={() => handleDeleteImage(elem.images[0]?.id)} color="secondary">
                    DeleteImg
                  </Button>
                  <Button onClick={() => handleEdit(elem)} color="primary">
                    Edit
                  </Button>
                  <Checkbox
                    checked={elem.isCompleted}
                    onChange={() => handleCheckboxChange(elem.id)}
                    color="primary"
                  />
                  
                  <Button >
                  <Link to={`/home/${elem.id}`}>Info</Link></Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal
        open={editOpen}
        onClose={() => dispatch(setEditOpen(false))}
        aria-labelledby="edit-todo-modal"
        aria-describedby="edit-todo-form"
      >
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          bgcolor="background.paper"
          p={4}
          boxShadow={24}
          width="90%"
          maxWidth="500px"
        >
          <Typography variant="h6" id="edit-todo-modal">Edit Todo</Typography>
          <Box component="form" mt={2}>
            <TextField
              label="Name"
              value={editName}
              onChange={(e) => dispatch(setEditName(e.target.value))}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Description"
              value={editDescription}
              onChange={(e) => dispatch(setEditDescription(e.target.value))}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button onClick={() => dispatch(setEditOpen(false))} style={{ marginRight: '8px' }}>
                Cancel
              </Button>
              <Button onClick={handleEditSubmit} variant="contained" color="primary">
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default Todo;
