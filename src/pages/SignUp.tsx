
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  favoriteItem: z.string().min(1, 'Please enter your favorite menu item')
});

const SignUp = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<z.infer<typeof formSchema> | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      favoriteItem: ''
    }
  });

  const { data: menuItem, isLoading } = useQuery({
    queryKey: ['menuItem', form.watch('favoriteItem')],
    queryFn: async () => {
      const shortName = form.watch('favoriteItem').charAt(0);
      const itemNumber = parseInt(form.watch('favoriteItem').slice(1)) - 1;
      
      if (!shortName || isNaN(itemNumber)) return null;
      
      const response = await fetch(
        `https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/${shortName}/menu_items/${itemNumber}.json`
      );
      return response.json();
    },
    enabled: form.watch('favoriteItem').length > 0
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!menuItem) {
      toast.error('No such menu item exists');
      return;
    }
    
    localStorage.setItem('userInfo', JSON.stringify({ ...values, menuItem }));
    setUserInfo({ ...values, menuItem });
    toast.success('Your information has been saved');
    navigate('/my-info');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E6DC] to-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-[#7D2E2E] mb-8 text-center">Sign Up for Updates</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="favoriteItem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Favorite Menu Item (e.g., L1, SP2)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  {form.watch('favoriteItem') && !menuItem && !isLoading && (
                    <FormMessage>No such menu number exists</FormMessage>
                  )}
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
