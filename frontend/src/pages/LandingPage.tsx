import { Navigate, useNavigate } from 'react-router-dom';
import backgroundVideo from "../assets/12679207_1920_1080_30fps.mp4";
import profilePic from "../assets/profile.png";
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PanicApi } from '@/api';
import { userSchema } from '@/validators/user';
import { toast } from 'react-toastify';
import Loading from '@/components/loading';
import { useAuth } from '@/hooks/use-auth';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { token, loading: authLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  if (authLoading) {
    return <Loading />;
  }

  if (token) {
    return <Navigate to="/panic" replace />;
  }

  async function handleLogin(data: FieldValues) {
    try {
      const response = await PanicApi.post('/user/login', data);
      // console.log(response.data);
      if (response.status == 201) {
        toast.success("Login successful!");
        localStorage.setItem("token", response.data.token);
        navigate("/panic");
      } else {
        toast.error(response.data.message);
      }
    } catch (error: Error | unknown) {
      console.log(error);
      toast.error("An error occurred. Please try again later.");
    }
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
        <form
          onSubmit={handleSubmit(async (data) => {
            await handleLogin(data);
          })}
          className="form-container flex flex-col items-center bg-black bg-opacity-80 p-8 rounded-lg shadow-2xl w-96"
        >
          <input
            {...register('email')}
            placeholder="Enter Email"
            className="bg-gray-900 bg-opacity-50 border-b-4 border-blue-500 focus:border-blue-400 focus:outline-none transition duration-300 p-3 text-lg text-white rounded-md mb-4 w-full"
            aria-label="Enter your email"
          />
          {formErrors.email?.message && <p className="text-red-500 mb-4">{formErrors.email?.message as string}</p>}
          <input
            {...register("password")}
            placeholder="Enter Password"
            className="bg-gray-900 bg-opacity-50 border-b-4 border-blue-500 focus:border-blue-400 focus:outline-none transition duration-300 p-3 text-lg text-white rounded-md mb-4 w-full"
            aria-label="Enter your password"
          />
          {formErrors.password?.message && <p className="text-red-500 mb-4">{formErrors.password?.message as string}</p>}
          <button
            type='submit'
            className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white font-bold py-3 px-6 rounded-full shadow-lg transform hover:-translate-y-1 transition duration-300"
            aria-label="Start the game"
          >
            Enter the Game
          </button>
        </form>
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
