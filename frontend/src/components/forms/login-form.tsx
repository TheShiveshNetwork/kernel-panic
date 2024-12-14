import { userSchema } from "@/validators/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";

type LoginFormProps = {
    handleLogin: (data: FieldValues) => void;
};

export function LoginForm({ handleLogin }: LoginFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors: formErrors },
    } = useForm({
        resolver: zodResolver(userSchema),
    });

    return (
        <form
            onSubmit={handleSubmit(async (data) => {
                handleLogin(data);
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
                type="password"
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
    )
};
