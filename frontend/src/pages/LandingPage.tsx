import { Navigate, useNavigate } from 'react-router-dom';
import backgroundVideo from "../assets/12679207_1920_1080_30fps.mp4";
import profilePic from "../assets/profile.png";
import { FieldValues } from 'react-hook-form';
import { PanicApi } from '@/api';
import { toast } from 'react-toastify';
import Loading from '@/components/loading';
import { useAuth } from '@/hooks/use-auth';
import { config } from '@/config';
import { LoginForm } from '@/components/forms/login-form';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, loading: authLoading } = useAuth();

  async function handleLogin(data: FieldValues) {
    await PanicApi.post('/user/login', data)
      .then((response) => {
        if (response.status == 200) {
          toast.success("Login successful!");
          setIsLoggedIn(true);
          navigate(config.routes.gamePageRoute, { replace: true });
        } else {
          toast.error(response.data.message);
        }
      }).catch((error) => {
        console.log(error);
        toast.error("An error occurred. Please try again later.");
      });
  }

  if (authLoading) {
    return <Loading />;
  }

  if (isLoggedIn) {
    return <Navigate to={config.routes.gamePageRoute} replace />;
  }

  return (
    <div className="home-container flex flex-col items-center justify-center min-h-screen bg-no-repeat bg-cover bg-fixed bg-center text-white text-center overflow-hidden">
      <video autoPlay muted loop className="absolute w-auto min-w-full min-h-full max-w-none">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <div className="w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-gray-800 shadow-2xl transform hover:scale-110 transition duration-300">
          <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-4xl font-bold mb-3 text-gray-100 animate-fadeIn">Welcome to Kernel Panic!</h1>
        <p className="instructions mb-5 text-xl text-gray-300">
          Enter your details and embark on your journey through life decisions impacting your Money, Health, and Happiness!
        </p>
        <LoginForm handleLogin={handleLogin} />
        <div className="rules mt-8 p-6 bg-black bg-opacity-80 rounded-lg shadow-2xl text-lg text-gray-300 transition duration-500 hover:bg-opacity-90">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Game Rules</h2>
          <ul className="list-decimal list-inside space-y-2">
            <li className="hover:text-white transition-colors duration-300">Rule 1: Every choice impacts your scores.</li>
            <li className="hover:text-white transition-colors duration-300">Rule 2: Optimize your happiness, health, and wealth scores through wise decisions.</li>
            <li className="hover:text-white transition-colors duration-300">Rule 3: Navigate through the game to determine your final outcomes.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
