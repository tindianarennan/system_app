import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 bg-gray-100 min-h-screen p-8">
        <Outlet />
      </main>
    </div>
  );
}