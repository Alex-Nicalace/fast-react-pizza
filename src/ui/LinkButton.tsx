import { Link, useNavigate } from "react-router-dom";

interface ILinkButtonProps {
  children: React.ReactNode;
  to: string | number;
}

function LinkButton({ children, to }: ILinkButtonProps): JSX.Element {
  const navigate = useNavigate();
  const className = "text-sm text-blue-500 hover:text-blue-500 hover:underline";

  if (typeof to === "number")
    return (
      <button className={className} onClick={() => navigate(to)}>
        {children}
      </button>
    );

  return (
    <Link className={className} to={to}>
      {children}
    </Link>
  );
}

export default LinkButton;
