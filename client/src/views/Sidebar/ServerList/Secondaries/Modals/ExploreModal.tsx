import React, { useState, useEffect } from 'react';
import axios from 'axios';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';

import ExploreServer from './ExploreServer';
import globalImg from '../../../../../assets/global.jpg';
import gamesImg from '../../../../../assets/wow.jpg';
import landscape1 from '../../../../../assets/landscape1.jpg';
import landscape2 from '../../../../../assets/landscape2.jpg';
import landscape3 from '../../../../../assets/landscape3.jpg';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: 'rgb(54,57,63)',
    boxShadow: '0 1rem 1rem rgb(0, 0, 0)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '6px',
    outline: 'none',
    height: '90vh',
    width: '70vw',
  },
  inputContainer: {
    padding: '2rem',
    width: '100%',
  },
  input: {
    backgroundColor: 'rgb(114,118, 125)',
    borderRadius: '1rem',
    boxShadow: '0 1rem 1rem rgba(0, 0, 0, 0.2)',

    '& fieldset': {
      border: 'none',
    },

    '& .Mui-focused': {
      color: 'rgb(220,221,222)',
    },
  },
  inputProps: {
    fontSize: '2rem',
    color: 'rgb(220,221,222)',
    fontFamily: 'Whitney Medium, sans-serif',
  },
  serversContainer: {
    width: '100%',
    padding: '2rem',
    display: 'grid',
    gridGap: '2rem',
    gridTemplateColumns: 'repeat(auto-fill, minmax(248px, 1fr))',
    overflow: 'auto',
  },
});

interface SearchResult {
  serverName: string;
  onlineUsers: number;
  totalUsers: number;
  channelCount: number;
  messageCount: number;
  img: string;
  description: string;
}

interface Props {
  modalOpen: boolean;
  setModalOpen: (x: boolean) => void;
}

const defaultDescription =
  'A default channel where everyone can connect. Any user that launches the app will automatically subscribe to Default server.';
const gamesDescription =
  'Games eh? Discuss your favorite games and nerd out here. Any user that launches the app will automatically subscribe to Games server.';
const otherDescription =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni veritatis soluta eveniet obcaecati porro explicabo deleniti cumque quisquam aliquam nobis.';

const ExploreModal = ({ modalOpen, setModalOpen }: Props) => {
  const classes = useStyles();

  const [inputText, setInputText] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    let mounted = true;
    if (!modalOpen) return;

    const getServers = async () => {
      const serversResponse: any = await axios
        .get('/exploreServers')
        .catch((error) => console.log(error));

      // Set images/desc for the servers, kind of randomly.
      serversResponse.data[0].img = globalImg;
      serversResponse.data[0].description = defaultDescription;
      serversResponse.data[1].img = gamesImg;
      serversResponse.data[1].description = gamesDescription;
      for (let i = 2; i < serversResponse.data.length; i++) {
        const server = serversResponse.data[i];
        const random = Math.floor(Math.random() * Math.floor(2));
        server.img = [landscape1, landscape2, landscape3][random];
        server.description = otherDescription;
      }

      if (mounted) setSearchResults(serversResponse.data);
    };

    getServers();

    return function cleanUp() {
      mounted = false;
    };
  }, [modalOpen]);

  return (
    <Modal
      className={classes.modal}
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Slide in={modalOpen} direction='down'>
        <div className={classes.modalContainer}>
          <div className={classes.inputContainer}>
            <TextField
              className={classes.input}
              placeholder='Search for a server'
              variant='outlined'
              fullWidth
              InputProps={{
                className: classes.inputProps,
              }}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>
          <div className={classes.serversContainer}>
            {searchResults.map((res, key) => (
              <ExploreServer key={key} res={res} />
            ))}
          </div>
        </div>
      </Slide>
    </Modal>
  );
};

export default ExploreModal;
