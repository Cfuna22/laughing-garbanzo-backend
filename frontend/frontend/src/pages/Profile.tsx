import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Settings, 
  Bell, 
  CreditCard, 
  History, 
  HelpCircle, 
  Shield, 
  LogOut,
  ChevronRight,
  Star,
  Calendar,
  Smartphone
} from "lucide-react";

const Profile = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "080XXXX1234",
    joinDate: "March 2024",
    totalQueues: 24,
    totalVTU: 156,
    rating: 4.8
  };

  const menuItems = [
    { icon: User, label: "Edit Profile", badge: null },
    { icon: Bell, label: "Notifications", badge: "3" },
    { icon: CreditCard, label: "Payment Methods", badge: null },
    { icon: History, label: "Transaction History", badge: null },
    { icon: Settings, label: "App Settings", badge: null },
    { icon: Shield, label: "Privacy & Security", badge: null },
    { icon: HelpCircle, label: "Help & Support", badge: null },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-white p-4 pb-8">
        <div className="max-w-md mx-auto text-center">
          <Avatar className="w-20 h-20 mx-auto mb-4 border-4 border-white/20">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback className="bg-white/20 text-2xl font-bold">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
          <p className="text-white/80 mb-2">{user.email}</p>
          <Badge variant="secondary" className="bg-white/20 text-white border-0">
            Member since {user.joinDate}
          </Badge>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 -mt-4 relative z-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="p-4 text-center bg-white shadow-qk-md border-0">
            <div className="text-2xl font-bold text-qk-orange mb-1">{user.totalQueues}</div>
            <div className="text-xs text-foreground-muted">Queues Joined</div>
          </Card>
          <Card className="p-4 text-center bg-white shadow-qk-md border-0">
            <div className="text-2xl font-bold text-qk-blue mb-1">{user.totalVTU}</div>
            <div className="text-xs text-foreground-muted">VTU Purchases</div>
          </Card>
          <Card className="p-4 text-center bg-white shadow-qk-md border-0">
            <div className="flex items-center justify-center mb-1">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="text-2xl font-bold">{user.rating}</span>
            </div>
            <div className="text-xs text-foreground-muted">Rating</div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-4 mb-6">
          <h3 className="font-semibold mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-auto p-3 flex-col">
              <Calendar className="w-5 h-5 mb-2 text-qk-blue" />
              <span className="text-sm">Queue History</span>
            </Button>
            <Button variant="outline" className="h-auto p-3 flex-col">
              <Smartphone className="w-5 h-5 mb-2 text-qk-orange" />
              <span className="text-sm">VTU History</span>
            </Button>
          </div>
        </Card>

        {/* Menu Items */}
        <Card className="p-0 mb-6 overflow-hidden">
          {menuItems.map((item, index) => (
            <div key={index} className="border-b border-border last:border-0">
              <Button
                variant="ghost"
                className="w-full justify-between h-auto p-4 rounded-none"
              >
                <div className="flex items-center">
                  <item.icon className="w-5 h-5 mr-3 text-foreground-muted" />
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center">
                  {item.badge && (
                    <Badge variant="secondary" className="mr-2 bg-qk-orange text-white">
                      {item.badge}
                    </Badge>
                  )}
                  <ChevronRight className="w-4 h-4 text-foreground-muted" />
                </div>
              </Button>
            </div>
          ))}
        </Card>

        {/* Logout Button */}
        <Card className="p-4 mb-6">
          <Button variant="destructive" className="w-full">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </Card>

        {/* App Info */}
        <div className="text-center text-sm text-foreground-muted pb-6">
          <p>Q-Kiosk Mobile App</p>
          <p>Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;