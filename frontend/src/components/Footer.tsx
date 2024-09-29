import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-500 to-gray-950 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Resources */}
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:underline">
                  Docs
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  API
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  Guides
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  Migrate from v5
                </a>
              </li>
            </ul>
          </div>

          {/* Right Column: Community Links */}
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold mb-4">Community</h4>
            <ul className="space-y-2">
              <li>
                <a href="/community" className="hover:underline">
                  Community
                </a>
              </li>
              <li>
                <a href="https://twitter.com" className="hover:underline">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://discord.com" className="hover:underline">
                  Discord
                </a>
              </li>
              <li>
                <a href="https://github.com" className="hover:underline">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8">
          <p>&copy; 2024 LandVer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
