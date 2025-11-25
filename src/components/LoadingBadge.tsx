import { LoaderCircleIcon } from "lucide-react";

const LoadingBadge = () => {
    return (
        <div className="flex gap-2 rounded-sm p-2 text-2xl items-center animate-pulse">
            Loading
            <LoaderCircleIcon className="animate-spin mt-1" />
        </div>
    );
};

export default LoadingBadge;
