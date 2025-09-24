import { Button } from "@/components/ui/button";

interface NetworkSelectorProps {
  selectedNetwork: string;
  onNetworkSelect: (network: string) => void;
}

export const NetworkSelector = ({ selectedNetwork, onNetworkSelect }: NetworkSelectorProps) => {
  const networks = [
    { id: "mtn", name: "MTN", color: "#FFCB05", logo: "🟡" },
    { id: "airtel", name: "Airtel", color: "#ED1C24", logo: "🔴" },
    { id: "glo", name: "Glo", color: "#00A651", logo: "🟢" },
    { id: "9mobile", name: "9mobile", color: "#009639", logo: "💚" }
  ];

  return (
    <div className="grid grid-cols-4 gap-2 mt-2">
      {networks.map((network) => (
        <Button
          key={network.id}
          variant={selectedNetwork === network.id ? "default" : "outline"}
          className={`h-16 flex-col space-y-1 ${
            selectedNetwork === network.id 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-background-muted"
          }`}
          onClick={() => onNetworkSelect(network.id)}
        >
          <span className="text-lg">{network.logo}</span>
          <span className="text-xs font-medium">{network.name}</span>
        </Button>
      ))}
    </div>
  );
};