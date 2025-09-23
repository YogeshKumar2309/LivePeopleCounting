import { Loader } from "lucide-react";

const LoaderComponent = () => {
  return (
   <div className="flex items-center justify-center h-screen">
      {/* Loader Icon */}
      <Loader className="w-8 h-8 animate-spin text-blue-500" />
    </div>
  )
}

export default LoaderComponent