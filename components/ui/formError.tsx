import { Alert } from "@mui/material";

interface ErrorProps {
  message: string | undefined;
}

const FormError: React.FC<ErrorProps> = ({ message }) => {
  if (message) {
    return (
      <Alert severity="error">
        {message}
      </Alert>
    );
  }
  else {
    return null
  }
};

export default FormError;
