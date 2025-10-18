import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RoomCard } from "@/components/RoomCard";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    if (typeFilter === "all") {
      setFilteredRooms(rooms);
    } else {
      setFilteredRooms(rooms.filter((room: any) => room.type === typeFilter));
    }
  }, [typeFilter, rooms]);

  const fetchRooms = async () => {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('is_available', true)
      .order('price_per_night', { ascending: true });

    if (!error && data) {
      setRooms(data);
      setFilteredRooms(data);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-serif font-bold mb-4">Our Rooms & Suites</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose from our collection of elegantly designed rooms and suites
            </p>
          </div>

          <div className="mb-8 flex justify-center">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Filter by room type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Rooms</SelectItem>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="double">Double</SelectItem>
                <SelectItem value="suite">Suite</SelectItem>
                <SelectItem value="deluxe">Deluxe</SelectItem>
                <SelectItem value="presidential">Presidential</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredRooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRooms.map((room: any) => (
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
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No rooms available at the moment.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Rooms;
