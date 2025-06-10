
import { useState } from 'react';
import { FileCard, FileItem } from '@/components/files/FileCard';
import { Star } from 'lucide-react';

const Starred = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [starredFiles] = useState<FileItem[]>([
    {
      id: '1',
      name: 'Important_Contract.pdf',
      type: 'file',
      size: 2048000,
      modifiedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      extension: 'pdf',
      isStarred: true
    },
    {
      id: '2',
      name: 'Company_Logo.png',
      type: 'file',
      size: 512000,
      modifiedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      extension: 'png',
      isStarred: true
    },
    {
      id: '3',
      name: 'Project_Roadmap.xlsx',
      type: 'file',
      size: 1024000,
      modifiedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      extension: 'xlsx',
      isStarred: true
    },
    {
      id: '4',
      name: 'Client_Presentation.pptx',
      type: 'file',
      size: 8388608,
      modifiedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      extension: 'pptx',
      isStarred: true
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
    console.log('Unstar file:', file);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
        <div>
          <h1 className="text-2xl font-bold">Starred Files</h1>
          <p className="text-muted-foreground mt-1">
            Your most important files
          </p>
        </div>
      </div>

      {/* File Grid/List */}
      {starredFiles.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {starredFiles.map(file => (
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
            {starredFiles.map(file => (
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
        )
      ) : (
        /* Empty State */
        <div className="text-center py-12">
          <Star className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">No starred files</h3>
          <p className="text-muted-foreground">
            Star files to mark them as important and find them here
          </p>
        </div>
      )}
    </div>
  );
};

export default Starred;
