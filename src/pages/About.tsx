import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { User, Target, Compass, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { API_ENDPOINTS } from "@/config/api";

interface TeamMember {
  id: number;
  name: string;
  designation: string;
  description: string;
  photo: string;
}

const Team = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.team);
        if (!response.ok) {
          throw new Error("Failed to fetch team members");
        }
        const data: TeamMember[] = await response.json();
        setTeamMembers(data);
      } catch (error) {
        console.error("Error fetching team members:", error);
        toast({
          title: "Error",
          description: "Failed to load team members. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, [toast]);

  if (loading) {
    return (
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
          <div className="text-center">Loading team members...</div>
        </div>
      </section>
    );
  }

  if (teamMembers.length === 0) {
    return (
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
          <div className="text-center">No team members available at the moment.</div>
        </div>
      </section>
    );
  }

  return (
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
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="h-64 overflow-hidden">
                <img src={member.photo} alt={member.name} className="w-full h-full object-contain" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-nexloop-primary font-medium mb-3">{member.designation}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

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
                  At NexLoop, we envision a future where learning is action-driven, inclusive, and deeply rooted in real-life challenges — not confined to classrooms or theory.
                </p>
                <p className="text-gray-600 mb-6">
                  We are committed to creating opportunities at the root level, where young minds grow by doing, building, and solving, not just memorizing. By focusing on overall impact and practical growth, we aim to shape a generation that’s ready to contribute meaningfully to the world around them.
                </p>
                <p className="text-gray-600 mb-6">
                  NexLoop is driven by the belief that potential doesn’t need permission — it needs direction. We work to turn potential into progress by equipping learners with real-world exposure, strong mentorship, and a culture of collaboration that helps them thrive beyond traditional academic boundaries.
                </p>
                <p className="text-gray-600">
                  Our vision is to cultivate a generation that learns by building, leads with confidence, and uplifts others along the way — not just by teaching skills, but by igniting purpose One Loop at a Time.
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
                  At NexLoop, our mission is to revolutionize how education is experienced—by transforming conventional learning into an active, purpose-driven journey that aligns with the demands of today’s world and tomorrow’s possibilities. We aim to spark a mindset where curiosity leads, innovation follows, and learning is always in motion.
                </p>
                <p className="text-gray-600 mb-6">
                  Our approach moves beyond textbooks and tests. We prepare learners to tackle real-world complexities with confidence by immersing them in experiential learning environments that simulate authentic challenges. Whether through problem-solving projects, personalized learning paths, or mentorship from industry experts, we provide tools that go far beyond classroom walls.
                </p>
                <p className="text-gray-600 mb-6">
                  We focus on:
                  <ul className="list-disc pl-4 text-gray-600">
                    <li>Mentorship-driven guidance that tailors growth to each learner’s path.</li>
                    <li>Challenge-based experiences that inspire solution-oriented thinking.</li>
                    <li>An empowering team-work that values peer support, collaboration, and shared success.</li>
                  </ul>
                </p>
                <p className="text-gray-600">
                  At NexLoop, we don’t just teach for today—we shape thinkers, builders, and leaders for the future.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <Team />

      </main>

      <Footer />
    </div>
  );
};

export default About;