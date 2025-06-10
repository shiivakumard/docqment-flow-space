
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  FolderOpen, 
  Clock, 
  Star, 
  Trash2, 
  Settings, 
  HardDrive,
  ChevronLeft,
  Plus,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const sidebarItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: FolderOpen, label: 'My Files', path: '/files' },
  { icon: Clock, label: 'Recent', path: '/recent' },
  { icon: Star, label: 'Starred', path: '/starred' },
  { icon: Trash2, label: 'Trash', path: '/trash' },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  const location = useLocation();

  return (
    <div className={`bg-card border-r border-border transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } flex flex-col h-screen`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-primary">DocQment</h1>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="p-1 h-8 w-8"
          >
            <ChevronLeft className={`h-4 w-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Upload Section */}
      <div className="p-4 border-b border-border">
        <Button className="w-full gap-2" size={isCollapsed ? "sm" : "default"}>
          <Upload className="h-4 w-4" />
          {!isCollapsed && "Upload Files"}
        </Button>
        {!isCollapsed && (
          <Button variant="outline" className="w-full gap-2 mt-2">
            <Plus className="h-4 w-4" />
            New Folder
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Storage Info */}
      {!isCollapsed && (
        <div className="p-4 border-t border-border">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <HardDrive className="h-4 w-4" />
              Storage
            </div>
            <Progress value={65} className="h-2" />
            <div className="text-xs text-muted-foreground">
              6.5 GB of 10 GB used
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Upgrade Storage
            </Button>
          </div>
        </div>
      )}

      {/* Settings */}
      <div className="p-4 border-t border-border">
        <Link
          to="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <Settings className="h-4 w-4 flex-shrink-0" />
          {!isCollapsed && <span>Settings</span>}
        </Link>
      </div>
    </div>
  );
};
