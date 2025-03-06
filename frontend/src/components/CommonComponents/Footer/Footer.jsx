import React from 'react';
import { Link } from 'react-router-dom';
import { faGithub, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800 py-8 border-t">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center md:text-left">
                        <h3 className="font-bold text-lg mb-2">About Us</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Your community marketplace. Connecting neighbors and supporting local businesses.
                        </p>
                    </div>

                    <div className="text-center md:text-left">
                        <h3 className="font-bold text-lg mb-2">Quick Links</h3>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <li>
                                <Link to="/about" className="hover:underline">About</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:underline">Contact</Link>
                            </li>
                            <li>
                                <Link to="/terms" className="hover:underline">Terms of Service</Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="text-center md:text-left">
                        <h3 className="font-bold text-lg mb-2">Connect</h3>
                        <div className="flex justify-center md:justify-start space-x-8">

                            <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faGithub} className='text-3xl' />
                            </a>


                            <a href="https://twitter.com/your-twitter" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faXTwitter} className='text-3xl' />
                            </a>

                            <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faLinkedin} className='text-3xl' />
                            </a>

                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Cypher. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;