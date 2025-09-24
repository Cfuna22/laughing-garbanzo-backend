import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smartphone, Wifi, CreditCard, History } from "lucide-react";
import { NetworkSelector } from "@/components/mobile/NetworkSelector";
import { AirtimePackages } from "@/components/mobile/AirtimePackages";
import { DataPackages } from "@/components/mobile/DataPackages";
import { useToast } from "@/hooks/use-toast";

const VTU = () => {
  const [selectedNetwork, setSelectedNetwork] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [activeTab, setActiveTab] = useState("airtime");
  const { toast } = useToast();

  const handlePurchase = (type: string, amount: string, packageName?: string) => {
    if (!selectedNetwork || !phoneNumber) {
      toast({
        title: "Missing Information",
        description: "Please select a network and enter phone number",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Purchase Initiated",
      description: `${packageName || amount} ${type} for ${phoneNumber}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-white p-4 pb-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-2">VTU Services</h1>
          <p className="text-white/80">Buy airtime and data instantly</p>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 -mt-2 relative z-10">
        {/* Balance Card */}
        <Card className="p-4 bg-white shadow-qk-md border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground-muted">Wallet Balance</p>
              <p className="text-2xl font-bold text-qk-orange">₦2,450.00</p>
            </div>
            <Button variant="outline" size="sm">
              <CreditCard className="w-4 h-4 mr-2" />
              Add Money
            </Button>
          </div>
        </Card>

        {/* Network & Phone Selection */}
        <Card className="mt-4 p-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="network">Select Network</Label>
              <NetworkSelector
                selectedNetwork={selectedNetwork}
                onNetworkSelect={setSelectedNetwork}
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="080XXXXXXXX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </Card>

        {/* Services Tabs */}
        <Card className="mt-4 p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="airtime" className="flex items-center">
                <Smartphone className="w-4 h-4 mr-2" />
                Airtime
              </TabsTrigger>
              <TabsTrigger value="data" className="flex items-center">
                <Wifi className="w-4 h-4 mr-2" />
                Data
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="airtime" className="mt-4">
              <AirtimePackages
                network={selectedNetwork}
                onPurchase={(amount) => handlePurchase("airtime", amount)}
              />
            </TabsContent>
            
            <TabsContent value="data" className="mt-4">
              <DataPackages
                network={selectedNetwork}
                onPurchase={(packageName, amount) => handlePurchase("data", amount, packageName)}
              />
            </TabsContent>
          </Tabs>
        </Card>

        {/* Recent Transactions */}
        <Card className="mt-4 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center">
              <History className="w-4 h-4 mr-2" />
              Recent Transactions
            </h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          
          <div className="space-y-3">
            {[
              { type: "Airtime", amount: "₦500", number: "080XXXX1234", status: "Success", time: "2 mins ago" },
              { type: "Data - 2GB", amount: "₦1,200", number: "080XXXX1234", status: "Success", time: "1 hour ago" },
              { type: "Airtime", amount: "₦1,000", number: "070XXXX5678", status: "Failed", time: "3 hours ago" },
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex-1">
                  <p className="font-medium text-sm">{transaction.type}</p>
                  <p className="text-xs text-foreground-muted">{transaction.number}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">{transaction.amount}</p>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={transaction.status === "Success" ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {transaction.status}
                    </Badge>
                    <span className="text-xs text-foreground-muted">{transaction.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Promo Banner */}
        <Card className="mt-4 p-4 bg-gradient-primary text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold">Get 10% Bonus!</h4>
              <p className="text-sm text-white/80">On data purchases above ₦2,000</p>
            </div>
            <Button variant="secondary" size="sm">
              Learn More
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VTU;