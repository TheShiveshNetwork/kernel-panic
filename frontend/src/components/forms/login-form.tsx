import { userSchema } from "@/validators/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { Spinner } from "../spinner";

type LoginFormProps = {
    handleLogin: (data: FieldValues) => void;
    loading: boolean;
};

export function LoginForm({ handleLogin, loading }: LoginFormProps) {
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
            className="form-container flex flex-col items-center bg-gray-900 bg-opacity-90 p-6 sm:p-8 rounded-lg shadow-2xl w-full max-w-sm font-mono"
        >
            <input
                {...register('email')}
                placeholder="Enter Email"
                className="bg-gray-800 text-green-400 font-mono border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none transition duration-300 p-3 rounded mb-4 w-full placeholder-gray-500"
                aria-label="Enter your email"
            />
            {formErrors.email?.message && (
                <p className="text-red-500 mb-4 font-mono text-sm sm:text-base">
                    {formErrors.email?.message as string}
                </p>
            )}
            <input
                {...register("password")}
                placeholder="Enter Password"
                type="password"
                className="bg-gray-800 text-green-400 font-mono border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none transition duration-300 p-3 rounded mb-4 w-full placeholder-gray-500"
                aria-label="Enter your password"
            />
            {formErrors.password?.message && (
                <p className="text-red-500 mb-4 font-mono text-sm sm:text-base">
                    {formErrors.password?.message as string}
                </p>
            )}
            <button
                type="submit"
                className="bg-gray-800 text-green-400 border border-gray-700 hover:border-green-500 hover:bg-gray-700 py-2 px-6 sm:px-8 rounded-full shadow-md transform hover:scale-105 transition duration-300 font-mono w-full sm:w-auto flex items-center justify-center"
                aria-label="Start the game"
                disabled={loading}
            >
                {!loading ? "Enter the Game" : <Spinner />}
            </button>
        </form>
    );
}
