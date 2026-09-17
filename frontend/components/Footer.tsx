import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Award } from "lucide-react";
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#f8fafc] border-t border-[#e2e8f0] text-[#0f172a] mt-auto relative">
      <div className="container mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand Column (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center">
              <div className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="Axar Logo"
                  width={120}
                  height={120}
                  className="object-contain h-10 w-auto shrink-0"
                />
                <Image
                  src="/logotext.png"
                  alt="Axar Creative Management Solutions"
                  width={320}
                  height={100}
                  className="object-contain h-9 w-auto -ml-1 shrink-0"
                />
              </div>
            </Link>

            <p className="text-xs text-[#b3282d] font-bold">
              Better Systems • Safer Workplaces • Sustainable Growth
            </p>

            <p className="text-xs text-[#475569] leading-relaxed max-w-sm">
              Axar Creative Management Solutions provides professional industrial consultancy, ISO & QMS certifications, testing laboratory accreditation, QHSE training, and export business development.
            </p>

            <div className="p-3 bg-white border border-[#e2e8f0] rounded-md flex items-center space-x-3 max-w-sm shadow-xs group">
              <div className="w-10 h-10 rounded-md overflow-hidden relative border border-[#b3282d] shrink-0">
                <Image
                  src="/team/ghanshyam.jpeg"
                  alt="Ghanshyambhai K Patel"
                  fill
                  className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <div>
                <span className="font-heading font-bold text-xs text-[#0f172a] block">Ghanshyambhai K Patel</span>
                <span className="text-[11px] text-[#64748b] block">Proprietor & Principal Consultant</span>
              </div>
            </div>

            <div className="flex space-x-2 pt-1">
              <a href="#" className="w-8 h-8 rounded-md bg-white border border-[#cbd5e1] flex items-center justify-center text-[#475569] hover:text-[#b3282d] hover:border-[#b3282d] transition-colors shadow-xs" aria-label="LinkedIn">
                <FaLinkedin size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-md bg-white border border-[#cbd5e1] flex items-center justify-center text-[#475569] hover:text-[#b3282d] hover:border-[#b3282d] transition-colors shadow-xs" aria-label="Twitter">
                <FaTwitter size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-md bg-white border border-[#cbd5e1] flex items-center justify-center text-[#475569] hover:text-[#b3282d] hover:border-[#b3282d] transition-colors shadow-xs" aria-label="Instagram">
                <FaInstagram size={14} />
              </a>
            </div>
          </div>

          {/* Quick Navigation (Col 5-6) */}
          <div className="lg:col-span-2">
            <h3 className="font-heading font-bold text-xs tracking-wider uppercase mb-4 text-[#b3282d]">Quick Links</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="text-[#475569] hover:text-[#0f172a] transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="text-[#475569] hover:text-[#0f172a] transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/services" className="text-[#475569] hover:text-[#0f172a] transition-colors">Our Services</Link>
              </li>
              <li>
                <Link href="/industries" className="text-[#475569] hover:text-[#0f172a] transition-colors">Industries We Serve</Link>
              </li>
              <li>
                <Link href="/training" className="text-[#475569] hover:text-[#0f172a] transition-colors">Training Programs</Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-[#475569] hover:text-[#0f172a] transition-colors">Projects & Clients</Link>
              </li>
              <li>
                <Link href="/resources" className="text-[#475569] hover:text-[#0f172a] transition-colors">Resources & Guides</Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#475569] hover:text-[#0f172a] transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link href="/contact?type=quote" className="text-[#b3282d] font-bold hover:underline transition-colors">Get a Quote</Link>
              </li>
            </ul>
          </div>

          {/* 7 Services (Col 7-9) */}
          <div className="lg:col-span-3">
            <h3 className="font-heading font-bold text-xs tracking-wider uppercase mb-4 text-[#b3282d]">Core Services</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services#iso" className="text-[#475569] hover:text-[#0f172a] transition-colors">QMS & ISO Consultancy (IMS)</Link>
              </li>
              <li>
                <Link href="/services#laboratory" className="text-[#475569] hover:text-[#0f172a] transition-colors">Laboratory & NABL Setup</Link>
              </li>
              <li>
                <Link href="/services#qhse" className="text-[#475569] hover:text-[#0f172a] transition-colors">QHSE & Food Safety Training</Link>
              </li>
              <li>
                <Link href="/services#insurance" className="text-[#475569] hover:text-[#0f172a] transition-colors">Industrial Insurance Solutions</Link>
              </li>
              <li>
                <Link href="/services#six-sigma" className="text-[#475569] hover:text-[#0f172a] transition-colors">Six Sigma Training (DMAIC)</Link>
              </li>
              <li>
                <Link href="/services#marketing" className="text-[#475569] hover:text-[#0f172a] transition-colors">Marketing Flyers & Profiles</Link>
              </li>
              <li>
                <Link href="/services#export" className="text-[#475569] hover:text-[#0f172a] transition-colors">Export & Global Marketing</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details (Col 10-12) */}
          <div className="lg:col-span-3">
            <h3 className="font-heading font-bold text-xs tracking-wider uppercase mb-4 text-[#b3282d]">Office & Works</h3>
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-start space-x-2.5 text-[#475569]">
                <MapPin size={15} className="text-[#b3282d] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#0f172a] block">Registered Office:</span>
                  <span>26 Ravikiran complex Banglows, Near Madhuram party Plot, Zadeshwar Chokdi, Bharuch, 392011 Gujarat</span>
                </div>
              </li>
              <li className="flex items-start space-x-2.5 text-[#475569]">
                <MapPin size={15} className="text-[#a16207] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#0f172a] block">Works Address:</span>
                  <span>Green Park Farm, Bhersam Sayakha Road, Navi Vasahat, Saykha GIDC, Ta Vagra, Dist: Bharuch, Gujarat</span>
                </div>
              </li>
              <li className="flex items-center space-x-2.5 text-[#475569]">
                <Phone size={15} className="text-[#b3282d] flex-shrink-0" />
                <a href="tel:+919925534751" className="hover:text-[#b3282d] font-bold text-[#0f172a] transition-colors">+91 99255 34751</a>
              </li>
              <li className="flex items-center space-x-2.5 text-[#475569]">
                <Mail size={15} className="text-[#a16207] flex-shrink-0" />
                <a href="mailto:patelgk4257@gmail.com" className="hover:text-[#b3282d] text-[#0f172a] transition-colors">patelgk4257@gmail.com</a>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#e2e8f0] flex flex-col md:flex-row justify-between items-center text-xs text-[#64748b] gap-4">
          <p>© {currentYear} Axar Creative Management Solutions. All rights reserved.</p>
          <div className="flex items-center space-x-5 text-[11px]">
            <Link href="/about" className="hover:text-[#0f172a] transition-colors">About</Link>
            <Link href="/services" className="hover:text-[#0f172a] transition-colors">Services</Link>
            <Link href="/contact" className="hover:text-[#0f172a] transition-colors">Contact</Link>
            <Link href="/admin" className="hover:text-[#b3282d] transition-colors">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
