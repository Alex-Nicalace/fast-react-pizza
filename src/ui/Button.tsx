import { ButtonHTMLAttributes } from "react";
import { Link, LinkProps } from "react-router-dom";

type XOR<T extends unknown[], U = T[number]> = T extends [
  infer Head,
  ...infer Tail,
]
  ?
      | (Head & {
          [K in keyof U]?: K extends keyof Head ? Head[K] : never;
        })
      | XOR<Tail, U>
  : never;

type ButtonProps = XOR<[ButtonHTMLAttributes<HTMLButtonElement>, LinkProps]> & {
  mode?: "primary" | "small";
};

function Button(props: ButtonProps): JSX.Element {
  // const className = `inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide
  //   text-stone-800 transition-colors duration-300 hover:bg-yellow-300
  //   focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300
  //   focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-4`;

  const mode = props.mode || "primary";

  const base = `inline-block rounded-full bg-yellow-400 font-semibold uppercase tracking-wide 
    text-stone-800 transition-colors duration-300 hover:bg-yellow-300 
    focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 
    focus:ring-offset-2 disabled:cursor-not-allowed`;

  const styles = {
    primary: base + ` px-4 py-3 md:px-6 md:py-4`,
    small: base + ` px-4 py-2 md:px-5 md:py-2.5 text-xs`,
  };

  if (isLinkProps(props)) {
    return (
      <Link className={styles[mode]} {...props}>
        {props.children}
      </Link>
    );
  }

  return (
    <button className={styles[mode]} {...props}>
      {props.children}
    </button>
  );
}

export default Button;

function isLinkProps(obj: any): obj is LinkProps {
  return "to" in obj; // Здесь используется как пример проверка на наличие свойства 'type' равного 'button'
}