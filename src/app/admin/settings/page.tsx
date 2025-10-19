"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  Settings,
  Save,
  RefreshCw,
  Shield,
  Bell,
  Globe,
  CreditCard,
  Users,
  Building,
  Palette,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Sidebar from "@/components/Sidebar";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    hotelName: "7Luck Hotel & Resorts",
    hotelAddress: "777 Paradise Beach Road, Tropical Island",
    hotelPhone: "+1 (555) 777-LUCK",
    hotelEmail: "info@7luckhotel.com",
    checkInTime: "15:00",
    checkOutTime: "11:00",
    currency: "USD",
    timezone: "America/New_York",
    language: "en",
    maintenanceMode: false,
    allowOnlineBookings: true,
    requireEmailConfirmation: true,
    autoAssignRooms: false,
    enableLoyaltyProgram: true,
    taxRate: 12,
    serviceFee: 25,
    cleaningFee: 50,
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "",
    smtpPassword: "",
    notificationEmail: "admin@7luckhotel.com",
    enableBookingNotifications: true,
    enableMaintenanceAlerts: true,
    enableRevenueReports: true,
    reportFrequency: "daily",
    theme: "light",
    primaryColor: "#003366",
    secondaryColor: "#d4af37",
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSettingChange = (
    key: string,
    value: string | number | boolean,
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    alert("Settings saved successfully!");
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all settings to default?")) {
      // Reset to default settings
      setSettings({
        hotelName: "7Luck Hotel & Resorts",
        hotelAddress: "777 Paradise Beach Road, Tropical Island",
        hotelPhone: "+1 (555) 777-LUCK",
        hotelEmail: "info@7luckhotel.com",
        checkInTime: "15:00",
        checkOutTime: "11:00",
        currency: "USD",
        timezone: "America/New_York",
        language: "en",
        maintenanceMode: false,
        allowOnlineBookings: true,
        requireEmailConfirmation: true,
        autoAssignRooms: false,
        enableLoyaltyProgram: true,
        taxRate: 12,
        serviceFee: 25,
        cleaningFee: 50,
        smtpHost: "smtp.gmail.com",
        smtpPort: "587",
        smtpUsername: "",
        smtpPassword: "",
        notificationEmail: "admin@7luckhotel.com",
        enableBookingNotifications: true,
        enableMaintenanceAlerts: true,
        enableRevenueReports: true,
        reportFrequency: "daily",
        theme: "light",
        primaryColor: "#003366",
        secondaryColor: "#d4af37",
      });
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-playfair font-bold text-slate-800">
                System Settings
              </h1>
              <p className="text-slate-600">
                Configure hotel operations and system preferences
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleReset}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-blue-900 hover:bg-blue-800"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save Changes
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="booking">Booking</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Hotel Information
                  </CardTitle>
                  <CardDescription>
                    Basic hotel details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hotelName">Hotel Name</Label>
                      <Input
                        id="hotelName"
                        value={settings.hotelName}
                        onChange={(e) =>
                          handleSettingChange("hotelName", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="hotelEmail">Hotel Email</Label>
                      <Input
                        id="hotelEmail"
                        type="email"
                        value={settings.hotelEmail}
                        onChange={(e) =>
                          handleSettingChange("hotelEmail", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="hotelPhone">Hotel Phone</Label>
                      <Input
                        id="hotelPhone"
                        value={settings.hotelPhone}
                        onChange={(e) =>
                          handleSettingChange("hotelPhone", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="hotelAddress">Hotel Address</Label>
                      <Textarea
                        id="hotelAddress"
                        value={settings.hotelAddress}
                        onChange={(e) =>
                          handleSettingChange("hotelAddress", e.target.value)
                        }
                        rows={2}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="checkInTime">Check-in Time</Label>
                      <Input
                        id="checkInTime"
                        value={settings.checkInTime}
                        onChange={(e) =>
                          handleSettingChange("checkInTime", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="checkOutTime">Check-out Time</Label>
                      <Input
                        id="checkOutTime"
                        value={settings.checkOutTime}
                        onChange={(e) =>
                          handleSettingChange("checkOutTime", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="currency">Currency</Label>
                      <Select
                        value={settings.currency}
                        onValueChange={(value) =>
                          handleSettingChange("currency", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                          <SelectItem value="CAD">CAD (C$)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    System Settings
                  </CardTitle>
                  <CardDescription>
                    System-wide configuration options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-slate-600">
                        Temporarily disable public booking
                      </p>
                    </div>
                    <Switch
                      checked={settings.maintenanceMode}
                      onCheckedChange={(checked) =>
                        handleSettingChange("maintenanceMode", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Allow Online Bookings</Label>
                      <p className="text-sm text-slate-600">
                        Enable guest self-booking
                      </p>
                    </div>
                    <Switch
                      checked={settings.allowOnlineBookings}
                      onCheckedChange={(checked) =>
                        handleSettingChange("allowOnlineBookings", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-assign Rooms</Label>
                      <p className="text-sm text-slate-600">
                        Automatically assign rooms to bookings
                      </p>
                    </div>
                    <Switch
                      checked={settings.autoAssignRooms}
                      onCheckedChange={(checked) =>
                        handleSettingChange("autoAssignRooms", checked)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="booking" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Guest Experience
                  </CardTitle>
                  <CardDescription>
                    Settings that affect guest interactions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Require Email Confirmation</Label>
                      <p className="text-sm text-slate-600">
                        Send confirmation emails for bookings
                      </p>
                    </div>
                    <Switch
                      checked={settings.requireEmailConfirmation}
                      onCheckedChange={(checked) =>
                        handleSettingChange("requireEmailConfirmation", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable Loyalty Program</Label>
                      <p className="text-sm text-slate-600">
                        Track guest stays and offer rewards
                      </p>
                    </div>
                    <Switch
                      checked={settings.enableLoyaltyProgram}
                      onCheckedChange={(checked) =>
                        handleSettingChange("enableLoyaltyProgram", checked)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Pricing & Fees
                  </CardTitle>
                  <CardDescription>
                    Configure taxes, fees, and pricing rules
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="taxRate">Tax Rate (%)</Label>
                      <Input
                        id="taxRate"
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={settings.taxRate}
                        onChange={(e) =>
                          handleSettingChange(
                            "taxRate",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="serviceFee">Service Fee ($)</Label>
                      <Input
                        id="serviceFee"
                        type="number"
                        min="0"
                        value={settings.serviceFee}
                        onChange={(e) =>
                          handleSettingChange(
                            "serviceFee",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="cleaningFee">Cleaning Fee ($)</Label>
                      <Input
                        id="cleaningFee"
                        type="number"
                        min="0"
                        value={settings.cleaningFee}
                        onChange={(e) =>
                          handleSettingChange(
                            "cleaningFee",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Email Configuration
                  </CardTitle>
                  <CardDescription>
                    SMTP settings for system notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="smtpHost">SMTP Host</Label>
                      <Input
                        id="smtpHost"
                        value={settings.smtpHost}
                        onChange={(e) =>
                          handleSettingChange("smtpHost", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="smtpPort">SMTP Port</Label>
                      <Input
                        id="smtpPort"
                        value={settings.smtpPort}
                        onChange={(e) =>
                          handleSettingChange("smtpPort", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="smtpUsername">SMTP Username</Label>
                      <Input
                        id="smtpUsername"
                        value={settings.smtpUsername}
                        onChange={(e) =>
                          handleSettingChange("smtpUsername", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="smtpPassword">SMTP Password</Label>
                      <Input
                        id="smtpPassword"
                        type="password"
                        value={settings.smtpPassword}
                        onChange={(e) =>
                          handleSettingChange("smtpPassword", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label htmlFor="notificationEmail">
                      Notification Email
                    </Label>
                    <Input
                      id="notificationEmail"
                      type="email"
                      value={settings.notificationEmail}
                      onChange={(e) =>
                        handleSettingChange("notificationEmail", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Booking Notifications</Label>
                        <p className="text-sm text-slate-600">
                          Email alerts for new bookings
                        </p>
                      </div>
                      <Switch
                        checked={settings.enableBookingNotifications}
                        onCheckedChange={(checked) =>
                          handleSettingChange(
                            "enableBookingNotifications",
                            checked,
                          )
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Maintenance Alerts</Label>
                        <p className="text-sm text-slate-600">
                          Notifications for maintenance tasks
                        </p>
                      </div>
                      <Switch
                        checked={settings.enableMaintenanceAlerts}
                        onCheckedChange={(checked) =>
                          handleSettingChange(
                            "enableMaintenanceAlerts",
                            checked,
                          )
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Revenue Reports</Label>
                        <p className="text-sm text-slate-600">
                          Automated revenue reports
                        </p>
                      </div>
                      <Switch
                        checked={settings.enableRevenueReports}
                        onCheckedChange={(checked) =>
                          handleSettingChange("enableRevenueReports", checked)
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="reportFrequency">Report Frequency</Label>
                    <Select
                      value={settings.reportFrequency}
                      onValueChange={(value) =>
                        handleSettingChange("reportFrequency", value)
                      }
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Theme & Branding
                  </CardTitle>
                  <CardDescription>
                    Customize the visual appearance of your hotel system
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="primaryColor">Primary Color</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="primaryColor"
                          type="color"
                          value={settings.primaryColor}
                          onChange={(e) =>
                            handleSettingChange("primaryColor", e.target.value)
                          }
                          className="w-16 h-10"
                        />
                        <Input
                          value={settings.primaryColor}
                          onChange={(e) =>
                            handleSettingChange("primaryColor", e.target.value)
                          }
                          placeholder="#003366"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="secondaryColor">Secondary Color</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="secondaryColor"
                          type="color"
                          value={settings.secondaryColor}
                          onChange={(e) =>
                            handleSettingChange(
                              "secondaryColor",
                              e.target.value,
                            )
                          }
                          className="w-16 h-10"
                        />
                        <Input
                          value={settings.secondaryColor}
                          onChange={(e) =>
                            handleSettingChange(
                              "secondaryColor",
                              e.target.value,
                            )
                          }
                          placeholder="#d4af37"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="theme">Theme</Label>
                    <Select
                      value={settings.theme}
                      onValueChange={(value) =>
                        handleSettingChange("theme", value)
                      }
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="auto">Auto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Preview</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: settings.primaryColor }}
                        ></div>
                        <span className="text-sm">Primary Color</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: settings.secondaryColor }}
                        ></div>
                        <span className="text-sm">Secondary Color</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
