import { useDispatch, useSelector } from "react-redux";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Input } from "@mui/material";
import { postData, setAddDescription, setAddImg, setAddName,  setOpen } from "../../todoSlise/todoSlice";
import icons8add from '../add/img/icons8-add-user-80.png'
const Add = () => {
    const addName = useSelector(state => state.TodoSlice.addName);
    const addDescription = useSelector(state => state.TodoSlice.addDescription);
    const addImg = useSelector(state => state.TodoSlice.addImg);
    const open = useSelector(state => state.TodoSlice.open);
    const dispatch = useDispatch();

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        dispatch(setOpen(true));
    };

    const handleClose = () => {
        dispatch(setOpen(false));
    };

    const handleChangeImage = (event) => {
        const file = event.target.files[0];
        dispatch(setAddImg(file));
    }
  
    const handleAdd = () => {
        dispatch(postData({ name: addName, desc: addDescription, img: addImg }));
        handleClose(); 
        dispatch(setAddName(""));
        dispatch(setAddDescription(""));
        dispatch(setAddImg(null));
    };

 
    return (
        <div className=" py-[20px] ">
            <Button className="rounded-full " variant="outlined" onClick={handleClickOpen}>
           <img className=" size-[50px] " src={icons8add} alt="" />
            </Button>
            <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            className=" w-[100%]"
        >
            <DialogTitle id="responsive-dialog-title" className="font-bold text-lg">Add New Todo</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Input type="text" value={addName} onChange={(e) => dispatch(setAddName(e.target.value))} placeholder="Name..." className="w-full mb-2 p-2 border border-gray-300 rounded" />
                    <Input type="text" value={addDescription} onChange={(e) => dispatch(setAddDescription(e.target.value))} placeholder="Description..." className="w-full mb-2 p-2 border border-gray-300 rounded" />
                    <Input type="file" onChange={handleChangeImage} className="mb-2" />
                    {addImg && (
                        <img src={URL.createObjectURL(addImg)} alt="selected" className="mt-2 w-full h-auto object-cover rounded" />
                    )}
                </DialogContentText>
            </DialogContent>
            <DialogActions className="justify-between">
                <Button autoFocus onClick={handleClose}>Cancel</Button>
                <Button onClick={handleAdd} autoFocus>Add</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
};

export default Add;
