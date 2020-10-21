/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';

import ExploreServerCard from './ExploreServerCard';
import exploreModalStyle from '../styles/exploreModal';
import globalImg from '../../../assets/global.jpg';
import gamesImg from '../../../assets/wow.jpg';
import landscape1 from '../../../assets/landscape1.jpg';
import landscape2 from '../../../assets/landscape2.jpg';
import landscape3 from '../../../assets/landscape3.jpg';

const useStyles = makeStyles(exploreModalStyle);

interface SearchResult {
  serverName: string;
  onlineUsers: number;
  totalUsers: number;
  channelCount: number;
  messageCount: number;
  img: string;
  description: string;
  subscribed: boolean;
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
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni veritatis soluta eveniet obcaecati porro explicabo.';

const ExploreModal = ({ modalOpen, setModalOpen }: Props) => {
  const classes = useStyles();

  const { name } = useSelector((state: RootState) => state.user);
  const [inputText, setInputText] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  // Get all servers, actually limited to 20 without filtering
  const getServers = async () => {
    try {
      const response = await axios.get('/exploreServers', {
        params: { name, text: inputText },
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      return console.error(err);
    }
  };

  // Default and games is set img/desc
  // Assign others randomly
  const setImgDescToServerResults = (servers: SearchResult[]) => {
    servers.forEach((server: SearchResult) => {
      if (server.serverName === 'Default') {
        server.img = globalImg;
        server.description = defaultDescription;
      } else if (server.serverName === 'Games') {
        server.img = gamesImg;
        server.description = gamesDescription;
      } else {
        const random = Math.floor(Math.random() * Math.floor(3));
        server.img = [landscape1, landscape2, landscape3][random];
        server.description = otherDescription;
      }
    });
  };

  useEffect(() => {
    let mounted = true;

    if (!modalOpen) return;

    // Throttle requests
    const timeoutId = setTimeout(() => {
      getServers().then((servers) => {
        setImgDescToServerResults(servers);
        if (mounted) setSearchResults(servers);
      });
    }, 100);

    return function cleanUp() {
      clearTimeout(timeoutId);
      mounted = false;
    };
  }, [modalOpen, inputText]);

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Modal
      className={classes.modal}
      open={modalOpen}
      onClose={closeModal}
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
              <ExploreServerCard key={key} res={res} setModalOpen={setModalOpen} />
            ))}
          </div>
        </div>
      </Slide>
    </Modal>
  );
};

export default ExploreModal;
