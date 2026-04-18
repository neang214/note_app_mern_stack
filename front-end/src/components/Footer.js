const Footer = (props) => {
    return (
        <footer className="bg-gray-950/70 border-t border-gray-800 mt-12 py-4">
            <div className="max-w-7xl mx-auto text-center text-xs text-gray-500 px-4 sm:px-8">
                &copy; {new Date().getFullYear()} Premium Note Vault. All rights reserved. 
                <span className="block sm:inline sm:ml-4 mt-1 sm:mt-0">
                    This is a Local Data Demo Application.
                </span>
            </div>
        </footer>
    );
};

export default Footer