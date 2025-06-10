
import { useState } from 'react';
import { 
  FileText, 
  Image, 
  Video, 
  Music, 
  Archive, 
  File,
  MoreVertical,
  Download,
  Share2,
  Edit3,
  Trash2,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDistanceToNow } from 'date-fns';

export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size: number;
  modifiedAt: Date;
  extension?: string;
  isStarred?: boolean;
}

interface FileCardProps {
  file: FileItem;
  viewMode: 'grid' | 'list';
  onSelect?: (file: FileItem) => void;
  onRename?: (file: FileItem) => void;
  onDelete?: (file: FileItem) => void;
  onStar?: (file: FileItem) => void;
}

const getFileIcon = (extension?: string) => {
  if (!extension) return File;
  
  const ext = extension.toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return Image;
  if (['mp4', 'avi', 'mov', 'wmv'].includes(ext)) return Video;
  if (['mp3', 'wav', 'flac', 'aac'].includes(ext)) return Music;
  if (['zip', 'rar', '7z', 'tar'].includes(ext)) return Archive;
  if (['txt', 'doc', 'docx', 'pdf'].includes(ext)) return FileText;
  return File;
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const FileCard = ({ 
  file, 
  viewMode, 
  onSelect, 
  onRename, 
  onDelete, 
  onStar 
}: FileCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = file.type === 'folder' ? File : getFileIcon(file.extension);

  if (viewMode === 'list') {
    return (
      <div 
        className="flex items-center p-3 hover:bg-accent rounded-lg transition-colors cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onSelect?.(file)}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <IconComponent className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          <span className="truncate font-medium">{file.name}</span>
        </div>
        
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <span className="w-20 text-right">
            {file.type === 'file' ? formatFileSize(file.size) : '--'}
          </span>
          <span className="w-24 text-right">
            {formatDistanceToNow(file.modifiedAt, { addSuffix: true })}
          </span>
          
          <div className="flex items-center gap-1">
            {file.isStarred && (
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`h-8 w-8 p-0 ${isHovered ? 'visible' : 'invisible group-hover:visible'}`}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onStar?.(file)}>
                  <Star className="h-4 w-4 mr-2" />
                  {file.isStarred ? 'Unstar' : 'Star'}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onRename?.(file)}>
                  <Edit3 className="h-4 w-4 mr-2" />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete?.(file)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="group relative bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect?.(file)}
    >
      {/* Star */}
      {file.isStarred && (
        <Star className="absolute top-2 right-2 h-4 w-4 fill-yellow-400 text-yellow-400" />
      )}
      
      {/* File Icon */}
      <div className="flex justify-center mb-3">
        <div className="p-3 bg-muted rounded-lg">
          <IconComponent className="h-8 w-8 text-muted-foreground" />
        </div>
      </div>
      
      {/* File Info */}
      <div className="space-y-2">
        <h3 className="font-medium text-sm truncate" title={file.name}>
          {file.name}
        </h3>
        <div className="text-xs text-muted-foreground space-y-1">
          <div>{file.type === 'file' ? formatFileSize(file.size) : 'Folder'}</div>
          <div>{formatDistanceToNow(file.modifiedAt, { addSuffix: true })}</div>
        </div>
      </div>
      
      {/* Actions */}
      <div className={`absolute top-2 left-2 ${isHovered ? 'visible' : 'invisible'}`}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => onStar?.(file)}>
              <Star className="h-4 w-4 mr-2" />
              {file.isStarred ? 'Unstar' : 'Star'}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="h-4 w-4 mr-2" />
              Download
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onRename?.(file)}>
              <Edit3 className="h-4 w-4 mr-2" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDelete?.(file)}
              className="text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
