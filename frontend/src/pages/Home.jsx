import { Link } from 'react-router-dom';
import { BookOpenIcon, PencilIcon, SparklesIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white sm:text-6xl">
          Unleash Your <span className="text-primary-600 dark:text-primary-400">Storytelling</span> Power
        </h1>
        <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          SnapStory brings stories to life with immersive reading experiences, emotional audio narration, and beautiful animations.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link
            to="/register"
            className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mb-4">
              <PencilIcon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Create Stories</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Write and publish your stories with our intuitive editor. Add images, format text, and bring your ideas to life.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mb-4">
              <BookOpenIcon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Immersive Reading</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Experience stories in multiple formats - read, listen, or watch animated versions with our unique reading modes.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mb-4">
              <SparklesIcon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Emotional Audio</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Our advanced narration detects emotions and even sings musical passages, creating a truly immersive experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}