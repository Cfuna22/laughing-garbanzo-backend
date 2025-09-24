import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface AirtimePackagesProps {
  network: string;
  onPurchase: (amount: string) => void;
}

export const AirtimePackages = ({ network, onPurchase }: AirtimePackagesProps) => {
  const [customAmount, setCustomAmount] = useState("");
  
  const quickAmounts = ["₦100", "₦200", "₦500", "₦1,000", "₦2,000", "₦5,000"];

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium mb-3 block">Quick Top-up</Label>
        <div className="grid grid-cols-3 gap-2">
          {quickAmounts.map((amount) => (
            <Button
              key={amount}
              variant="outline"
              className="h-12"
              onClick={() => onPurchase(amount)}
              disabled={!network}
            >
              {amount}
            </Button>
          ))}
        </div>
      </div>

      <div className="border-t pt-4">
        <Label htmlFor="custom-amount" className="text-sm font-medium">
          Custom Amount
        </Label>
        <div className="flex space-x-2 mt-2">
          <Input
            id="custom-amount"
            placeholder="Enter amount"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={() => customAmount && onPurchase(`₦${customAmount}`)}
            disabled={!network || !customAmount}
          >
            Buy
          </Button>
        </div>
      </div>

      {!network && (
        <p className="text-sm text-foreground-muted text-center py-4">
          Please select a network first
        </p>
      )}
    </div>
  );
};