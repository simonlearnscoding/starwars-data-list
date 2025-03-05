import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div> {/* Title */}
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div> {/* Row 1 */}
      <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div> {/* Row 2 */}
      <div className="h-4 bg-gray-300 rounded w-1/3"></div> {/* Row 3 */}
    </div>
  );
};

export default SkeletonLoader;
