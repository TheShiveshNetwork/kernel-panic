export function Spinner() {
    return (
        <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-green-400 rounded-full dark:text-green-400" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
        </div>
    );
};
