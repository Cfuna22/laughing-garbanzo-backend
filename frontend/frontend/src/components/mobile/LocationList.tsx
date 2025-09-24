import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Navigation } from "lucide-react";

interface LocationListProps {
  searchQuery: string;
}

export const LocationList = ({ searchQuery }: LocationListProps) => {
  const locations = [
    {
      id: 1,
      name: "First National Bank",
      address: "1 Tiamiyu Savage Street, Victoria Island",
      distance: "0.5 km",
      waitTime: "12 min",
      queueLength: 8,
      services: ["Teller Service", "Customer Service", "ATM"],
      status: "active",
      type: "Bank"
    },
    {
      id: 2,
      name: "Lagos University Teaching Hospital",
      address: "Idi-Araba, Surulere",
      distance: "1.2 km", 
      waitTime: "25 min",
      queueLength: 15,
      services: ["General Medicine", "Lab Tests", "Pharmacy"],
      status: "busy",
      type: "Hospital"
    },
    {
      id: 3,
      name: "Guaranty Trust Bank",
      address: "Plot 1, Obafemi Awolowo Way, Ikeja",
      distance: "2.1 km",
      waitTime: "8 min",
      queueLength: 5,
      services: ["Teller Service", "Account Opening", "Loans"],
      status: "active",
      type: "Bank"
    },
    {
      id: 4,
      name: "General Hospital Lagos",
      address: "Lagos Island",
      distance: "3.4 km",
      waitTime: "18 min",
      queueLength: 12,
      services: ["Emergency", "Outpatient", "X-Ray"],
      status: "active",
      type: "Hospital"
    },
    {
      id: 5,
      name: "Access Bank",
      address: "Herbert Macaulay Way, Yaba",
      distance: "1.8 km",
      waitTime: "15 min", 
      queueLength: 10,
      services: ["Teller Service", "Business Banking"],
      status: "busy",
      type: "Bank"
    }
  ];

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-queue-active text-white";
      case "busy":
        return "bg-queue-waiting text-white";
      default:
        return "bg-foreground-muted text-white";
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "Bank" ? "🏦" : "🏥";
  };

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-3 text-center">
          <div className="text-2xl font-bold text-qk-orange">{filteredLocations.length}</div>
          <div className="text-xs text-foreground-muted">Locations</div>
        </Card>
        <Card className="p-3 text-center">
          <div className="text-2xl font-bold text-qk-blue">
            {Math.round(filteredLocations.reduce((acc, loc) => acc + parseInt(loc.waitTime), 0) / filteredLocations.length) || 0}m
          </div>
          <div className="text-xs text-foreground-muted">Avg Wait</div>
        </Card>
        <Card className="p-3 text-center">
          <div className="text-2xl font-bold text-qk-slate">
            {filteredLocations.reduce((acc, loc) => acc + loc.queueLength, 0)}
          </div>
          <div className="text-xs text-foreground-muted">Total Queue</div>
        </Card>
      </div>

      {/* Location List */}
      <div className="space-y-3">
        {filteredLocations.map((location) => (
          <Card key={location.id} className="p-4 hover:shadow-qk-md transition-all duration-300 border-l-4 border-l-qk-orange/20">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-start space-x-3 flex-1">
                <div className="text-2xl">{getTypeIcon(location.type)}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg leading-tight">{location.name}</h3>
                  <p className="text-foreground-muted text-sm mt-1">{location.address}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Navigation className="w-3 h-3 text-qk-blue" />
                    <span className="text-xs text-qk-blue font-medium">{location.distance}</span>
                  </div>
                </div>
              </div>
              <Badge className={getStatusColor(location.status)}>
                {location.status}
              </Badge>
            </div>

            {/* Stats Row */}
            <div className="flex items-center justify-between mb-3 p-2 bg-background-muted rounded-lg">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-qk-orange" />
                <span className="text-sm font-medium">{location.waitTime}</span>
                <span className="text-xs text-foreground-muted">wait</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4 text-qk-blue" />
                <span className="text-sm font-medium">{location.queueLength}</span>
                <span className="text-xs text-foreground-muted">in queue</span>
              </div>
            </div>

            {/* Services */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {location.services.slice(0, 3).map((service, index) => (
                  <Badge key={index} variant="outline" className="text-xs px-2 py-1">
                    {service}
                  </Badge>
                ))}
                {location.services.length > 3 && (
                  <Badge variant="outline" className="text-xs px-2 py-1">
                    +{location.services.length - 3} more
                  </Badge>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <Button className="flex-1" size="sm">
                Join Queue
              </Button>
              <Button variant="outline" size="sm" className="px-3">
                <MapPin className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredLocations.length === 0 && (
        <Card className="p-8 text-center">
          <div className="w-16 h-16 bg-background-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-foreground-muted" />
          </div>
          <h3 className="font-semibold mb-2">No locations found</h3>
          <p className="text-foreground-muted text-sm mb-4">
            Try adjusting your search terms or browse all locations
          </p>
          <Button variant="outline">Clear Search</Button>
        </Card>
      )}
    </div>
  );
};