
import { useState } from 'react';
import { FileCard, FileItem } from '@/components/files/FileCard';
import { Clock } from 'lucide-react';

const Recent = () => {
  const [viewMode] = useState<'grid' | 'list'>('list');
  const [recentFiles] = useState<FileItem[]>([
    {
      id: '1',
      name: 'Project Status Update.docx',
      type: 'file',
      size: 1024000,
      modifiedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      extension: 'docx'
    },
    {
      id: '2',
      name: 'Client Presentation.pdf',
      type: 'file',
      size: 5242880,
      modifiedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      extension: 'pdf',
      isStarred: true
    },
    {
      id: '3',
      name: 'Marketing Materials',
      type: 'folder',
      size: 0,
      modifiedAt: new Date(Date.now() - 4 * 60 * 60 * 1000) // 4 hours ago
    },
    {
      id: '4',
      name: 'Team_Photo_2024.jpg',
      type: 'file',
      size: 8388608,
      modifiedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      extension: 'jpg'
    },
    {
      id: '5',
      name: 'Budget_Q1_2024.xlsx',
      type: 'file',
      size: 2097152,
      modifiedAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      extension: 'xlsx',
      isStarred: true
    },
    {
      id: '6',
      name: 'Meeting_Recording.mp4',
      type: 'file',
      size: 104857600,
      modifiedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      extension: 'mp4'
    },
    {
      id: '7',
      name: 'Product Mockups',
      type: 'folder',
      size: 0,
      modifiedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
    },
    {
      id: '8',
      name: 'Annual_Report_Draft.pdf',
      type: 'file',
      size: 15728640,
      modifiedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      extension: 'pdf'
    }
  ]);

  const handleFileSelect = (file: FileItem) => {
    console.log('Selected file:', file);
  };

  const handleFileRename = (file: FileItem) => {
    console.log('Rename file:', file);
  };

  const handleFileDelete = (file: FileItem) => {
    console.log('Delete file:', file);
  };

  const handleFileStar = (file: FileItem) => {
    console.log('Star file:', file);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Clock className="h-6 w-6 text-muted-foreground" />
        <div>
          <h1 className="text-2xl font-bold">Recent Files</h1>
          <p className="text-muted-foreground mt-1">
            Files you've accessed recently
          </p>
        </div>
      </div>

      {/* File List */}
      <div className="space-y-1">
        {/* List Header */}
        <div className="flex items-center p-3 text-sm font-medium text-muted-foreground border-b">
          <div className="flex-1">Name</div>
          <div className="w-20 text-right">Size</div>
          <div className="w-24 text-right">Modified</div>
          <div className="w-12"></div>
        </div>
        
        {/* File List */}
        {recentFiles.map(file => (
          <FileCard
            key={file.id}
            file={file}
            viewMode={viewMode}
            onSelect={handleFileSelect}
            onRename={handleFileRename}
            onDelete={handleFileDelete}
            onStar={handleFileStar}
          />
        ))}
      </div>

      {/* Empty State */}
      {recentFiles.length === 0 && (
        <div className="text-center py-12">
          <Clock className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">No recent files</h3>
          <p className="text-muted-foreground">
            Files you access will appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default Recent;
