import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, MapPin, Bell, X } from "lucide-react";
import { QueueStatus } from "@/components/mobile/QueueStatus";
import { useToast } from "@/hooks/use-toast";

const Queue = () => {
  const [currentTicket, setCurrentTicket] = useState<string | null>("T-054");
  const [queuePosition, setQueuePosition] = useState(8);
  const [estimatedWait, setEstimatedWait] = useState(15);
  const [totalInQueue] = useState(23);
  const { toast } = useToast();

  // Simulate queue updates
  useEffect(() => {
    if (!currentTicket) return;
    
    const interval = setInterval(() => {
      if (queuePosition > 1) {
        setQueuePosition(prev => prev - 1);
        setEstimatedWait(prev => Math.max(2, prev - 2));
        
        if (queuePosition <= 3) {
          toast({
            title: "Almost your turn!",
            description: `Only ${queuePosition - 1} people ahead of you`,
          });
        }
      }
    }, 10000); // Update every 10 seconds for demo

    return () => clearInterval(interval);
  }, [currentTicket, queuePosition, toast]);

  const progressPercentage = ((totalInQueue - queuePosition) / totalInQueue) * 100;

  if (!currentTicket) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-background-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-foreground-muted" />
          </div>
          <h2 className="text-xl font-bold mb-2">No Active Queue</h2>
          <p className="text-foreground-muted mb-6">
            You're not currently in any queue. Visit the Home tab to find and join a kiosk queue.
          </p>
          <Button className="w-full">
            Find Kiosks
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-white p-4 pb-8">
        <div className="max-w-md mx-auto text-center">
          <Badge variant="secondary" className="mb-2 bg-white/20 text-white border-0">
            First National Bank
          </Badge>
          <h1 className="text-3xl font-bold mb-1">{currentTicket}</h1>
          <p className="text-white/80">Your ticket number</p>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 -mt-4 relative z-10">
        {/* Main Queue Status Card */}
        <Card className="p-6 bg-white shadow-qk-lg border-0">
          <QueueStatus
            position={queuePosition}
            estimatedWait={estimatedWait}
            totalInQueue={totalInQueue}
          />
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Queue Progress</span>
              <span className="text-sm text-foreground-muted">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </Card>

        {/* Location Info */}
        <Card className="mt-4 p-4">
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-qk-blue mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold">First National Bank</h3>
              <p className="text-sm text-foreground-muted">Victoria Island Branch</p>
              <p className="text-sm text-foreground-muted">1 Tiamiyu Savage Street</p>
            </div>
          </div>
        </Card>

        {/* Service Info */}
        <Card className="mt-4 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Service</h4>
              <p className="text-sm text-foreground-muted">Teller Service</p>
            </div>
            <Badge variant="outline">Counter 3</Badge>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              toast({
                title: "Notifications enabled",
                description: "You'll be notified when it's almost your turn",
              });
            }}
          >
            <Bell className="w-4 h-4 mr-2" />
            Enable Notifications
          </Button>
          
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={() => {
              setCurrentTicket(null);
              toast({
                title: "Left queue",
                description: "You have successfully left the queue",
              });
            }}
          >
            <X className="w-4 h-4 mr-2" />
            Leave Queue
          </Button>
        </div>

        {/* Tips */}
        <Card className="mt-6 p-4 bg-qk-blue/5 border-qk-blue/20">
          <h4 className="font-medium text-qk-blue mb-2">💡 Tips</h4>
          <ul className="text-sm text-foreground-muted space-y-1">
            <li>• Stay within 5 minutes of the location</li>
            <li>• Keep your phone's notifications enabled</li>
            <li>• Have your ID ready when called</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Queue;