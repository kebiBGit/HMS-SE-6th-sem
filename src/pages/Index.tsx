import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RoomCard } from "@/components/RoomCard";
import { Star, MapPin, Clock, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-hotel.jpg";

const Index = () => {
  const [featuredRooms, setFeaturedRooms] = useState([]);

  useEffect(() => {
    fetchFeaturedRooms();
  }, []);

  const fetchFeaturedRooms = async () => {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('is_available', true)
      .limit(3);

    if (!error && data) {
      setFeaturedRooms(data);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Himalayan Haven"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
            Welcome to Himalayan Haven
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Experience luxury and comfort in the heart of the city
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/rooms">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-lg px-8">
                Explore Rooms
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Star, title: "5-Star Service", desc: "Excellence in hospitality" },
              { icon: MapPin, title: "Prime Location", desc: "City center access" },
              { icon: Clock, title: "24/7 Support", desc: "Always here for you" },
              { icon: Award, title: "Award Winning", desc: "Recognized excellence" },
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 transition-transform hover:scale-105">
                <feature.icon className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4">Featured Rooms</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our carefully curated selection of luxury accommodations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map((room: any) => (
              <RoomCard
                key={room.id}
                id={room.id}
                name={room.name}
                type={room.type}
                description={room.description}
                price={room.price_per_night}
                capacity={room.capacity}
                amenities={room.amenities}
                image={room.image_url}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/rooms">
              <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                View All Rooms
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold mb-6">About Himalayan Haven</h2>
            <p className="text-lg text-muted-foreground mb-8">
              For over 50 years, Himalayan Haven has been the epitome of luxury and elegance. 
              Our commitment to exceptional service and attention to detail ensures every 
              guest experiences the finest hospitality.
            </p>
            <Link to="/about">
              <Button variant="outline">Learn More About Us</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
