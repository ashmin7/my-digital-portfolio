import { isAdmin } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserRoleManagement } from "@/components/user-role-management";
import Link from "next/link";
import { Database, Users, Mail, MessageSquare } from "lucide-react";
import { getSubscribers } from "@/app/actions/newsletter";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function AdminPage() {
  // Assuming isAdmin is a valid function to protect the route
  if (!isAdmin) {
    return (
      <div className="container py-12">
        <p>Unauthorized</p>
      </div>
    );
  }

  // Fetch subscribers
  const subscribers = await getSubscribers();

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Subscribers</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Mail className="h-6 w-6 text-primary" />
              {subscribers.length}
            </CardTitle>
          </CardHeader>
        </Card>
        
        {/* Database Tools Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Database Tools</CardTitle>
            <CardDescription>Access database utilities</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild size="sm" className="w-full">
              <Link href="/db-test" className="flex items-center justify-center gap-2">
                <Database className="h-4 w-4" />
                DB Test
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Subscribers Table */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Newsletter Subscribers
          </CardTitle>
          <CardDescription>
            All users who subscribed to your newsletter ({subscribers.length} total)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {subscribers.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No subscribers yet</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Subscribed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscribers.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell className="font-medium">{sub.email}</TableCell>
                      <TableCell>{sub.name || <span className="text-muted-foreground">-</span>}</TableCell>
                      <TableCell className="max-w-xs">
                        {sub.notes ? (
                          <div className="flex items-start gap-1">
                            <MessageSquare className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground truncate">{sub.notes}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString() : "Unknown"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>View and manage user roles.</CardDescription>
        </CardHeader>
        <CardContent>
          <UserRoleManagement />
        </CardContent>
      </Card>

      {/* Example of another admin section */}
      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
          <CardDescription>Configure system-wide settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input id="siteName" defaultValue="Ashmin Aryal | Cybersecurity Research Portfolio" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminEmail">Admin Email</Label>
              <Input id="adminEmail" type="email" defaultValue="ashminaryal111@gmail.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
              <Select defaultValue="disabled">
                <SelectTrigger>
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="enabled">Enabled</SelectItem>
                  <SelectItem value="disabled">Disabled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">Save Settings</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
