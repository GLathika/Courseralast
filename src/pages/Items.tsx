
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price_small?: number;
  price_large?: number;
}

const Items = () => {
  const { categoryId } = useParams();

  const { data: items, isLoading } = useQuery({
    queryKey: ['items', categoryId],
    queryFn: async () => {
      const response = await fetch(
        `https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/${categoryId}.json`
      );
      const data = await response.json();
      return data?.menu_items || [];
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-48 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E6DC] to-white">
      <div className="container mx-auto p-6">
        <Link
          to="/categories"
          className="inline-flex items-center text-[#7D2E2E] hover:text-[#6D1E1E] mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Categories
        </Link>
        <h1 className="text-4xl font-bold text-[#7D2E2E] mb-8 text-center">Menu Items</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items?.map((item: MenuItem) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-[#7D2E2E] mb-3">{item.name}</h2>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="flex justify-between text-[#D4AF37] font-semibold">
                {item.price_small && <span>Small: ${item.price_small.toFixed(2)}</span>}
                {item.price_large && <span>Large: ${item.price_large.toFixed(2)}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Items;
