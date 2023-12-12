import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function ErrorMessage() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? error.statusText
    : error instanceof Error
      ? error.message
      : "Unknown error";

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{message}</p>
      <LinkButton to={-1}>&larr; Go back</LinkButton>
    </div>
  );
}

export default ErrorMessage;
