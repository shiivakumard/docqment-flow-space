
import { useState } from 'react';
import { Upload, FileText, Image, Video, Music, Archive } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { FileUpload } from '@/components/files/FileUpload';

const Dashboard = () => {
  const [storageUsed] = useState(45); // GB
  const storageTotal = 100; // GB
  const storagePercentage = (storageUsed / storageTotal) * 100;

  const stats = [
    { name: 'Total Files', value: '1,234', icon: FileText, change: '+12%', changeType: 'positive' },
    { name: 'Storage Used', value: `${storageUsed}GB`, icon: Archive, change: '+5%', changeType: 'positive' },
    { name: 'Shared Files', value: '89', icon: Upload, change: '-2%', changeType: 'negative' },
    { name: 'Recent Activity', value: '23', icon: FileText, change: '+8%', changeType: 'positive' },
  ];

  const fileTypes = [
    { name: 'Documents', count: 456, icon: FileText, color: 'bg-blue-500' },
    { name: 'Images', count: 324, icon: Image, color: 'bg-green-500' },
    { name: 'Videos', count: 78, icon: Video, color: 'bg-purple-500' },
    { name: 'Audio', count: 123, icon: Music, color: 'bg-orange-500' },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Welcome back!</h1>
        <p className="text-muted-foreground">
          Here's what's happening with your files today.
        </p>
      </div>

      {/* Quick Upload */}
      <FileUpload />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.name}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.changeType === 'positive' 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Storage Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Storage Usage</CardTitle>
          <CardDescription>
            {storageUsed}GB of {storageTotal}GB used
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={storagePercentage} className="w-full" />
          <div className="mt-2 text-sm text-muted-foreground">
            {storageTotal - storageUsed}GB remaining
          </div>
        </CardContent>
      </Card>

      {/* File Type Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>File Types</CardTitle>
          <CardDescription>Breakdown of your files by type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {fileTypes.map((type) => (
              <div key={type.name} className="flex items-center space-x-3">
                <div className={`p-2 rounded-md ${type.color}`}>
                  <type.icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium">{type.name}</p>
                  <p className="text-sm text-muted-foreground">{type.count} files</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
