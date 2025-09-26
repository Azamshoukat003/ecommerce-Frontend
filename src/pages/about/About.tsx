import {
  LightBulbIcon,
  UserGroupIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <section className="px-4 py-20 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">About Our Store</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We’re passionate about delivering the best shopping experience.
              Our mission is to provide high-quality products, fast service, and
              excellent customer support.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Mission */}
            <div className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800 shadow-sm hover:shadow-lg transition">
              <LightBulbIcon className="w-12 h-12 mx-auto mb-4 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                To revolutionize online shopping with innovation, quality, and
                value.
              </p>
            </div>

            {/* Team */}
            <div className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800 shadow-sm hover:shadow-lg transition">
              <UserGroupIcon className="w-12 h-12 mx-auto mb-4 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-xl font-semibold mb-2">Our Team</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We're a group of passionate developers, designers, and product
                experts working to deliver excellence.
              </p>
            </div>

            {/* Vision */}
            <div className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800 shadow-sm hover:shadow-lg transition">
              <GlobeAltIcon className="w-12 h-12 mx-auto mb-4 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                To become a global leader in e-commerce through trust and
                innovation.
              </p>
            </div>
          </div>

          {/* Image and Story Section */}
          <div className="mt-20 grid md:grid-cols-2 gap-12 items-center">
            <img
              src="https://images.unsplash.com/photo-1706372124814-417e2f0c3fe0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Our story"
              className="w-full rounded-xl shadow-lg"
            />

            <div>
              <h3 className="text-3xl font-bold mb-4">Our Story</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Started in a small garage, our journey began with a dream to
                make premium products accessible to everyone. Today, we serve
                thousands of happy customers globally and continue to grow with
                passion and purpose.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
