
import { useCallback, useState } from 'react';
import { Upload, X, File, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface UploadFile {
  id: string;
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
}

interface FileUploadProps {
  onUploadComplete?: (files: File[]) => void;
}

export const FileUpload = ({ onUploadComplete }: FileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploads, setUploads] = useState<UploadFile[]>([]);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  }, []);

  const handleFiles = useCallback((files: File[]) => {
    const newUploads: UploadFile[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: 'pending'
    }));

    setUploads(prev => [...prev, ...newUploads]);

    // Simulate upload progress
    newUploads.forEach(upload => {
      setUploads(prev => prev.map(u => 
        u.id === upload.id ? { ...u, status: 'uploading' } : u
      ));

      const interval = setInterval(() => {
        setUploads(prev => prev.map(u => {
          if (u.id === upload.id) {
            const newProgress = Math.min(u.progress + Math.random() * 20, 100);
            const newStatus = newProgress >= 100 ? 'completed' : 'uploading';
            
            if (newStatus === 'completed') {
              clearInterval(interval);
              toast({
                title: "Upload completed",
                description: `${upload.file.name} has been uploaded successfully.`,
              });
            }
            
            return { ...u, progress: newProgress, status: newStatus };
          }
          return u;
        }));
      }, 200);
    });

    onUploadComplete?.(files);
  }, [onUploadComplete, toast]);

  const removeUpload = useCallback((id: string) => {
    setUploads(prev => prev.filter(u => u.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setUploads(prev => prev.filter(u => u.status !== 'completed'));
  }, []);

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver 
            ? 'border-primary bg-primary/5' 
            : 'border-muted-foreground/25 hover:border-muted-foreground/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">
          Drop files here or click to upload
        </h3>
        <p className="text-muted-foreground mb-4">
          Support for multiple files. Max file size: 100MB
        </p>
        
        <input
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button asChild>
            <span>Choose Files</span>
          </Button>
        </label>
      </div>

      {/* Upload List */}
      {uploads.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Uploads</h4>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearCompleted}
              disabled={!uploads.some(u => u.status === 'completed')}
            >
              Clear Completed
            </Button>
          </div>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {uploads.map(upload => (
              <div key={upload.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <File className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium truncate">
                      {upload.file.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {(upload.file.size / 1024 / 1024).toFixed(1)} MB
                    </span>
                  </div>
                  
                  {upload.status === 'uploading' && (
                    <Progress value={upload.progress} className="h-1" />
                  )}
                  
                  {upload.status === 'completed' && (
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="h-3 w-3" />
                      <span className="text-xs">Completed</span>
                    </div>
                  )}
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeUpload(upload.id)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
