import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_KIOSKS } from "@/graphql/queries";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Clock, Users } from "lucide-react";
import { LocationMap } from "@/components/mobile/LocationMap";
import { LocationList } from "@/components/mobile/LocationList";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"map" | "list">("map");

  // Fetch kiosks from backend
  const { data, loading, error } = useQuery(GET_KIOSKS);

  const kiosks = data?.kiosks || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-white p-4 pb-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-2">Q-Kiosk</h1>
          <p className="text-white/80 mb-4">Find nearby kiosks and join queues</p>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground-muted w-4 h-4" />
            <Input
              placeholder="Search locations, services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
            />
          </div>
        </div>
      </header>

      {/* View Toggle */}
      <div className="max-w-md mx-auto px-4 -mt-3 relative z-10">
        <Card className="p-1 bg-white shadow-qk-md">
          <div className="flex rounded-lg bg-background-muted p-1">
            <Button
              variant={viewMode === "map" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("map")}
              className="flex-1"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Map
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="flex-1"
            >
              <Users className="w-4 h-4 mr-2" />
              List
            </Button>
          </div>
        </Card>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        {loading && <p className="text-center">Loading kiosks...</p>}
        {error && (
          <p className="text-center text-red-500">
            Failed to load kiosks: {error.message}
          </p>
        )}

        {!loading && !error && (
          <>
            {viewMode === "map" ? (
              <LocationMap searchQuery={searchQuery} kiosks={kiosks} />
            ) : (
              <LocationList searchQuery={searchQuery} kiosks={kiosks} />
            )}

            {/* Quick Stats */}
            <Card className="mt-6 p-4 bg-gradient-queue border-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-qk-orange" />
                  <span className="font-medium">Total Kiosks</span>
                </div>
                <span className="text-2xl font-bold text-qk-orange">
                  {kiosks.length}
                </span>
              </div>
              <p className="text-sm text-foreground-muted mt-1">
                Connected locations in the system
              </p>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

