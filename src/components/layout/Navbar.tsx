import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/useAuth";

const Navbar = () => {
  const { logout, user } = useAuth();

  return (
    <div className="w-full bg-white border-b shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          SelfVerto
        </Link>
        <Link to="/profile" className="text-gray-700 font-medium">
          Profile
        </Link>

        {/* Right */}
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">{user?.name}</span>

          <Button className="bg-grey" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
