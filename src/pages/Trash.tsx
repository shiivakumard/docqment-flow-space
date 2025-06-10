
import { useState } from 'react';
import { FileCard, FileItem } from '@/components/files/FileCard';
import { Button } from '@/components/ui/button';
import { Trash2, RotateCcw, X } from 'lucide-react';

const Trash = () => {
  const [viewMode] = useState<'grid' | 'list'>('list');
  const [trashedFiles] = useState<FileItem[]>([
    {
      id: '1',
      name: 'Old_Presentation.pptx',
      type: 'file',
      size: 4194304,
      modifiedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      extension: 'pptx'
    },
    {
      id: '2',
      name: 'Unused_Images',
      type: 'folder',
      size: 0,
      modifiedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      name: 'Draft_Document.docx',
      type: 'file',
      size: 1048576,
      modifiedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      extension: 'docx'
    }
  ]);

  const handleRestore = (file: FileItem) => {
    console.log('Restore file:', file);
  };

  const handlePermanentDelete = (file: FileItem) => {
    console.log('Permanently delete file:', file);
  };

  const handleEmptyTrash = () => {
    console.log('Empty trash');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Trash2 className="h-6 w-6 text-muted-foreground" />
          <div>
            <h1 className="text-2xl font-bold">Trash</h1>
            <p className="text-muted-foreground mt-1">
              Files will be permanently deleted after 30 days
            </p>
          </div>
        </div>

        {trashedFiles.length > 0 && (
          <Button 
            variant="destructive" 
            onClick={handleEmptyTrash}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Empty Trash
          </Button>
        )}
      </div>

      {/* File List */}
      {trashedFiles.length > 0 ? (
        <div className="space-y-1">
          {/* List Header */}
          <div className="flex items-center p-3 text-sm font-medium text-muted-foreground border-b">
            <div className="flex-1">Name</div>
            <div className="w-20 text-right">Size</div>
            <div className="w-24 text-right">Deleted</div>
            <div className="w-24 text-right">Actions</div>
          </div>
          
          {/* File List */}
          {trashedFiles.map(file => (
            <div 
              key={file.id}
              className="flex items-center p-3 hover:bg-accent rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Trash2 className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <span className="truncate font-medium text-muted-foreground">
                  {file.name}
                </span>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span className="w-20 text-right">
                  {file.type === 'file' ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : '--'}
                </span>
                <span className="w-24 text-right">
                  {file.modifiedAt.toLocaleDateString()}
                </span>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRestore(file)}
                    className="h-8 px-2"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Restore
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePermanentDelete(file)}
                    className="h-8 px-2 text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12">
          <Trash2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">Trash is empty</h3>
          <p className="text-muted-foreground">
            Deleted files will appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default Trash;
