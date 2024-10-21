import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  return (
    <div>
      Error
      <p>{error.statusText || error.message}</p>
    </div>
  );
};

export default Error;
