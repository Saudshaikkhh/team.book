import Image from "next/image";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    shipmentType: "individual",
    boxes: "1",
    weight: "0-10",
    details: ""
  });

  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({ type: 'success', message: data.message });
        setFormData({
          name: "",
          email: "",
          phone: "",
          shipmentType: "individual",
          boxes: "1",
          weight: "0-10",
          details: ""
        });
      } else {
        setSubmitStatus({ type: 'error', message: data.message });
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'An error occurred. Please try again later.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const scriptSrc = "https://widgets.sociablekit.com/google-reviews/widget.js";
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);

    if (existingScript) {
      return;
    }

    const script = document.createElement("script");
    script.src = scriptSrc;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-blue-50/40 to-white text-gray-900">
      <Head>
        <title>Cargo Force - Affordable Air Cargo to India from UK</title>
        <meta name="description" content="Cargo to India from UK by Air at £4 per kg. Customs duty, handling, pickup, and free boxes included. Reliable door-to-door service." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white/80 backdrop-blur-md border-b border-white/60 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Cargo Force"
              width={160}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </div>
          <nav className="hidden md:flex space-x-8 font-medium">
            <a href="#services" className="text-gray-700 hover:text-primary-600 transition-colors">Services</a>
            <a href="#pricing" className="text-gray-700 hover:text-primary-600 transition-colors">Pricing</a>
            <a href="#contact" className="text-gray-700 hover:text-primary-600 transition-colors">Contact</a>
          </nav>
          <a href="https://book.cargoforce.com/" className="book-now-button bg-primary-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-primary-700 transition-colors font-semibold">
            Book Now
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden py-24">
          <div className="absolute inset-0 opacity-60">
            <div className="bg-[radial-gradient(circle_at_top,#e0f2ff,transparent_55%)] w-full h-full"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/80 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-primary-100 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                Premium Air Cargo Service
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Cargo to India from UK by Air
              </h1>
              <p className="text-xl sm:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
                Customs duty, handling, pickup, and free boxes and tapes at the warehouse—everything included at the <span className="text-primary-600 font-bold">lowest rate of £4 per kg</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://book.cargoforce.com/" className="book-now-button bg-linear-to-r from-primary-500 to-primary-700 text-white px-10 py-4 rounded-full hover:shadow-xl transition-all transform hover:scale-105 font-semibold text-lg shadow-lg">
                  Book Now
                </a>
                <a href="#contact" className="bg-white text-primary-600 px-10 py-4 rounded-full border border-primary-200 shadow-sm hover:bg-primary-50 transition-all font-semibold text-lg">
                  Get a Quote
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
                {[
                  { label: "14 yrs", desc: "Trusted cargo experience" },
                  { label: "£4 /kg", desc: "All-inclusive pricing" },
                  { label: "120+ cities", desc: "Pan-India coverage" },
                ].map((item) => (
                  <div key={item.label} className="bg-white/80 border border-white/70 shadow-lg rounded-2xl py-6 px-5 backdrop-blur">
                    <p className="text-3xl font-bold text-primary-600">{item.label}</p>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-primary-600 font-semibold text-center uppercase tracking-widest mb-3">Why Ship With Us</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
              Reliable Door-to-Door Service by Air
            </h2>
            <p className="text-lg text-gray-600 text-center mb-16 max-w-3xl mx-auto">
              From pick-up at your doorstep in the UK to delivery at the recipient's address in India, we take care of everything for you, ensuring a hassle-free experience.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/90 border border-blue-100 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Affordable & Transparent Pricing</h3>
                <p className="text-gray-600">
                  Our £4 per kg rate is the lowest in the UK, with no hidden charges. What you see is what you pay.
                </p>
              </div>

              <div className="bg-white/90 border border-blue-100 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1">
                <div className="text-4xl mb-4">✈️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Customs Duty Included</h3>
                <p className="text-gray-600">
                  Our service includes customs duties and handling at no extra cost, ensuring no surprises along the way.
                </p>
              </div>

              <div className="bg-white/90 border border-blue-100 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1">
                <div className="text-4xl mb-4">📦</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Free Boxes & Materials</h3>
                <p className="text-gray-600">
                  At our UK warehouse, we provide free boxes and packing materials to secure your items.
                </p>
              </div>

              <div className="bg-white/90 border border-blue-100 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1">
                <div className="text-4xl mb-4">🚚</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Free Pickup</h3>
                <p className="text-gray-600">
                  Completely free pickup in UK mainland, included in our transparent, all-inclusive pricing.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-linear-to-br from-blue-50 via-white to-blue-100/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-16">
              Why Choose Us
            </h2>

            <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
              <div className="bg-white border border-red-100 shadow-md p-6 rounded-2xl">
                <h3 className="font-bold text-red-900 mb-2 text-lg">❌ What You Won't Get with Us</h3>
                <p className="text-red-800">High, hidden shipping costs & unclear pricing structures</p>
              </div>
              <div className="bg-white border border-green-100 shadow-md p-6 rounded-2xl">
                <h3 className="font-bold text-green-900 mb-2 text-lg">✅ What You Get with Us</h3>
                <p className="text-green-800">Lowest rate of £4 per kg with everything included—no hidden fees</p>
              </div>

              <div className="bg-white border border-red-100 shadow-md p-6 rounded-2xl">
                <h3 className="font-bold text-red-900 mb-2 text-lg">❌ What You Won't Get with Us</h3>
                <p className="text-red-800">Unexpected fees for picking up cargo from your doorstep</p>
              </div>
              <div className="bg-white border border-green-100 shadow-md p-6 rounded-2xl">
                <h3 className="font-bold text-green-900 mb-2 text-lg">✅ What You Get with Us</h3>
                <p className="text-green-800">Pickup is completely free in UK mainland, fully included in pricing</p>
              </div>

              <div className="bg-white border border-red-100 shadow-md p-6 rounded-2xl">
                <h3 className="font-bold text-red-900 mb-2 text-lg">❌ What You Won't Get with Us</h3>
                <p className="text-red-800">Extra fees for packing materials and securing your cargo</p>
              </div>
              <div className="bg-white border border-green-100 shadow-md p-6 rounded-2xl">
                <h3 className="font-bold text-green-900 mb-2 text-lg">✅ What You Get with Us</h3>
                <p className="text-green-800">Free boxes and packing materials at our UK warehouse</p>
              </div>

              <div className="bg-white border border-red-100 shadow-md p-6 rounded-2xl">
                <h3 className="font-bold text-red-900 mb-2 text-lg">❌ What You Won't Get with Us</h3>
                <p className="text-red-800">Additional charges for customs clearance on delivery</p>
              </div>
              <div className="bg-white border border-green-100 shadow-md p-6 rounded-2xl">
                <h3 className="font-bold text-green-900 mb-2 text-lg">✅ What You Get with Us</h3>
                <p className="text-green-800">Customs duty in India is included—no extra charges at delivery</p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-primary-600 font-semibold text-center uppercase tracking-widest mb-3">Transparent Pricing</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
              Quick Price Guide – Door-to-Door Rates to India
            </h2>
            <p className="text-center text-gray-600 mb-4">By Air Only for Individuals - Gifts, Household Items, Personal Effects</p>
            <p className="text-center text-primary-600 font-semibold mb-12">
              Transit time: 14 working days to major cities, up to 21 working days for remote areas
            </p>

            <div className="overflow-x-auto">
              <table className="w-full bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
                <thead className="bg-linear-to-r from-primary-500 to-primary-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Weight (Kg)</th>
                    <th className="px-6 py-4 text-left font-semibold">Air Cargo Rates</th>
                    <th className="px-6 py-4 text-left font-semibold">Customs Duty in India</th>
                    <th className="px-6 py-4 text-left font-semibold">Collection & Handling</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-medium">0 - 10</td>
                    <td className="px-6 py-4 text-primary-600 font-bold">£40.00 Flat</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">Included</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">Included</td>
                  </tr>
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-medium">21 - 50</td>
                    <td className="px-6 py-4 text-primary-600 font-bold">£4.00 Per kg</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">Included</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">Included</td>
                  </tr>
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-medium">51 - 100</td>
                    <td className="px-6 py-4 text-primary-600 font-bold">£4.00 Per kg</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">Included</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">Included</td>
                  </tr>
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-medium">100 +</td>
                    <td className="px-6 py-4 text-primary-600 font-bold">£4.00 Per kg</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">Included</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">Included</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="contact" className="py-24 bg-linear-to-br from-blue-50 via-white to-blue-100/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
              Get a Sales Quote or Enquire
            </h2>
            <p className="text-center text-gray-600 mb-12">Request a call back or send us your shipment details</p>

            <form onSubmit={handleSubmit} className="bg-white/90 p-10 rounded-3xl shadow-2xl border border-white/70 backdrop-blur">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Type of Shipment</label>
                  <select
                    name="shipmentType"
                    value={formData.shipmentType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="individual">Individual – Gift, household items</option>
                    <option value="business">Business Shipment</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Number of Boxes/Packages</label>
                  <select
                    name="boxes"
                    value={formData.boxes}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                    <option value="10+">More than 10</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Approximate Weight (kg)</label>
                  <select
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="0-10">0 - 10 Kgs</option>
                    <option value="21-50">21 - 50 Kgs</option>
                    <option value="51-100">51 - 100 Kgs</option>
                    <option value="100+">100 + Kgs</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Additional Details or Questions</label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                ></textarea>
              </div>

              {submitStatus.type && (
                <div className={`mb-6 p-4 rounded-lg ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-50 border border-green-200 text-green-800' 
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                  <p className="font-medium">{submitStatus.message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-all transform hover:scale-105 font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
              </button>
            </form>
          </div>
        </section>

        <section className="py-24 bg-linear-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-left text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-left text-gray-600 mb-12">
              Real Google reviews from customers who shipped with Cargo Force.
            </p>
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 px-4 sm:px-12 py-6 sm:py-12">
              <div className="sk-ww-google-reviews min-h-[460px]" data-embed-id="25624560"></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="mb-4">
                <Image
                  src="/logo.png"
                  alt="Cargo Force"
                  width={160}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
              <p className="text-gray-400">
                Your trusted partner for affordable air cargo shipping from UK to India.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Office & Warehouse Timings</h3>
              <div className="text-gray-400 space-y-1">
                <p className="font-semibold text-white">Office Hours:</p>
                <p>Monday to Saturday: 9:00 AM - 5:00 PM</p>
                <p>Sunday: 11:00 AM - 4:00 PM</p>
                <p className="font-semibold text-white mt-3">Warehouse Hours:</p>
                <p>24/7</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Warehouse Address</h3>
              <div className="text-gray-400 space-y-1">
                <p>Unit K 9 Osram Road</p>
                <p>East Lane Business Park</p>
                <p>Wembley, London</p>
                <p>HA9 7NG</p>
                <p className="mt-3 text-white">+44 20 3384 6470</p>
                <p className="text-white">+91 22 4911 0110</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Cargo Force Limited. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/442033846470"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all transform hover:scale-110 z-50"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
};

export default Home;
