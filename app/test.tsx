// pages/index.tsx
import Head from 'next/head';
// import Image from 'next/image';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Green Peace - Organic Products</title>
        <meta name="description" content="High quality organic products for a healthier world" />
      </Head>

      <main className="font-sans text-gray-800">
        {/* Hero Section */}
        <section className="bg-green-50 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  <span className="block">WE PROVIDE</span>
                  <span className="block text-green-600">HIGH QUALITY</span>
                  <span className="block">ORGANIC PRODUCT</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8 max-w-lg">
                  Growing a healthier world with organic food and sustainable living. Quis ipsum suspendisse ultrices gravida.
                </p>
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                  Shop Now
                </button>
              </div>
              <div className="relative h-80 md:h-96">
                {/* Placeholder for hero image - replace with your actual image */}
                <div className="absolute inset-0 bg-green-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Hero Image</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">Why Choose Us</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                "100% organic, non-GMO products",
                "Eco-conscious practices for a sustainable future",
                "Locally grown and handpicked for freshness",
                "Committed to your health and the planet's well-being"
              ].map((item, index) => (
                <div key={index} className="bg-green-50 p-6 rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-green-50">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 md:h-96">
              {/* Placeholder for about image - replace with your actual image */}
              <div className="absolute inset-0 bg-green-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">About Image</span>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">About Us</h2>
              <p className="text-lg text-gray-600 mb-6">
                Greenpeace is dedicated to providing fresh, organic garden-grown foods and eco-friendly products. Rooted in sustainability, our mission is to promote healthy living while caring for the environment.
              </p>
              <button className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-bold py-2 px-6 rounded-lg transition duration-300">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Testimonial</h2>
            <p className="text-xl text-gray-600 italic">
              Greenpeace delivers fresh, organic produce and eco-friendly products that are both healthy and sustain- ably sourced. I highly recommend them to anyone looking to live a healthier lifestyle.
            </p>
          </div>
        </section>

        {/* Key Services Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-green-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">Key Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                "Organic fruits and vegetables",
                "Herbal plants and remedies",
                "Customizable garden kits",
                "Eco-friendly household products"
              ].map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300">
                  <h3 className="text-xl font-semibold mb-3">{service}</h3>
                  <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-600 text-white">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-lg">Fellowers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-lg">Culomers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-lg">Respect Culomers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">Hire</div>
              <div className="text-lg">Morjina</div>
            </div>
          </div>
        </section>
        

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Green Peace</h3>
              <p className="text-gray-400 mb-4">
                Growing a healthier world with organic food and sustainable living.
              </p>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <a key={social} href="#" className="text-gray-400 hover:text-white transition duration-300">
                    <span className="sr-only">{social}</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <p className="text-gray-400 mb-2">Email: <a href="mailto:madil@amadil.com" className="hover:text-white">madil@amadil.com</a></p>
              <p className="text-gray-400">Website: <a href="#" className="hover:text-white">www.greenpeace.com</a></p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Green Peace. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  );
}