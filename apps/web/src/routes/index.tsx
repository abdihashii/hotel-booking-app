import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import { AppLayout } from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase/supabase-client';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  const [rooms, setRooms] = useState<any[]>([]);

  const getRooms = async () => {
    const { data, error } = await supabase.from('rooms').select('*');
    if (error) {
      console.error(error);
    }
    return data;
  };

  useEffect(() => {
    getRooms().then((data) => {
      if (data) {
        setRooms(data);
      }
    });
  }, []);

  return (
    <AppLayout>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Rooms</h2>
        <div className="grid grid-cols-3 gap-4">
          {rooms.map((room) => (
            <Card key={room.id}>
              <CardHeader>
                <CardTitle>{room.name}</CardTitle>
                <CardDescription>{room.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  Book
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
