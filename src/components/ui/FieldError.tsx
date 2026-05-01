interface FieldErrorProps {
  message?: string;
}

const FieldError = ({ message }: FieldErrorProps) => {
  if (!message) {
    return null;
  }

  return <p className="mt-1 text-xs font-medium text-danger">{message}</p>;
};

export default FieldError;
