import DataTable from '@/components/DataTable/index';
import { Outlet } from 'react-router-dom';

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <DataTable />
      <Outlet />
    </div>
  );
}
