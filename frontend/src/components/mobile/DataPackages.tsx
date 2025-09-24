import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DataPackagesProps {
  network: string;
  onPurchase: (packageName: string, amount: string) => void;
}

export const DataPackages = ({ network, onPurchase }: DataPackagesProps) => {
  const getPackages = (networkId: string) => {
    const packages = {
      mtn: [
        { name: "100MB Daily", amount: "₦100", validity: "1 day", popular: false },
        { name: "350MB Weekly", amount: "₦300", validity: "7 days", popular: false },
        { name: "1GB Monthly", amount: "₦500", validity: "30 days", popular: true },
        { name: "2GB Monthly", amount: "₦1,200", validity: "30 days", popular: true },
        { name: "5GB Monthly", amount: "₦2,500", validity: "30 days", popular: false },
        { name: "10GB Monthly", amount: "₦5,000", validity: "30 days", popular: false },
      ],
      airtel: [
        { name: "100MB Daily", amount: "₦100", validity: "1 day", popular: false },
        { name: "300MB Weekly", amount: "₦300", validity: "7 days", popular: false },
        { name: "1GB Monthly", amount: "₦500", validity: "30 days", popular: true },
        { name: "2GB Monthly", amount: "₦1,000", validity: "30 days", popular: true },
        { name: "5GB Monthly", amount: "₦2,000", validity: "30 days", popular: false },
        { name: "10GB Monthly", amount: "₦4,000", validity: "30 days", popular: false },
      ],
      glo: [
        { name: "150MB Daily", amount: "₦100", validity: "1 day", popular: false },
        { name: "500MB Weekly", amount: "₦300", validity: "7 days", popular: false },
        { name: "1.2GB Monthly", amount: "₦500", validity: "30 days", popular: true },
        { name: "2.9GB Monthly", amount: "₦1,000", validity: "30 days", popular: true },
        { name: "7.5GB Monthly", amount: "₦2,000", validity: "30 days", popular: false },
        { name: "12GB Monthly", amount: "₦3,000", validity: "30 days", popular: false },
      ],
      "9mobile": [
        { name: "100MB Daily", amount: "₦100", validity: "1 day", popular: false },
        { name: "300MB Weekly", amount: "₦300", validity: "7 days", popular: false },
        { name: "1GB Monthly", amount: "₦500", validity: "30 days", popular: true },
        { name: "2GB Monthly", amount: "₦1,200", validity: "30 days", popular: true },
        { name: "4.5GB Monthly", amount: "₦2,000", validity: "30 days", popular: false },
        { name: "11GB Monthly", amount: "₦4,000", validity: "30 days", popular: false },
      ]
    };
    
    return packages[networkId as keyof typeof packages] || [];
  };

  const packages = getPackages(network);

  if (!network) {
    return (
      <p className="text-sm text-foreground-muted text-center py-8">
        Please select a network first
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {packages.map((pkg, index) => (
        <div
          key={index}
          className={`border rounded-lg p-4 transition-all hover:shadow-qk-sm ${
            pkg.popular ? "border-qk-orange bg-qk-orange/5" : "border-border"
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold">{pkg.name}</h4>
                {pkg.popular && (
                  <Badge className="bg-qk-orange text-white text-xs">
                    Popular
                  </Badge>
                )}
              </div>
              <p className="text-sm text-foreground-muted">Valid for {pkg.validity}</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-qk-orange">{pkg.amount}</div>
            </div>
          </div>
          
          <Button
            className="w-full"
            size="sm"
            variant={pkg.popular ? "default" : "outline"}
            onClick={() => onPurchase(pkg.name, pkg.amount)}
          >
            Purchase {pkg.name}
          </Button>
        </div>
      ))}
    </div>
  );
};