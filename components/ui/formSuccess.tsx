import { Alert } from "@mui/material";

interface SuccessProps {
  message: string | undefined;
}

const FormSuccess: React.FC<SuccessProps> = ({ message }) => {
  if (message) {
    return (
      <Alert severity="success">
        {message}
      </Alert>
    );
  }
  else {
    return null
  }
};

export default FormSuccess;
