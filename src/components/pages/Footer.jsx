import { Box } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{     position: 'fixed', bottom: 0, backgroundColor: 'skyblue', width: '100vw', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
        <h1>footer</h1>
      </Box>
  );
};

export default Footer;