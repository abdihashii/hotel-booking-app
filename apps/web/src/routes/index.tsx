import { createFileRoute } from '@tanstack/react-router';

import { BookingPill } from '@/components/common/booking-pill';
import { AppLayout } from '@/components/layout/app-layout';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
    <AppLayout transparentHeader>
      <div className="aurora-bg w-full h-full flex flex-col items-center justify-center gap-8 px-4">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight">
            Find Your Perfect Stay
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto">
            Discover handpicked hotels for your next unforgettable trip
          </p>
        </div>
        <BookingPill />
      </div>
    </AppLayout>
  );
}
