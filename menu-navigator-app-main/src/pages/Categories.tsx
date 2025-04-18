
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

interface Category {
  id: number;
  name: string;
  short_name: string;
}

const Categories = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch('https://coursera-jhu-default-rtdb.firebaseio.com/categories.json');
      const data = await response.json();
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-48 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E6DC] to-white">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-[#7D2E2E] mb-8 text-center">Menu Categories</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories?.map((category: Category) => (
            <Link
              key={category.id}
              to={`/items/${category.short_name}`}
              className="block bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold text-[#7D2E2E] mb-3">{category.name}</h2>
              <p className="text-gray-600">Click to view menu items</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
