import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'

// Public homepage with hero section explaining the portal, features list, 
// and call-to-action buttons linking to auth page.

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-900 mb-6">
            Welcome to <span className="text-purple-600">FeeFlow</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Manage your tuition fees, view statements, and make secure payments online
          </p>

          {/* CTA Button */}
          <Link
            to="/auth"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-4 rounded-full transition duration-200 font-medium shadow-lg hover:shadow-xl"
          >
            Get Started
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          <FeatureCard
            icon={assets.money}
            title="View Balance"
            description="Check your current balance and upcoming due dates at a glance"
          />
          <FeatureCard
            icon={assets.document_icon}
            title="Download Statements"
            description="Get PDF statements of your fee history for your records"
          />
          <FeatureCard
            icon={assets.card}
            title="Secure Payments"
            description="Pay fees safely with Stripe payment gateway integration"
          />
          <FeatureCard
            icon={assets.histogram}
            title="Transaction History"
            description="Track all your payments and view complete fee history"
          />
        </div>

        {/* Partner Universities */}
        <div className="mt-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-900 mb-4">
            Trusted by Leading Universities
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Join thousands of students from South Africa's top institutions
          </p>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
            <img src={assets.wits_logo} alt="Wits University" className="h-12 md:h-16 w-auto opacity-70 hover:opacity-100 transition duration-200" />
            <img src={assets.uj_logo} alt="University of Johannesburg" className="h-12 md:h-16 w-auto opacity-70 hover:opacity-100 transition duration-200" />
            <img src={assets.unisa_logo} alt="UNISA" className="h-12 md:h-16 w-auto opacity-70 hover:opacity-100 transition duration-200" />
            <img src={assets.uct_logo} alt="University of Cape Town" className="h-10 md:h-12 w-auto opacity-70 hover:opacity-100 transition duration-200" />
            <img src={assets.up_logo} alt="University of Pretoria" className="h-12 md:h-16 w-auto opacity-70 hover:opacity-100 transition duration-200" />
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center text-purple-900 mb-10">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Register"
              description="Create your account with your student ID and email"
            />
            <StepCard
              number="2"
              title="Get Approved"
              description="Admin verifies your student status within 24 hours"
            />
            <StepCard
              number="3"
              title="Pay Fees"
              description="View your fees and make secure payments instantly"
            />
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-gray-200">
            <Stat number="500+" text="Active Students" />
            <Stat number="R1.2M" text="Fees Processed" />
            <Stat number="24/7" text="Access" />
            <Stat number="100%" text="Secure" />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">Ready to manage your fees?</p>
          <Link
            to="/auth"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full transition duration-200 font-medium"
          >
            Create Free Account
          </Link>
        </div>
      </div>
    </div>
  )
}

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-200">
    <img src={icon} alt={title} className="w-12 h-12 mb-4" />
    <h3 className="text-xl font-semibold text-purple-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
)

// Step Card Component
const StepCard = ({ number, title, description }) => (
  <div className="text-center">
    <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
      {number}
    </div>
    <h3 className="text-xl font-semibold text-purple-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
)

// Stat Component
const Stat = ({ number, text }) => (
  <div className="text-center">
    <div className="text-2xl font-bold text-purple-700">{number}</div>
    <div className="text-sm text-gray-500">{text}</div>
  </div>
)

export default Landing