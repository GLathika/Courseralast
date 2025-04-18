
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#F5E6DC] to-white">
      <div className="text-center max-w-2xl px-4">
        <h1 className="text-5xl font-bold mb-6 text-[#7D2E2E]">
          Welcome to Bistro Délice
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Explore our carefully curated menu featuring the finest dishes from our kitchen
        </p>
        <Link
          to="/categories"
          className="inline-block bg-[#7D2E2E] text-white px-8 py-3 rounded-lg hover:bg-[#6D1E1E] transition-colors duration-300 text-lg"
        >
          View Menu Categories
        </Link>
      </div>
    </div>
  );
};

export default Home;
