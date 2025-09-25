import { Tag, MessageCircle } from 'lucide-react';

export default function IBMDealsSection() {
  return (
    <div className="w-full px-6 py-12 bg-gray-100">
      {/* Header */}
      <h1 className="text-4xl font-light text-gray-900 mb-16">
        Work With the Best Solutions
      </h1>

      {/* Three column grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* IBM Certified Pre-owned */}
        <div className="space-y-6">
          <div className="w-16 h-16 border-2 border-gray-300 rounded flex items-center justify-center">
            <div className="space-y-1">
              <div className="w-8 h-1 bg-gray-400 rounded"></div>
              <div className="w-8 h-1 bg-gray-400 rounded"></div>
              <div className="w-8 h-1 bg-gray-400 rounded"></div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Certified & Experienced
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Get reliable, high-quality software solutions at an affordable rate. From web apps to cloud integration, I deliver projects that truly perform.
            </p>
            
          </div>
        </div>

        {/* Special offers and discounts */}
        <div className="space-y-6">
          <div className="w-16 h-16 border-2 border-gray-300 rounded flex items-center justify-center">
            <Tag className="w-8 h-8 text-gray-400" />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Special offers and discounts
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Take advantage of limited-time offers on popular products.
            </p>
            
          </div>
        </div>

        {/* Financing */}
        <div className="space-y-6">
          <div className="w-16 h-16 border-2 border-gray-300 rounded flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-gray-400" />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Financing
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Start projects faster with flexible payment plans.
            </p>
            
          </div>
        </div>
      </div>

      {/* Bottom border line */}
      <div className="mt-16 pt-8 border-t border-gray-200"></div>
    </div>
  );
}