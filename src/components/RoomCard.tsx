import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Wifi, Tv, Coffee } from "lucide-react";

interface RoomCardProps {
  id: string;
  name: string;
  type: string;
  description: string;
  price: number;
  capacity: number;
  amenities: string[];
  image: string;
}

export const RoomCard = ({ id, name, type, description, price, capacity, amenities, image }: RoomCardProps) => {
  const getAmenityIcon = (amenity: string) => {
    if (amenity.toLowerCase().includes('wifi')) return <Wifi className="h-4 w-4" />;
    if (amenity.toLowerCase().includes('tv')) return <Tv className="h-4 w-4" />;
    if (amenity.toLowerCase().includes('coffee')) return <Coffee className="h-4 w-4" />;
    return null;
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-elegant group">
      <div className="relative overflow-hidden h-64">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
          {type}
        </Badge>
      </div>
      <CardHeader>
        <CardTitle className="font-serif text-2xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
          <Users className="h-4 w-4" />
          <span>Up to {capacity} guests</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {amenities.slice(0, 3).map((amenity, index) => (
            <div key={index} className="flex items-center space-x-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
              {getAmenityIcon(amenity)}
              <span>{amenity}</span>
            </div>
          ))}
          {amenities.length > 3 && (
            <span className="text-xs text-muted-foreground">+{amenities.length - 3} more</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">From</p>
          <p className="text-2xl font-bold text-accent">${price}<span className="text-sm text-muted-foreground">/night</span></p>
        </div>
        <Link to={`/booking/${id}`}>
          <Button className="bg-accent hover:bg-accent/90">Book Now</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
