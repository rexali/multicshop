'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 340,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function DeleleModal({ cb, closeCallback, refreshCallback }: { cb: any, closeCallback: any, refreshCallback: any }) {
    const [open, setOpen] = React.useState(true);
    const [result, setResult] = React.useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        closeCallback(false);
        setOpen(false);
    };

    const handleDeletion = async () => {
        // run delete callback, etc and set state of the op. success or failed
        setResult(await cb());
        refreshCallback()
    }

    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/* <Box sx={{ textAlign: 'right' }}> <Button onClick={() => closeCallback(false)} >X</Button></Box> */}
                    <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={'center'}>
                        {!result ? "Want to delete this item?" : "Deleted successfully"}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button variant='contained' onClick={() => closeCallback(false)} color='success'>No</Button>
                        <Button variant='contained' onClick={handleDeletion} color='warning'>{!result ? 'Yes' : 'Close'}</Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
