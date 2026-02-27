import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'

// Simple footer with copyright text.

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-6">
          {/* Brand Section */}
          <div>
            <h3 className="text-lg font-semibold text-purple-800 mb-3">FeeFlow</h3>
            <p className="text-sm text-gray-600">
              Student fees management portal
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-purple-700 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-sm text-gray-600 hover:text-purple-700 transition">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/admin-dashboard" className="text-sm text-gray-600 hover:text-purple-700 transition">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Contact</h4>
            <p className="text-sm text-gray-600">support@feeflow.demo</p>
            <p className="text-sm text-gray-600 mt-2">Johannesburg, South Africa</p>
            <div className="flex gap-4 mt-4">
              <a href="https://facebook.com">
                <img src={assets.facebook_icon} alt="Facebook" className="w-8 h-8 rounded-full hover:opacity-80 transition" />
              </a>
              <a href="https://instagram.com">
                <img src={assets.instagram_icon} alt="Instagram" className="w-8 h-8 rounded-full hover:opacity-80 transition" />
              </a>
              <a href="https://twitter.com">
                <img src={assets.twitter_icon} alt="Twitter" className="w-8 h-8 rounded-full hover:opacity-80 transition" />
              </a>
            </div>
          </div>
        </div>

        {/* DISCLAIMER - Important Notice */}
        <div className="border-t border-gray-200 pt-6 mt-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-xs md:text-sm text-yellow-800 text-center">
              <span className="font-semibold inline-flex items-center gap-1">
                <img src={assets.warning} alt="warning" className="w-3 h-3 inline-block" />
                Disclaimer:
              </span>
              This is a dummy site created for learning purposes only. FeeFlow is not a real company
              and the universities mentioned (Wits, UJ, UNISA, UCT, UP) are not associated with this
              application. All content is fictional and used for demonstration.
            </p>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-500 text-center">
            © {new Date().getFullYear()} FeeFlow (Demo Project). All rights reserved.
            This is a portfolio project and does not represent a real service.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer