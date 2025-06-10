
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { FileCard, FileItem } from '@/components/files/FileCard';
import { FileUpload } from '@/components/files/FileUpload';
import { 
  HardDrive, 
  Files, 
  Users, 
  TrendingUp,
  Clock,
  Star
} from 'lucide-react';

const Dashboard = () => {
  const [recentFiles] = useState<FileItem[]>([
    {
      id: '1',
      name: 'Project Proposal.pdf',
      type: 'file',
      size: 2048000,
      modifiedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      extension: 'pdf',
      isStarred: true
    },
    {
      id: '2',
      name: 'Marketing Assets',
      type: 'folder',
      size: 0,
      modifiedAt: new Date(Date.now() - 5 * 60 * 60 * 1000)
    },
    {
      id: '3',
      name: 'Team Photo.jpg',
      type: 'file',
      size: 5242880,
      modifiedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      extension: 'jpg'
    },
    {
      id: '4',
      name: 'Budget Spreadsheet.xlsx',
      type: 'file',
      size: 1024000,
      modifiedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      extension: 'xlsx',
      isStarred: true
    }
  ]);

  const storageStats = {
    used: 6.5,
    total: 10,
    percentage: 65
  };

  const stats = [
    {
      title: 'Total Files',
      value: '1,234',
      icon: Files,
      change: '+12%',
      changeType: 'positive' as const
    },
    {
      title: 'Storage Used',
      value: `${storageStats.used} GB`,
      icon: HardDrive,
      change: '+2.3 GB',
      changeType: 'neutral' as const
    },
    {
      title: 'Shared Files',
      value: '156',
      icon: Users,
      change: '+8',
      changeType: 'positive' as const
    },
    {
      title: 'Activity',
      value: '89%',
      icon: TrendingUp,
      change: '+5%',
      changeType: 'positive' as const
    }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, John!
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your files today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.changeType === 'positive' 
                  ? 'text-green-600' 
                  : stat.changeType === 'negative' 
                  ? 'text-red-600' 
                  : 'text-muted-foreground'
              }`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* File Upload */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Upload</CardTitle>
              <CardDescription>
                Drag and drop files here or click to browse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload />
            </CardContent>
          </Card>
        </div>

        {/* Storage Overview */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Storage Overview</CardTitle>
              <CardDescription>
                {storageStats.used} GB of {storageStats.total} GB used
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={storageStats.percentage} className="h-3" />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Documents</span>
                  <span>2.1 GB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Images</span>
                  <span>3.2 GB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Videos</span>
                  <span>1.2 GB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Other</span>
                  <span>0.8 GB</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Files */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Recent Files</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentFiles.map(file => (
            <FileCard
              key={file.id}
              file={file}
              viewMode="grid"
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Starred Files
            </CardTitle>
            <CardDescription>
              Your most important files
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentFiles.filter(f => f.isStarred).map(file => (
                <div key={file.id} className="flex items-center gap-3 p-2 hover:bg-accent rounded-lg transition-colors">
                  <Files className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm truncate">{file.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full text-left p-3 hover:bg-accent rounded-lg transition-colors">
              <div className="font-medium">Create New Folder</div>
              <div className="text-sm text-muted-foreground">Organize your files</div>
            </button>
            <button className="w-full text-left p-3 hover:bg-accent rounded-lg transition-colors">
              <div className="font-medium">Share Files</div>
              <div className="text-sm text-muted-foreground">Collaborate with others</div>
            </button>
            <button className="w-full text-left p-3 hover:bg-accent rounded-lg transition-colors">
              <div className="font-medium">Sync Settings</div>
              <div className="text-sm text-muted-foreground">Manage synchronization</div>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
