import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom';

function ErrorMessage() {
  const navigate = useNavigate();
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? error.statusText
    : error instanceof Error
    ? error.message
    : 'Unknown error';

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{message}</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default ErrorMessage;
