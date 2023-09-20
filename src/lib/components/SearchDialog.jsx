import React, { useState } from 'react';

const SearchDialog = ({ isOpen, onClose, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <div className="modal-header">
                <h3 className="text-2xl font-semibold">Search</h3>
                <button
                  className="modal-close-btn"
                  onClick={onClose}
                >
                  &#215;
                </button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  placeholder="Enter search query"
                  className="w-full p-2 border rounded"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn-primary"
                  onClick={handleSearch}
                >
                  Search
                </button>
                <button
                  className="btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchDialog;
