import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Award, Users, Globe, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="mb-16 text-center">
            <h1 className="text-5xl font-serif font-bold mb-6">About Himalayan Haven</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A legacy of excellence in hospitality since 1970
            </p>
          </div>

          {/* Story Section */}
          <section className="mb-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-serif font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  For over five decades, Himalayan Haven has stood as a beacon of luxury and elegance
                  in the heart of the city. What began as a vision to create an unparalleled
                  hospitality experience has evolved into a landmark destination known for its
                  impeccable service and timeless charm.
                </p>
                <p>
                  Our commitment to excellence extends beyond our beautifully appointed rooms
                  and world-class amenities. We believe in creating memories that last a lifetime,
                  ensuring every guest feels valued and cared for from the moment they arrive.
                </p>
                <p>
                  Today, Himalayan Haven continues to set the standard for luxury accommodation,
                  blending traditional elegance with modern comforts to provide an experience
                  that is both refined and welcoming.
                </p>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-serif font-bold mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Award,
                  title: "Excellence",
                  description: "We strive for perfection in every detail, from service to amenities."
                },
                {
                  icon: Users,
                  title: "Community",
                  description: "Building lasting relationships with our guests and local community."
                },
                {
                  icon: Globe,
                  title: "Sustainability",
                  description: "Committed to environmental responsibility and sustainable practices."
                },
                {
                  icon: Heart,
                  title: "Care",
                  description: "Treating every guest with warmth, respect, and genuine hospitality."
                },
              ].map((value, index) => (
                <div key={index} className="text-center p-6 bg-gradient-card rounded-lg shadow-soft">
                  <value.icon className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold text-xl mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Team Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-serif font-bold mb-12 text-center">Our Team</h2>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-muted-foreground mb-8">
                Behind every exceptional experience is our dedicated team of hospitality professionals.
                With years of combined experience, our staff is committed to making your stay
                memorable and comfortable.
              </p>
              <p className="text-lg text-muted-foreground">
                From our concierge service to housekeeping, every member of the Himalayan Haven family
                takes pride in delivering personalized service that exceeds expectations.
              </p>
            </div>
          </section>

          {/* Location Section */}
          <section>
            <h2 className="text-3xl font-serif font-bold mb-6 text-center">Location</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Located in the serene Mustang region, Himalayan Haven offers easy access to natural
            beauty, cultural landmarks, and breathtaking mountain vistas.
            </p>
            <div className="bg-muted rounded-lg p-8 text-center">
              <p className="text-lg font-medium mb-2">Mustang-4, Nepal</p>
              <p className="text-muted-foreground mt-4">Phone: +977-9812345678</p>
              <p className="text-muted-foreground">Email: info@himalayanhaven.com</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
