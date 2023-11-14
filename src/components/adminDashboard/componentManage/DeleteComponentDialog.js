import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'
import { del } from '../../../utils/httpClient'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
export default function DeleteComponentDialog({open, handleClose, component, eventRefresh}) {
    const handleDelete = (component) => {
        if(!component || !component.id) return;
        del(`/Components/${component.id}`).then(res => {
            withReactContent(Swal).fire({
                title: "Delete component successfully!",
                icon: "success"
              }).then(() => {eventRefresh()});
        }).catch(err => {
            withReactContent(Swal).fire({
                title: "Delete component failed!",
                icon: "error"
              })
        });
    };
  return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete component with id:" + component?.id}
        </DialogTitle>
        <DialogContent>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={() => {
            handleClose();
            handleDelete(component);
          }} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
  )
}
