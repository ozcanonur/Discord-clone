import createStyles from '@material-ui/core/styles/createStyles';
import bgImage from '../../../assets/discordBg.jpg';

const loginStyles = createStyles({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#242424',
    backgroundImage: 'url(' + bgImage + ')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',

    '@media (min-width: 1600px)': {},
  },
  loginContainer: {
    width: '55rem',
    position: 'absolute',
    left: '25%',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 9,
  },
});

export default loginStyles;
