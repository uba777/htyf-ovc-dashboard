"use client"

import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  AlertTriangle,
  MessageSquare,
  Mail,
  Phone,
  Settings,
  CheckCircle,
  XCircle,
  Clock,
  RotateCcw,
  Save,
  Plus,
  Trash2,
} from "lucide-react"
import { useState } from "react"

const alertsLogData = [
  {
    id: "AL001",
    message: "High-risk assessment completed for Sarah Michelle (CH001)",
    channel: "SMS",
    recipient: "+1 (555) 123-4567",
    status: "delivered",
    timestamp: "2024-01-15 14:30:22",
    retryCount: 0,
  },
  {
    id: "AL002",
    message: "Urgent case note added for Michael Johnson (CH002) - Immediate attention required",
    channel: "SMS",
    recipient: "+1 (555) 123-4567",
    status: "failed",
    timestamp: "2024-01-15 13:45:18",
    retryCount: 2,
  },
  {
    id: "AL003",
    message: "School attendance dropped below 70% for Emma Rodriguez (CH003)",
    channel: "Email",
    recipient: "manager@htyf.org",
    status: "delivered",
    timestamp: "2024-01-15 12:15:33",
    retryCount: 0,
  },
  {
    id: "AL004",
    message: "High-risk assessment completed for David Kim (CH004)",
    channel: "SMS",
    recipient: "+1 (555) 123-4567",
    status: "pending",
    timestamp: "2024-01-15 11:22:45",
    retryCount: 0,
  },
  {
    id: "AL005",
    message: "Weekly case summary for Johnson Family Foundation",
    channel: "Email",
    recipient: "sponsors@htyf.org",
    status: "delivered",
    timestamp: "2024-01-15 09:00:00",
    retryCount: 0,
  },
]

const getStatusBadge = (status: string) => {
  const variants = {
    delivered: "bg-green-100 text-green-800 border-green-200",
    failed: "bg-red-100 text-red-800 border-red-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  }
  return variants[status as keyof typeof variants] || variants.pending
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "delivered":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "failed":
      return <XCircle className="h-4 w-4 text-red-600" />
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-600" />
    default:
      return <Clock className="h-4 w-4 text-yellow-600" />
  }
}

const getChannelIcon = (channel: string) => {
  switch (channel) {
    case "SMS":
      return <MessageSquare className="h-4 w-4 text-blue-600" />
    case "Email":
      return <Mail className="h-4 w-4 text-purple-600" />
    default:
      return <MessageSquare className="h-4 w-4 text-gray-600" />
  }
}

export default function AlertsPage() {
  const [triggerRules, setTriggerRules] = useState({
    highRiskAutoSMS: true,
    urgentCaseNoteAutoSMS: true,
    schoolingDropAlertEmail: false,
  })

  const [recipients, setRecipients] = useState({
    dutyPhone: "+1 (555) 123-4567",
    managerEmails: ["manager@htyf.org", "supervisor@htyf.org"],
  })

  const [newEmail, setNewEmail] = useState("")

  const handleTriggerRuleChange = (rule: string, enabled: boolean) => {
    setTriggerRules((prev) => ({ ...prev, [rule]: enabled }))
  }

  const addManagerEmail = () => {
    if (newEmail && !recipients.managerEmails.includes(newEmail)) {
      setRecipients((prev) => ({
        ...prev,
        managerEmails: [...prev.managerEmails, newEmail],
      }))
      setNewEmail("")
    }
  }

  const removeManagerEmail = (email: string) => {
    setRecipients((prev) => ({
      ...prev,
      managerEmails: prev.managerEmails.filter((e) => e !== email),
    }))
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Alerts</h1>
            <p className="text-muted-foreground">Configure alert triggers and manage notification settings</p>
          </div>
          <Button className="bg-primary text-primary-foreground">
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Trigger Rules */}
          <Card className="rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Trigger Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* High-Risk Auto SMS */}
              <div className="flex items-center justify-between space-x-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                    <Label className="text-sm font-medium">High-Risk Auto SMS</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Automatically send SMS when a child is assessed as high-risk
                  </p>
                </div>
                <Switch
                  checked={triggerRules.highRiskAutoSMS}
                  onCheckedChange={(checked) => handleTriggerRuleChange("highRiskAutoSMS", checked)}
                />
              </div>

              <Separator />

              {/* Urgent Case Note Auto SMS */}
              <div className="flex items-center justify-between space-x-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                    <Label className="text-sm font-medium">Urgent Case Note Auto SMS</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Automatically send SMS when urgent case notes are added
                  </p>
                </div>
                <Switch
                  checked={triggerRules.urgentCaseNoteAutoSMS}
                  onCheckedChange={(checked) => handleTriggerRuleChange("urgentCaseNoteAutoSMS", checked)}
                />
              </div>

              <Separator />

              {/* Schooling Drop Alert Email */}
              <div className="flex items-center justify-between space-x-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-purple-600" />
                    <Label className="text-sm font-medium">Schooling Drop Alert Email</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Send email alerts when school attendance drops below threshold
                  </p>
                </div>
                <Switch
                  checked={triggerRules.schoolingDropAlertEmail}
                  onCheckedChange={(checked) => handleTriggerRuleChange("schoolingDropAlertEmail", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Recipients */}
          <Card className="rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                Recipients
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Duty Phone */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Duty Phone</Label>
                <Input
                  value={recipients.dutyPhone}
                  onChange={(e) => setRecipients((prev) => ({ ...prev, dutyPhone: e.target.value }))}
                  placeholder="+1 (555) 123-4567"
                />
                <p className="text-xs text-muted-foreground">Primary phone number for SMS alerts</p>
              </div>

              <Separator />

              {/* Manager Emails */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Manager Emails</Label>

                {/* Email List */}
                <div className="space-y-2">
                  {recipients.managerEmails.map((email, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                      <span className="text-sm">{email}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeManagerEmail(email)}
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Add New Email */}
                <div className="flex space-x-2">
                  <Input
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="manager@htyf.org"
                    className="flex-1"
                  />
                  <Button size="sm" onClick={addManagerEmail} disabled={!newEmail}>
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground">Email addresses for alert notifications</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts Log */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Alerts Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alertsLogData.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start space-x-3 flex-1">
                    {/* Channel Icon */}
                    <div className="mt-1">{getChannelIcon(alert.channel)}</div>

                    {/* Alert Details */}
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-foreground">{alert.message}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <Badge variant="outline" className="mr-1 text-xs">
                            {alert.channel}
                          </Badge>
                          {alert.recipient}
                        </span>
                        <span>{alert.timestamp}</span>
                        {alert.retryCount > 0 && (
                          <span className="flex items-center text-orange-600">
                            <RotateCcw className="mr-1 h-3 w-3" />
                            {alert.retryCount} retries
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(alert.status)}
                    <Badge className={`text-xs ${getStatusBadge(alert.status)}`}>
                      {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
