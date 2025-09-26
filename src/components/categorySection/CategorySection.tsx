import { FC } from "react";
import {
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  Cog6ToothIcon,
  CameraIcon,
  TvIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/outline";


const categories = [
  { name: "Mobiles", icon: DevicePhoneMobileIcon },
  { name: "Laptops", icon: ComputerDesktopIcon },
  { name: "Accessories", icon: Cog6ToothIcon },
  { name: "Cameras", icon: CameraIcon },
  { name: "TVs", icon: TvIcon },
  { name: "Speakers", icon: SpeakerWaveIcon },
];

const CategorySection: FC = () => {
  return (
    <div className="py-10 bg-white-50 dark:bg-gray-900 transition-colors duration-300 mb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map(({ name, icon: Icon }) => (
            <div
              key={name}
              className="group cursor-pointer rounded-lg bg-white dark:bg-zinc-600 shadow hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 p-4 flex flex-col items-center justify-center text-center"
            >
              <Icon className="w-8 h-8 text-gray-600 dark:text-gray-300 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 mb-2" />
              <p className="text-sm font-medium text-gray-800 dark:text-white">
                {name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
