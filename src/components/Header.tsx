import React, { useState } from 'react';

interface HeaderProps {
    toggleView: () => void; // Function to toggle between builder and viewer
    preview: boolean; // Current state to show "Preview" or "Edit"
    exportSurvey: () => void; // Function to export survey
    importSurvey: (event: React.ChangeEvent<HTMLInputElement>) => void; // Function to import survey
}

const Header: React.FC<HeaderProps> = ({
                                           toggleView,
                                           preview,
                                           exportSurvey,
                                           importSurvey,
                                       }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <header className="bg-blue-600 text-white py-4 shadow sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center px-6">
                {/* App Title */}
                <h1 className="text-xl font-bold">JSX Survey</h1>

                {/* Hamburger Menu for Mobile */}
                <div className="lg:hidden">
                    <button
                        onClick={toggleMenu}
                        className="btn p-2 rounded-md hover:bg-blue-700 transition"
                    >
                        <span className="material-icons">
                            {menuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>

                {/* Navigation Links */}
                <nav
                    className={`absolute lg:static top-14 right-6 bg-blue-600 lg:bg-transparent lg:flex lg:items-center lg:space-x-6 lg:p-0 p-4 rounded-md transition-all duration-300 ease-in-out transform ${
                        menuOpen ? 'block opacity-100 scale-100 top-20' : 'hidden opacity-0 scale-90 lg:block lg:opacity-100 lg:scale-100'
                    }`}
                >
                    {/* Export Button */}
                    <button
                        onClick={() => {
                            exportSurvey();
                            setMenuOpen(false); // Close menu after action
                        }}
                        className="flex items-center gap-2 text-white border border-white px-4 py-2 w-full lg:w-auto rounded hover:bg-white hover:text-blue-600 transition mb-2 lg:mb-0"
                    >
                        <span className="material-icons">download</span>
                        Export
                    </button>

                    {/* Import Button */}
                    <label
                        className="flex items-center gap-2 text-white border border-white px-4 py-2 w-full lg:w-auto rounded cursor-pointer hover:bg-white hover:text-blue-600 transition mb-2 lg:mb-0">
                        <span className="material-icons">upload</span>
                        Import
                        <input
                            type="file"
                            accept="application/json"
                            onChange={(e) => {
                                importSurvey(e);
                                setMenuOpen(false); // Close menu after action
                            }}
                            className="hidden"
                        />
                    </label>

                    {/* Preview/Edit Button */}
                    <button
                        onClick={() => {
                            toggleView();
                            setMenuOpen(false); // Close menu after action
                        }}
                        className="btn flex items-center gap-2 text-white border border-white px-4 py-2 w-full lg:w-auto rounded hover:bg-white hover:text-blue-600 transition mb-2 lg:mb-0"
                    >
        <span className="material-icons">
            {preview ? 'edit' : 'visibility'}
        </span>
                        {preview ? 'Edit' : 'Preview'}
                    </button>
                </nav>


            </div>
        </header>
    );
};

export default Header;
