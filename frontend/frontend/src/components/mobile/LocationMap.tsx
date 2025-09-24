import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users } from "lucide-react";

interface LocationMapProps {
  searchQuery: string;
}

export const LocationMap = ({ searchQuery }: LocationMapProps) => {
  const locations = [
    {
      id: 1,
      name: "First National Bank",
      address: "Victoria Island",
      distance: "0.5 km",
      waitTime: "12 min",
      queueLength: 8,
      services: ["Teller Service", "Customer Service"],
      status: "active"
    },
    {
      id: 2,
      name: "Lagos University Teaching Hospital",
      address: "Idi-Araba",
      distance: "1.2 km",
      waitTime: "25 min",
      queueLength: 15,
      services: ["General Medicine", "Lab Tests"],
      status: "busy"
    },
    {
      id: 3,
      name: "Guaranty Trust Bank",
      address: "Ikeja",
      distance: "2.1 km",
      waitTime: "8 min",
      queueLength: 5,
      services: ["Teller Service", "Account Opening"],
      status: "active"
    }
  ];

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Map Placeholder */}
      <Card className="h-64 bg-gradient-to-br from-qk-blue/10 to-qk-orange/10 border border-card-border flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-qk-blue mx-auto mb-3" />
          <p className="text-foreground-muted">Interactive map coming soon</p>
          <p className="text-sm text-foreground-subtle">Showing {filteredLocations.length} nearby locations</p>
        </div>
      </Card>

      {/* Location Cards */}
      <div className="space-y-3">
        {filteredLocations.map((location) => (
          <Card key={location.id} className="p-4 hover:shadow-qk-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{location.name}</h3>
                <p className="text-foreground-muted text-sm">{location.address}</p>
                <p className="text-foreground-subtle text-sm">{location.distance} away</p>
              </div>
              <Badge 
                variant={location.status === "active" ? "default" : "secondary"}
                className={location.status === "active" ? "bg-queue-active" : "bg-queue-waiting"}
              >
                {location.status}
              </Badge>
            </div>

            <div className="flex items-center space-x-4 mb-3 text-sm">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-qk-orange" />
                <span>{location.waitTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4 text-qk-blue" />
                <span>{location.queueLength} in queue</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {location.services.map((service, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {service}
                </Badge>
              ))}
            </div>

            <Button className="w-full" size="sm">
              Join Queue
            </Button>
          </Card>
        ))}
      </div>

      {filteredLocations.length === 0 && (
        <Card className="p-8 text-center">
          <MapPin className="w-12 h-12 text-foreground-muted mx-auto mb-3" />
          <h3 className="font-semibold mb-2">No locations found</h3>
          <p className="text-foreground-muted text-sm">
            Try adjusting your search or check back later
          </p>
        </Card>
      )}
    </div>
  );
};