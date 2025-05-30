import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Linkedin, Instagram, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
    setEmail("");
  };

  return (
    <footer className="bg-nexloop-dark text-white">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="NexLoop Logo" className="h-16 w-auto" />
            </div>
            <p className="text-gray-300 mb-6">
              Empowering students worldwide with quality education and skills for the future.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/nexloop"
                className="text-gray-300 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/nexloop_official/"
                className="text-gray-300 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#courses" className="text-gray-300 hover:text-white transition-colors">
                  Courses
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#registration" className="text-gray-300 hover:text-white transition-colors">
                  Register
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Subscribe</h3>
            <p className="text-gray-300 mb-4">Stay updated with our latest courses and educational content.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-3 text-gray-400">
                  <Mail className="h-5 w-5" />
                </span>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700 pl-10 text-white focus:border-nexloop-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="bg-nexloop-primary hover:bg-nexloop-primary/90">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <hr className="my-8 border-gray-800" />

        <div className="text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} NexLoop Learning. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;