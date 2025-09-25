import { PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
// import { MailIcon } from "@heroicons/react/24/";
import { SiGmail } from "react-icons/si";

const Contact = () => {
  return (
    <>
      <Navbar />
      <section className="px-4 py-16 bg-white-100 dark:bg-gray-900 text-gray-800 dark:text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Get in Touch</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We'd love to hear from you! Whether you have a question about
              products, pricing, or anything else—our team is ready to answer
              all your questions.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <SiGmail className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                <span>Azamshoukat11225@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                <span>+92 310 6501781</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPinIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                <span>Awan town , Sadiq Abad, Pakistan</span>
              </div>
            </div>

            {/* Optional: Socials */}
            {/* <div className="mt-6 flex space-x-4">
            <a href="#"><FacebookIcon /></a>
            <a href="#"><TwitterIcon /></a>
            <a href="#"><InstagramIcon /></a>
          </div> */}
          </div>

          {/* Contact Form */}
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                rows={5}
                placeholder="Your message"
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-md shadow-md hover:bg-indigo-700 active:scale-95 transition-all duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
