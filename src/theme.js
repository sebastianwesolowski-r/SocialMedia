import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
        main: "#2196F3"
    },
    secondary: {
        main: "#4DABF5"
    },
  },
  typography: {
      fontFamily: "'Asap', sans-serif",
      h3: {
          fontFamily: "'Poppins', sans-serif",
          fontWeight: "500",
          fontSize: "2.5rem"
      },
      h5: {
        fontSize: "1.8rem",
        color: "#FAFAFA"
      },
      h6: {
        fontSize: "1.5rem",
        letterSpacing: "0.4px"
      },
      subtitle1: {
          fontFamily: "'Poppins', sans-serif",
          fontWeight: "500"
      },
      subtitle2: {
        fontSize: "0.9rem",
        letterSpacing: "0.4px"
      },
      body1: {
        fontWeight: "500",
        letterSpacing: "0.4px",
      },
      body2: {
        fontSize: "0.8rem",
        fontWeight: "500",
        marginTop: "2px",
        marginLeft: "12px"
      }
  }
});

export default theme;