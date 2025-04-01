import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { BookOpenIcon, PencilIcon, MicrophoneIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome, {user?.email}
          </h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Story Creation Card */}
          <Link 
            to="/create-story" 
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center"
          >
            <PencilIcon className="h-12 w-12 text-primary-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Create Story</h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Start writing your new masterpiece
            </p>
          </Link>

          {/* Read Stories Card */}
          <Link 
            to="/library" 
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center"
          >
            <BookOpenIcon className="h-12 w-12 text-primary-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Read Stories</h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Explore our collection of stories
            </p>
          </Link>

          {/* Audio Stories Card */}
          <Link 
            to="/audio-stories" 
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center"
          >
            <MicrophoneIcon className="h-12 w-12 text-primary-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Audio Stories</h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Listen to stories with emotional narration
            </p>
          </Link>

          {/* Settings Card */}
          <Link 
            to="/settings" 
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center"
          >
            <MoonIcon className="h-12 w-12 text-primary-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Settings</h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Customize your reading experience
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}