
import registerImg from "/images/118.jpg"; 
import Form from "../../componets/auth/Form";


const RegisterForm = () => {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-rose-100 p-4">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col lg:flex-row w-full max-w-4xl overflow-hidden border border-gray-100">
        
        {/* Left Section - Image */}
        <div className="flex-1 bg-blue-50 p-8 flex flex-col justify-center items-center text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Join Y-Desserts!</h1>
          <p className="text-gray-600 mb-6">Create your account and start exploring our delicious desserts</p>
          <img
            src={registerImg}
            alt="Register"
            className="rounded-xl shadow-lg w-64 h-64 object-cover"
          />
        </div>

        {/* Right Section - Form */}
        <div className="flex-1 p-8 flex flex-col justify-center bg-gray-50">
          <Form/>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
