import { Loader2 } from "lucide-react";

export const LoadingSpinner = () => {
    return (
        <div className="flex bg-background h-screen w-full items-center justify-center">
            <Loader2 className="animate-spin text-foreground h-12 w-12" />
        </div>
    );
};
