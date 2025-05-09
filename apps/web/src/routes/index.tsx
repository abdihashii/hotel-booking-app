import { createFileRoute } from '@tanstack/react-router';

import { BookingPill } from '@/components/common/booking-pill';
import { AppLayout } from '@/components/layout/app-layout';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
    <AppLayout>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <BookingPill />
      </div>
    </AppLayout>
  );
}
