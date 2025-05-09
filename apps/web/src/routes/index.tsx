import { createFileRoute } from '@tanstack/react-router';

import { AppLayout } from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useRooms } from '@/hooks/use-rooms';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  const { data: rooms, isPending } = useRooms();

  return (
    <AppLayout>
      <div className="flex flex-col gap-4 w-1/2 mx-auto">
        <h2 className="text-2xl font-bold">Rooms</h2>
        <div className="grid grid-cols-3 gap-4">
          {isPending
            ? (
                Array.from({ length: 3 }).map(() => (
                  <Card key={`${Math.random()}`}>
                    <CardHeader>
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-10 w-full" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-10 w-full" />
                    </CardContent>
                  </Card>
                ))
              )
            : (
                rooms?.map((room) => (
                  <Card key={room.id}>
                    <CardHeader>
                      <CardTitle>{room.name}</CardTitle>
                      <CardDescription className="line-clamp-2 h-10">
                        {room.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" variant="outline">
                        Book
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
        </div>
      </div>
    </AppLayout>
  );
}
