"use client";
import React from "react";
import {
  Building2,
  Phone,
  Smartphone,
  Linkedin,
  Instagram,
  Facebook,
  ExternalLink,
  Globe,
  PenSquare,
} from "lucide-react";

const IBMContactInfo = () => {
  return (
    <section className="bg-gray-100 py-16 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Corporate Address */}
          <div className="space-y-6">
            <div className="flex flex-col items-start space-y-4">
              <div className="w-16 h-16 flex items-center justify-center text-gray-700">
                <Building2 size={56} strokeWidth={1.3} />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Corporate Address
                </h3>
                <div className="text-gray-700 space-y-1 text-base">
                  <p>36/3, Januda</p>
                  <p>Hakmana Road</p>
                  <p>Beliatta 82400</p>
                  <p>Hambantota District</p>
                  <p>Southern Province</p>
                  <p>Sri Lanka</p>
                </div>
              </div>
            </div>
          </div>

          {/* Phone Numbers */}
          <div className="space-y-6">
            <div className="flex flex-col items-start space-y-4">
              <div className="w-16 h-16 flex items-center justify-center text-gray-700">
                <Phone size={56} strokeWidth={1.3} />
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Phone Numbers
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Smartphone className="text-blue-600" size={20} />
                    <div>
                      <p className="text-gray-900 font-medium">General</p>
                      <p className="text-gray-700">+94 77 300 7426</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Smartphone className="text-blue-600" size={20} />
                    <div>
                      <p className="text-gray-900 font-medium">Mobile</p>
                      <p className="text-gray-700">+94 70 225 1237</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-6">
            <div className="flex flex-col items-start space-y-4">
              <div className="w-16 h-16 flex items-center justify-center text-gray-700">
                <Globe size={56} strokeWidth={1.3} />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Follow Me
                </h3>

                <div className="space-y-4">
                  <a
                    href="https://www.linkedin.com/in/januda-kodithuwakku/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Linkedin size={20} />
                    <span>LinkedIn</span>
                    <ExternalLink size={14} className="ml-1" />
                  </a>

                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Globe size={20} />
                    <span>X (Twitter)</span>
                    <ExternalLink size={14} className="ml-1" />
                  </a>

                  <a
                    href="https://www.instagram.com/januda_j_kodithuwakku_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-pink-600 hover:text-pink-700 transition-colors"
                  >
                    <Instagram size={20} />
                    <span>Instagram</span>
                    <ExternalLink size={14} className="ml-1" />
                  </a>

                  <a
                    href="https://web.facebook.com/hnba.sahakaru"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Facebook size={20} />
                    <span>Facebook</span>
                    <ExternalLink size={14} className="ml-1" />
                  </a>

                  <a
                    href="https://medium.com/@janudakodi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-800 hover:text-gray-900 transition-colors"
                  >
                    <PenSquare size={20} />
                    <span>Medium</span>
                    <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IBMContactInfo;
