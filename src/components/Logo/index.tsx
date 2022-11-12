import { Link } from "react-router-dom";

type Props = {};

const Logo = (props: Props) => {
  return (
    <Link to="/" className="flex flex-col items-center">
      <img
        src="/pngs/logo.png"
        className="w-auto h-12"
        alt="shopping cart logo"
      />
      <img className="w-48" src="/pngs/logo-brand.png" alt="merquelio logo" />
    </Link>
  );
};

export default Logo;
