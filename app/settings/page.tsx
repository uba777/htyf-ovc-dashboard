"use client"

import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import {
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Save,
  Upload,
  Download,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings as SettingsIcon,
  Eye,
  EyeOff,
  Key,
  Monitor,
  Moon,
  Sun,
} from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const [profileData, setProfileData] = useState({
    firstName: "Jennifer",
    lastName: "Adams",
    email: "jennifer.adams@htyf.org",
    phone: "+1 (555) 123-4567",
    role: "Senior Case Worker",
    department: "Child Services",
    location: "Sacramento, CA",
    bio: "Experienced case worker with 8 years of service in child welfare and family support.",
    avatar: "/professional-avatar.png",
  })

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true,
    weeklyReports: true,
    emergencyAlerts: true,
    caseUpdates: true,
    sponsorNotifications: false,
    systemMaintenance: false,
  })

  const [preferences, setPreferences] = useState({
    theme: "system",
    language: "en",
    timezone: "America/Los_Angeles",
    dateFormat: "MM/DD/YYYY",
    itemsPerPage: 25,
    autoSave: true,
    compactMode: false,
  })

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginNotifications: true,
    deviceManagement: true,
  })

  const [system, setSystem] = useState({
    dataRetention: 7,
    backupFrequency: "daily",
    logLevel: "info",
    analytics: true,
    errorReporting: true,
  })

  const handleSave = (section: string) => {
    console.log(`Saving ${section} settings`)
    // Here you would typically make an API call to save the settings
  }

  const handleExport = () => {
    console.log("Exporting settings")
    // Export settings functionality
  }

  const handleImport = () => {
    console.log("Importing settings")
    // Import settings functionality
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and application preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal information and profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profileData.avatar} alt="Profile" />
                    <AvatarFallback>JA</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Change Photo
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      JPG, GIF or PNG. 1MB max.
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Personal Information */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      value={profileData.role}
                      onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={profileData.department}
                      onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => handleSave("profile")}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                  <Button variant="outline">Cancel</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Configure how you receive notifications and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Alerts</Label>
                      <p className="text-sm text-muted-foreground">Receive important updates via email</p>
                    </div>
                    <Switch
                      checked={notifications.emailAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emailAlerts: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS Alerts</Label>
                      <p className="text-sm text-muted-foreground">Receive urgent notifications via SMS</p>
                    </div>
                    <Switch
                      checked={notifications.smsAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, smsAlerts: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                    </div>
                    <Switch
                      checked={notifications.pushNotifications}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Weekly Reports</Label>
                      <p className="text-sm text-muted-foreground">Receive weekly summary reports</p>
                    </div>
                    <Switch
                      checked={notifications.weeklyReports}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Emergency Alerts</Label>
                      <p className="text-sm text-muted-foreground">Critical alerts requiring immediate attention</p>
                    </div>
                    <Switch
                      checked={notifications.emergencyAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emergencyAlerts: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Case Updates</Label>
                      <p className="text-sm text-muted-foreground">Updates on assigned cases</p>
                    </div>
                    <Switch
                      checked={notifications.caseUpdates}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, caseUpdates: checked })}
                    />
                  </div>
                </div>

                <Separator />

                <div className="flex gap-2">
                  <Button onClick={() => handleSave("notifications")}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                  <Button variant="outline">Reset to Default</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Settings */}
          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Application Preferences
                </CardTitle>
                <CardDescription>Customize your application experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Theme</Label>
                      <Select value={preferences.theme} onValueChange={(value) => setPreferences({ ...preferences, theme: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">
                            <div className="flex items-center gap-2">
                              <Sun className="h-4 w-4" />
                              Light
                            </div>
                          </SelectItem>
                          <SelectItem value="dark">
                            <div className="flex items-center gap-2">
                              <Moon className="h-4 w-4" />
                              Dark
                            </div>
                          </SelectItem>
                          <SelectItem value="system">
                            <div className="flex items-center gap-2">
                              <Monitor className="h-4 w-4" />
                              System
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select value={preferences.language} onValueChange={(value) => setPreferences({ ...preferences, language: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Timezone</Label>
                      <Select value={preferences.timezone} onValueChange={(value) => setPreferences({ ...preferences, timezone: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/Los_Angeles">Pacific Time (PST/PDT)</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time (MST/MDT)</SelectItem>
                          <SelectItem value="America/Chicago">Central Time (CST/CDT)</SelectItem>
                          <SelectItem value="America/New_York">Eastern Time (EST/EDT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Date Format</Label>
                      <Select value={preferences.dateFormat} onValueChange={(value) => setPreferences({ ...preferences, dateFormat: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Items per Page: {preferences.itemsPerPage}</Label>
                      <Slider
                        value={[preferences.itemsPerPage]}
                        onValueChange={(value) => setPreferences({ ...preferences, itemsPerPage: value[0] })}
                        max={100}
                        min={10}
                        step={5}
                        className="w-full"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto-save</Label>
                        <p className="text-sm text-muted-foreground">Automatically save changes</p>
                      </div>
                      <Switch
                        checked={preferences.autoSave}
                        onCheckedChange={(checked) => setPreferences({ ...preferences, autoSave: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Compact Mode</Label>
                        <p className="text-sm text-muted-foreground">Use compact layouts</p>
                      </div>
                      <Switch
                        checked={preferences.compactMode}
                        onCheckedChange={(checked) => setPreferences({ ...preferences, compactMode: checked })}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex gap-2">
                  <Button onClick={() => handleSave("preferences")}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                  <Button variant="outline">Reset to Default</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>Manage your account security and privacy settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {security.twoFactorAuth ? (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Enabled
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Disabled</Badge>
                      )}
                      <Switch
                        checked={security.twoFactorAuth}
                        onCheckedChange={(checked) => setSecurity({ ...security, twoFactorAuth: checked })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Session Timeout: {security.sessionTimeout} minutes</Label>
                    <Slider
                      value={[security.sessionTimeout]}
                      onValueChange={(value) => setSecurity({ ...security, sessionTimeout: value[0] })}
                      max={120}
                      min={5}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Password Expiry: {security.passwordExpiry} days</Label>
                    <Slider
                      value={[security.passwordExpiry]}
                      onValueChange={(value) => setSecurity({ ...security, passwordExpiry: value[0] })}
                      max={365}
                      min={30}
                      step={30}
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Login Notifications</Label>
                      <p className="text-sm text-muted-foreground">Get notified of new login attempts</p>
                    </div>
                    <Switch
                      checked={security.loginNotifications}
                      onCheckedChange={(checked) => setSecurity({ ...security, loginNotifications: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Device Management</Label>
                      <p className="text-sm text-muted-foreground">Allow device management and tracking</p>
                    </div>
                    <Switch
                      checked={security.deviceManagement}
                      onCheckedChange={(checked) => setSecurity({ ...security, deviceManagement: checked })}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Password Management</h3>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Key className="mr-2 h-4 w-4" />
                      Change Password
                    </Button>
                    <Button variant="outline">
                      <Eye className="mr-2 h-4 w-4" />
                      View Security Log
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="flex gap-2">
                  <Button onClick={() => handleSave("security")}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Security Settings
                  </Button>
                  <Button variant="outline">Reset to Default</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Settings */}
          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5" />
                  System Settings
                </CardTitle>
                <CardDescription>Configure system-wide settings and data management</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Data Retention: {system.dataRetention} days</Label>
                      <Slider
                        value={[system.dataRetention]}
                        onValueChange={(value) => setSystem({ ...system, dataRetention: value[0] })}
                        max={365}
                        min={7}
                        step={7}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Backup Frequency</Label>
                      <Select value={system.backupFrequency} onValueChange={(value) => setSystem({ ...system, backupFrequency: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Log Level</Label>
                      <Select value={system.logLevel} onValueChange={(value) => setSystem({ ...system, logLevel: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="debug">Debug</SelectItem>
                          <SelectItem value="info">Info</SelectItem>
                          <SelectItem value="warn">Warning</SelectItem>
                          <SelectItem value="error">Error</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Analytics</Label>
                        <p className="text-sm text-muted-foreground">Allow usage analytics collection</p>
                      </div>
                      <Switch
                        checked={system.analytics}
                        onCheckedChange={(checked) => setSystem({ ...system, analytics: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Error Reporting</Label>
                        <p className="text-sm text-muted-foreground">Automatically report errors for debugging</p>
                      </div>
                      <Switch
                        checked={system.errorReporting}
                        onCheckedChange={(checked) => setSystem({ ...system, errorReporting: checked })}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Data Management</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleExport}>
                      <Download className="mr-2 h-4 w-4" />
                      Export Settings
                    </Button>
                    <Button variant="outline" onClick={handleImport}>
                      <Upload className="mr-2 h-4 w-4" />
                      Import Settings
                    </Button>
                    <Button variant="destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Clear Cache
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="flex gap-2">
                  <Button onClick={() => handleSave("system")}>
                    <Save className="mr-2 h-4 w-4" />
                    Save System Settings
                  </Button>
                  <Button variant="outline">Reset to Default</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  )
}

