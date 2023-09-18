import React from 'react';

function EmptyPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-4 rounded shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800">Page Not Found</h1>
        <p className="text-gray-600">Sorry, the page you are looking for does not exist.</p>
      </div>
    </div>
  );
}

export default EmptyPage;
