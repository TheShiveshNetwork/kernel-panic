import { Navigate, useNavigate } from 'react-router-dom';
import backgroundImage from "../assets/bg1.jpg";
// import profilePic from "../assets/profile.png";
import { FieldValues } from 'react-hook-form';
import { PanicApi } from '@/api';
import { toast } from 'react-toastify';
// import Loading from '@/components/loading';
import Loader from '@/components/loader';
import { useAuth } from '@/hooks/use-auth';
import { config } from '@/config';
import { LoginForm } from '@/components/forms/login-form';
import { useState } from 'react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { isLoggedIn, setIsLoggedIn, loading: authLoading } = useAuth();

  async function handleLogin(data: FieldValues) {
    setLoading(true);
    await PanicApi.post('/user/login', data)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Login successful!");
          setIsLoggedIn(true);
          navigate(config.routes.gamePageRoute, { replace: true });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (authLoading) {
    return <Loader />;
  }

  if (isLoggedIn) {
    return <Navigate to={config.routes.gamePageRoute} replace />;
  }

  return (
    <div
      className="home-container flex flex-col items-center justify-center min-h-screen text-white text-center overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative w-full h-full flex flex-col lg:flex-row justify-center items-center px-4 sm:px-8">
        {/* Left Section */}
        <div className="flex flex-col items-center w-full lg:w-2/3 bg-gray-900 bg-opacity-90 p-4 sm:p-6 rounded-lg shadow-lg my-6 lg:my-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold mb-3 text-green-400 animate-fadeIn">
            Welcome to Kernel Panic!
          </h1>
          <p className="instructions mb-5 text-sm sm:text-base md:text-lg font-mono text-gray-400">
            Enter your details and embark on your journey through life decisions impacting your 
            <span className="text-green-400"> Money</span>, <span className="text-green-400">Health</span>, and <span className="text-green-400">Happiness</span>!
          </p>

          {/* Rules Section */}
          <div className="rules mt-6 p-4 sm:p-6 bg-gray-900 bg-opacity-90 rounded-lg shadow-lg text-xs sm:text-sm md:text-lg text-gray-300 w-full max-w-xs sm:max-w-3xl">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-green-400 mb-4">$ game_rules</h2>
            <pre className="text-left font-mono whitespace-pre-line">
              <span className="text-green-400">#</span> Rules to play Kernel Panic: {"\n"}
              <span className="text-green-400">1.</span> Every choice impacts your scores.{"\n"}
              <span className="text-green-400">2.</span> Optimize your happiness, health, and wealth through wise decisions.{"\n"}
              <span className="text-green-400">3.</span> Navigate through the game to determine your final outcomes.{"\n"}
            </pre>
          </div>
        </div>

        {/* Right Section: Login Form */}
        <div className="login-form-container w-full sm:w-4/5 md:w-3/4 lg:w-1/3 bg-black bg-opacity-80 p-6 sm:p-8 rounded-lg shadow-2xl my-6 lg:my-0">
          <h2 className="text-lg sm:text-xl md:text-2xl font-mono text-green-400 mb-4 sm:mb-6">Login</h2>
          <div className="flex flex-col space-y-4">
            <LoginForm handleLogin={handleLogin} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
