/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Slide from '@material-ui/core/Slide';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.grey[200]}`,
    minWidth: '200px',
    position: 'absolute',
    right: 0,
    boxShadow: '0px 3px 6px rgba(0,0,0,0.16)',
    borderRadius: '20px 0px 0px 0px',
    padding: '23px 17px',
    display: 'flex',
    flexDirection: 'column',
  },
  closeButton: {
    '&&': {
      width: 'fit-content',
      backgroundColor: theme.palette.grey[200],
      padding: '10px',
      marginBottom: '24px',
      display: 'inline-block',
      '&:hover': {
        backgroundColor: theme.palette.grey[400],
      },
    },
  },
  icon: {
    '&&': {fill: theme.palette.common.white},
  },
}));

type Props = {
  top: number,
  isShown: boolean,
  children: any,
  onClose: () => void,
};

const SideBar = (props: Props) => {
  const {top, isShown, children, onClose} = props;
  const classes = useStyles();

  return (
    <Slide direction="left" in={isShown} mountOnEnter unmountOnExit>
      <div
        className={classes.root}
        style={{top: top, height: `calc(100vh - ${top}px)`}}>
        <IconButton className={classes.closeButton} onClick={onClose}>
          <KeyboardArrowRightIcon className={classes.icon} fontSize="small" />
        </IconButton>
        {children}
      </div>
    </Slide>
  );
};

SideBar.defaultProps = {
  top: 0,
};

export default SideBar;
