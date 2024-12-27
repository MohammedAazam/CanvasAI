import React from 'react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed flex items-center justify-between  p-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-900">CanvasAI</h1>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
          <a href="#testimonials" className="text-gray-600 hover:text-gray-900">Testimonials</a>
          <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
          <a href="#team" className="text-gray-600 hover:text-gray-900">Our Team</a>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-8">
          CanvasAI: Transform Your Math Experience
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-12">
          Take input on a canvas, solve equations, and collaborate in real-time with Gemini
          API integration
        </p>
        <Button 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-lg text-lg"
        >
          Get Started Free
        </Button>

        {/* Feature Preview */}
        <div className="mt-20 bg-gray-100 rounded-xl p-8">
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg">
            {/* Placeholder for feature preview/screenshot */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Feature Preview
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Canvas Input</h3>
              <p className="text-gray-600">
                Draw or write mathematical equations directly on the digital canvas
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Real-time Solving</h3>
              <p className="text-gray-600">
                Get instant solutions and step-by-step explanations
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Collaboration</h3>
              <p className="text-gray-600">
                Work together with others in real-time using shared workspaces
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Ready to Transform Your Math Experience?
          </h2>
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-lg text-lg"
          >
            Get Started Free
          </Button>
        </div>
      </section>
    </div>
  );
}