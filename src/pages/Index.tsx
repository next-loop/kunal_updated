
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RegistrationForm from "@/components/RegistrationForm";
import Courses from "@/components/Courses";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <RegistrationForm />
      <Courses />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
