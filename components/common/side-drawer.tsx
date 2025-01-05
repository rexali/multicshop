import * as React from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useMediaQuery } from "react-responsive";


type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function SideDrawer({ children, searchCallback }: { children: any, searchCallback: any }) {
  const isMobile = useMediaQuery({ maxDeviceWidth: 1023 });


  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: true,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : isMobile ? 360 : 860 }}
      role="presentation"
    // onClick={toggleDrawer(anchor, false)}
    // onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box textAlign={'right'} >
        <Button onClick={() => {
          toggleDrawer(anchor, false);
          searchCallback(false);
        }
        } startIcon={<CloseIcon />} >
          Close
        </Button>
      </Box>
      {children}
    </Box>
  );

  return (
    <div >
      {(['right'] as const).map((anchor) => (
        <React.Fragment key={anchor} >
          {/* <div key={anchor} onClick={toggleDrawer(anchor, false)}> */}
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            variant='persistent'
          >
            {list(anchor)}
          </Drawer>
          {/* </div> */}
        </React.Fragment>
      ))}
    </div>
  );
}