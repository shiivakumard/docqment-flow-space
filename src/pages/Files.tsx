
import { useState } from 'react';
import { FileCard, FileItem } from '@/components/files/FileCard';
import { Button } from '@/components/ui/button';
import { Plus, FolderPlus, Upload } from 'lucide-react';

const Files = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [files] = useState<FileItem[]>([
    {
      id: '1',
      name: 'Documents',
      type: 'folder',
      size: 0,
      modifiedAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      name: 'Images',
      type: 'folder',
      size: 0,
      modifiedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      name: 'Project Report.pdf',
      type: 'file',
      size: 3145728,
      modifiedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
      extension: 'pdf',
      isStarred: true
    },
    {
      id: '4',
      name: 'Presentation.pptx',
      type: 'file',
      size: 8388608,
      modifiedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      extension: 'pptx'
    },
    {
      id: '5',
      name: 'Budget.xlsx',
      type: 'file',
      size: 1048576,
      modifiedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      extension: 'xlsx'
    },
    {
      id: '6',
      name: 'Team_Meeting.mp4',
      type: 'file',
      size: 52428800,
      modifiedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      extension: 'mp4'
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Files</h1>
          <p className="text-muted-foreground mt-1">
            Manage and organize your files
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload Files
          </Button>
          <Button size="sm">
            <FolderPlus className="h-4 w-4 mr-2" />
            New Folder
          </Button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>My Files</span>
        <span>/</span>
        <span className="text-foreground">Root</span>
      </div>

      {/* File Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {files.map(file => (
            <FileCard
              key={file.id}
              file={file}
              viewMode="grid"
              onSelect={handleFileSelect}
              onRename={handleFileRename}
              onDelete={handleFileDelete}
              onStar={handleFileStar}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-1">
          {/* List Header */}
          <div className="flex items-center p-3 text-sm font-medium text-muted-foreground border-b">
            <div className="flex-1">Name</div>
            <div className="w-20 text-right">Size</div>
            <div className="w-24 text-right">Modified</div>
            <div className="w-12"></div>
          </div>
          
          {/* File List */}
          {files.map(file => (
            <FileCard
              key={file.id}
              file={file}
              viewMode="list"
              onSelect={handleFileSelect}
              onRename={handleFileRename}
              onDelete={handleFileDelete}
              onStar={handleFileStar}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {files.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <Plus className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No files yet</h3>
          <p className="text-muted-foreground mb-4">
            Upload your first file to get started
          </p>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload Files
          </Button>
        </div>
      )}
    </div>
  );
};

export default Files;
