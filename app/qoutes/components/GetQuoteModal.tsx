'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { AddQoute } from '../AddQoute';

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

export default function GetQouteModal({ closeCallback, productId }: { closeCallback: any, productId: any }) {
    const [open, setOpen] = React.useState(true);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        closeCallback(false);
        setOpen(false);
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AddQoute productId={productId} />
                </Box>
            </Modal>
        </div>
    );
}
