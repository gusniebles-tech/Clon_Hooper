import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    const popularDestinations = [
        { name: 'Las Vegas', href: '#' },
        { name: 'Paradise', href: '#' },
        { name: 'New York', href: '#' },
        { name: 'Orlando', href: '#' },
        { name: 'Chicago', href: '#' },
        { name: 'Houston', href: '#' },
        { name: 'Miami Beach', href: '#' },
        { name: 'Kissimmee', href: '#' },
        { name: 'San Diego', href: '#' },
        { name: 'Los Angeles', href: '#' },
        { name: 'San Antonio', href: '#' },
        { name: 'Atlanta', href: '#' },
        { name: 'Atlantic City', href: '#' },
        { name: 'Nashville', href: '#' },
        { name: 'New Orleans', href: '#' },
        { name: 'Fort Lauderdale', href: '#' },
        { name: 'San Francisco', href: '#' },
        { name: 'Dallas', href: '#' },
        { name: 'Tampa', href: '#' },
        { name: 'Charlotte', href: '#' },
        { name: 'Austin', href: '#' },
        { name: 'Denver', href: '#' },
        { name: 'Washington', href: '#' },
        { name: 'Phoenix', href: '#' },
        { name: 'Anaheim', href: '#' },
        { name: 'Myrtle Beach', href: '#' },
    ];

    const footerSections = {
        travel: [
            { name: 'Flights', href: '#' },
            { name: 'Hotels', href: '#' },
            { name: 'Rental Cars', href: '#' },
            { name: 'Homes', href: '#' },
        ],
        products: [
            { name: 'Refund Program', href: '#' },
            { name: 'Price Prediction', href: '#' },
            { name: 'Change for Any Reason', href: '#' },
            { name: 'Cancel for Any Reason', href: '#' },
            { name: 'Leave for Any Reason', href: '#' },
            { name: 'Premium Disruption Assistance', href: '#' },
            { name: 'Price Freeze', href: '#' },
            { name: 'VIP Support', href: '#' },
        ],
        company: [
            { name: 'About', href: '#' },
            { name: 'Culture', href: '#' },
            { name: 'Careers', href: '#' },
            { name: 'HTS (Hopper Technology Solutions)', href: '#' },
            { name: 'Partner with Hopper Homes', href: '#' },
            { name: 'Partner with Hopper Hotels', href: '#' },
            { name: 'Advertise on Hopper', href: '#' },
        ],
        faqs: [
            { name: 'Flights', href: '#' },
            { name: 'Hotels & Homes', href: '#' },
            { name: 'Hopper Products', href: '#' },
            { name: 'Billing & Payment', href: '#' },
            { name: 'Using the App', href: '#' },
            { name: 'Privacy Notice', href: '#' },
            { name: 'Terms & Conditions', href: '#' },
        ],
        media: [
            { name: 'News', href: '#' },
            { name: 'Press Kit', href: '#' },
            { name: 'Research', href: '#' },
            { name: 'Media Enquiries', href: '#' },
        ],
    };

    const socialLinks = [
        { name: 'Facebook', icon: 'facebook', href: '#' },
        { name: 'X (Twitter)', icon: 'x', href: '#' },
        { name: 'Instagram', icon: 'instagram', href: '#' },
        { name: 'LinkedIn', icon: 'linkedin', href: '#' },
        { name: 'YouTube', icon: 'youtube', href: '#' },
        { name: 'TikTok', icon: 'tiktok', href: '#' },
    ];

    return (
        <div className="w-full bg-white py-12 md:py-16 lg:py-20">
            {/* App Download Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                    {/* Left Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <h2 className="text-[3rem] font-bold mb-4">
                            Get deal alerts on the app
                        </h2>
                        <p className="text-[1.4rem] font-medium mb-8">
                            Join 120 million travelers in planning your next trip. Available on iOS and Android.
                        </p>

                        {/* QR Code and Download Link */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mb-8">
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <Image
                                    src="/descarga.png"
                                    alt="Qr"
                                    width={500}
                                    height={400}
                                    className="w-full h-auto"
                                    priority
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-10 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                                </svg>
                                <span className="text-blue-500 font-bold text-[1.5rem]">Scan to download</span>
                            </div>
                        </div>

                        {/* Ratings */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                            {/* Apple Rating */}
                            <div className="flex items-center gap-2">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                </svg>
                                <div>
                                    <div className="text-[1.4rem] font-semibold">4.8 Rating</div>
                                    <div className="flex text-yellow-400 text-[1.4rem]">
                                        {'★★★★★'.split('').map((star, i) => (
                                            <span key={i}>{star}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Google Rating */}
                            <div className="flex items-center gap-2">
                                <svg className="w-6 h-6" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <div>
                                    <div className="text-[1.4rem] font-semibold">4.6 Rating</div>
                                    <div className="flex text-yellow-400 text-[1.4rem]">
                                        {'★★★★★'.split('').map((star, i) => (
                                            <span key={i}>{star}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="flex-1 max-w-md lg:max-w-lg">
                        <Image
                            src="/Mockup.1157a87e.png"
                            alt="App Mockup"
                            width={500}
                            height={400}
                            className="w-full h-auto"
                            priority
                        />
                    </div>
                </div>
            </div>

            <div className="w-full bg-gray-100 py-5 md:py-6 lg:py-10">

                {/* Popular Destinations Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-[1.8rem] font-bold mb-6">Keep exploring</h3>
                    <h4 className="text-[1.4rem]  font-semibold mb-4">Popular destinations</h4>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {popularDestinations.map((destination) => (
                            <Link
                                key={destination.name}
                                href={destination.href}
                                className="text-blue-600 hover:text-blue-800 hover:underline text-base font-medium"
                            >
                                {destination.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <footer className="w-full bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Logos */}
                    <div className="flex items-center gap-6 mb-5">
                        {/* Logo Hopper - Puedes reemplazar con tu imagen real */}
                        <Image 
                            src="/hopper_seeklogo.svg"
                            alt="hopper logo"
                            width={120}
                            height={32}
                            priority
                        />

                        {/* Logo HTS */}
                        <Image 
                            src="/Logo-HTS.png"
                            alt="hopper logo"
                            width={88}
                            height={32}
                            priority
                        />
                    </div>

                    {/* Footer Links Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
                        {/* Travel */}
                        <div>
                            <h3 className="font-semibold mb-4">Travel</h3>
                            <ul className="space-y-2">
                                {footerSections.travel.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-sm font-medium hover:text-gray-900">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Products */}
                        <div>
                            <h3 className="font-semibold  mb-4">Products</h3>
                            <ul className="space-y-2">
                                {footerSections.products.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-sm font-medium">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h3 className="font-semibold mb-4">Company</h3>
                            <ul className="space-y-2">
                                {footerSections.company.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-sm font-medium">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* FAQs */}
                        <div>
                            <h3 className="font-semibold mb-4">FAQs</h3>
                            <ul className="space-y-2">
                                {footerSections.faqs.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-sm font-medium">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Media */}
                        <div>
                            <h3 className="font-semibold mb-4">Media</h3>
                            <ul className="space-y-2">
                                {footerSections.media.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-sm font-medium">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center justify-end gap-6 pt-8 border-t border-gray-200">
                        {socialLinks.map((social) => (
                            <Link
                                key={social.name}
                                href={social.href}
                                className="text-gray-600 hover:text-gray-900 transition-colors"
                                aria-label={social.name}
                            >
                                {social.icon === 'facebook' && (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                )}
                                {social.icon === 'x' && (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                )}
                                {social.icon === 'instagram' && (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                )}
                                {social.icon === 'linkedin' && (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                )}
                                {social.icon === 'youtube' && (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                )}
                                {social.icon === 'tiktok' && (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                                    </svg>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
}