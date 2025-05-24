
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { User, Users, Briefcase, Target, Compass } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Who We Are Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-nexloop-primary/10 rounded-full mr-3">
                    <User className="h-6 w-6 text-nexloop-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">Who We Are</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  NexLoop is an innovative learning platform founded in 2023 with a mission to democratize education and make high-quality learning accessible to everyone. We believe that education is the most powerful tool for personal and professional growth.
                </p>
                <p className="text-gray-600 mb-6">
                  Our platform brings together industry experts, cutting-edge technology, and a supportive community to create an unparalleled learning experience. We specialize in tech education, focusing on web development, data science, AI, and design to prepare learners for the digital economy.
                </p>
                <p className="text-gray-600">
                  What sets NexLoop apart is our commitment to practical, project-based learning that empowers students to apply their knowledge in real-world scenarios from day one.
                </p>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="NexLoop Team Collaboration" 
                  className="rounded-lg shadow-xl w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Vision and Mission Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Vision */}
              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-nexloop-primary/10 rounded-full mr-3">
                    <Target className="h-6 w-6 text-nexloop-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">Our Vision</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  We envision a world where quality education transcends geographical, social, and economic barriers—where every individual has the opportunity to unlock their potential through accessible, engaging, and effective learning experiences.
                </p>
                <p className="text-gray-600">
                  By 2030, we aim to empower 10 million learners globally with the skills and knowledge needed to thrive in the rapidly evolving digital landscape, fostering innovation, inclusivity, and sustainable growth across communities worldwide.
                </p>
              </div>
              
              {/* Mission */}
              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-nexloop-primary/10 rounded-full mr-3">
                    <Compass className="h-6 w-6 text-nexloop-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">Our Mission</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Our mission at NexLoop is to bridge the gap between traditional education and industry demands by providing cutting-edge, practical learning experiences that prepare individuals for real-world challenges and opportunities.
                </p>
                <p className="text-gray-600">
                  We accomplish this through a combination of expert-led instruction, hands-on projects, personalized learning paths, and a supportive community—all designed to foster not just technical skills, but also critical thinking, collaboration, and lifelong learning habits.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <div className="p-2 bg-nexloop-primary/10 rounded-full mr-3">
                  <Users className="h-6 w-6 text-nexloop-primary" />
                </div>
                <h2 className="text-3xl font-bold">Our Team</h2>
              </div>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Meet the passionate educators and industry professionals behind NexLoop who are committed to transforming the way people learn. Currently, we're a team of 8 dedicated experts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Dr. Aisha Patel",
                  role: "Founder & CEO",
                  bio: "Former Google engineer with a PhD in Computer Science from Stanford. Has 15+ years of experience in tech education.",
                  image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                },
                {
                  name: "Michael Chen",
                  role: "Lead Instructor",
                  bio: "Full-stack developer with experience at Amazon and Meta. Specializes in web development and has trained over 5,000 students.",
                  image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                },
                {
                  name: "Sophia Rodriguez",
                  role: "Data Science Director",
                  bio: "Data scientist with expertise in machine learning and AI. Previously worked at IBM and has published several research papers.",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                },
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-nexloop-primary font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                className="border-nexloop-primary text-nexloop-primary hover:bg-nexloop-light"
              >
                Join Our Team (Current Size: 8)
              </Button>
            </div>
          </div>
        </section>

        {/* Professional Services Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Professional Services" 
                  className="rounded-lg shadow-xl w-full h-auto object-cover"
                />
              </div>
              <div className="md:w-1/2">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-nexloop-primary/10 rounded-full mr-3">
                    <Briefcase className="h-6 w-6 text-nexloop-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">Professional Services</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Beyond our courses, NexLoop offers specialized professional services to businesses and organizations looking to upskill their workforce or implement cutting-edge technologies.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="p-2 bg-nexloop-primary/10 rounded-full mr-3 mt-1">
                      <div className="h-2 w-2 rounded-full bg-nexloop-primary"></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Corporate Training</h3>
                      <p className="text-gray-600">Customized learning experiences for your team with focused curriculum design.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-2 bg-nexloop-primary/10 rounded-full mr-3 mt-1">
                      <div className="h-2 w-2 rounded-full bg-nexloop-primary"></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Technical Consulting</h3>
                      <p className="text-gray-600">Expert guidance on implementing new technologies and digital transformation.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-2 bg-nexloop-primary/10 rounded-full mr-3 mt-1">
                      <div className="h-2 w-2 rounded-full bg-nexloop-primary"></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Talent Pipeline</h3>
                      <p className="text-gray-600">Connect with our pool of skilled graduates ready to join your organization.</p>
                    </div>
                  </div>
                </div>
                
                <Button className="bg-nexloop-primary hover:bg-nexloop-primary/90">
                  Request Services
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
