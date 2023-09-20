import React from 'react';

function AdminPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-blue-900 w-64 p-4 text-white">
        <h1 className="text-2xl font-semibold">Admin Panel</h1>
        <ul className="mt-4 space-y-2">
          <li className="hover:bg-blue-700 p-2 rounded">
            <a href="#">Dashboard</a>
          </li>
          <li className="hover:bg-blue-700 p-2 rounded">
            <a href="#">Users</a>
          </li>
          <li className="hover:bg-blue-700 p-2 rounded">
            <a href="#">Products</a>
          </li>
          {/* Add more menu items as needed */}
        </ul>
      </aside>

      {/* Content */}
      <main className="flex-1 p-4">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
        {/* Content for the dashboard */}
      </main>
    </div>
  );
}

export default AdminPage;
