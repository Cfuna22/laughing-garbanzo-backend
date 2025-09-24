import { Clock, Users, TrendingUp } from "lucide-react";

interface QueueStatusProps {
  position: number;
  estimatedWait: number;
  totalInQueue: number;
}

export const QueueStatus = ({ position, estimatedWait, totalInQueue }: QueueStatusProps) => {
  const getStatusMessage = () => {
    if (position <= 1) return "You're next!";
    if (position <= 3) return "Almost your turn";
    if (position <= 5) return "Get ready";
    return "Please wait";
  };

  const getStatusColor = () => {
    if (position <= 1) return "text-queue-active";
    if (position <= 3) return "text-qk-orange";
    return "text-qk-blue";
  };

  return (
    <div className="text-center space-y-6">
      {/* Main Status */}
      <div>
        <div className={`text-4xl font-bold mb-2 ${getStatusColor()}`}>
          {position === 0 ? "NOW" : position}
        </div>
        <div className="text-foreground-muted">
          {position === 0 ? "It's your turn!" : "people ahead of you"}
        </div>
        <div className={`text-lg font-semibold mt-2 ${getStatusColor()}`}>
          {getStatusMessage()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-background-muted rounded-lg p-4 text-center">
          <Clock className="w-6 h-6 text-qk-orange mx-auto mb-2" />
          <div className="text-2xl font-bold text-qk-orange">{estimatedWait}</div>
          <div className="text-sm text-foreground-muted">minutes left</div>
        </div>
        
        <div className="bg-background-muted rounded-lg p-4 text-center">
          <Users className="w-6 h-6 text-qk-blue mx-auto mb-2" />
          <div className="text-2xl font-bold text-qk-blue">{totalInQueue}</div>
          <div className="text-sm text-foreground-muted">total in queue</div>
        </div>
      </div>

      {/* Live Updates Indicator */}
      <div className="flex items-center justify-center space-x-2 text-sm text-foreground-muted">
        <div className="w-2 h-2 bg-queue-active rounded-full animate-pulse"></div>
        <span>Live updates enabled</span>
        <TrendingUp className="w-4 h-4" />
      </div>
    </div>
  );
};