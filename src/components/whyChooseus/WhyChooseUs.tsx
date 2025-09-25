import {
  TruckIcon,
  PhoneIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    title: "Free & Fast Delivery",
    description:
      "Get your orders delivered quickly and for free on all purchases.",
    icon: (
      <TruckIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
    ),
  },
  {
    title: "24/7 Customer Support",
    description:
      "We're available around the clock to assist you with anything.",
    icon: (
      <PhoneIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
    ),
  },
  {
    title: "Money Back Guarantee",
    description: "Not satisfied? We offer a full refund within 30 days.",
    icon: (
      <CurrencyDollarIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
    ),
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Why Shop With Us?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
