'use client';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useImageUpload } from "@/hooks/use-image-upload"
import { useDirectUpload } from "@/hooks/use-cloudinary-upload"
import { ImagePlus, X, Upload, Trash2, Check } from "lucide-react"
import Image from "next/image"
import { useCallback, useState } from "react"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

interface DirectImageUploadProps {
  onImageUploaded?: (url: string, cloudinaryData?: any) => void;
  defaultImageUrl?: string;
  className?: string;
}

export function DirectImageUpload({
  onImageUploaded,
  defaultImageUrl,
  className,
}: DirectImageUploadProps) {
  const {
    previewUrl,
    fileName,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
    handleRemove: handleLocalRemove,
  } = useImageUpload()

  const {
    uploadToCloudinaryDirect,
    isUploading,
    progress,
    error,
    data,
  } = useDirectUpload({
    onSuccess: (data) => {
      console.log("Image uploaded successfully", data);
      onImageUploaded?.(data.secure_url, data);
    },
    onError: (error) => {
      console.error("Upload failed", error);
    },
  })

  const [isDragging, setIsDragging] = useState(false)
  const [cloudinaryUrl, setCloudinaryUrl] = useState<string | null>(defaultImageUrl || null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const file = e.dataTransfer.files?.[0]
      if (file && file.type.startsWith("image/")) {
        const fakeEvent = {
          target: {
            files: [file],
          },
        } as unknown as React.ChangeEvent<HTMLInputElement>
        handleFileChange(fakeEvent)
      }
    },
    [handleFileChange],
  )

  const handleCustomFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFileChange(e)
      // Clear previous cloudinary URL when a new file is selected
      setCloudinaryUrl(null)
    },
    [handleFileChange]
  )

  const handleUploadToCloudinary = useCallback(async () => {
    if (!fileInputRef.current?.files?.[0]) {
      console.error("No image selected");
      return;
    }
    
    try {
      const result = await uploadToCloudinaryDirect(fileInputRef.current.files[0]);
      if (result) {
        setCloudinaryUrl(result.secure_url);
      }
    } catch (err) {
      // Error is already handled by the hook
      console.error("Error during upload:", err);
    }
  }, [uploadToCloudinaryDirect])

  const handleRemove = useCallback(() => {
    handleLocalRemove();
    setCloudinaryUrl(null);
  }, [handleLocalRemove])

  return (
    <div className={cn("w-full max-w-md space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm", className)}>
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Image Upload (Direct)</h3>
        <p className="text-sm text-muted-foreground">
          Upload directement à Cloudinary
        </p>
      </div>

      <Input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleCustomFileChange}
      />

      {!previewUrl ? (
        <div
          onClick={handleThumbnailClick}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "flex h-64 cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:bg-muted",
            isDragging && "border-primary/50 bg-primary/5",
          )}
        >
          <div className="rounded-full bg-background p-3 shadow-sm">
            <ImagePlus className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">Click to select</p>
            <p className="text-xs text-muted-foreground">
              or drag and drop file here
            </p>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="group relative h-64 overflow-hidden rounded-lg border">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                size="sm"
                variant="secondary"
                onClick={handleThumbnailClick}
                className="h-9 w-9 p-0"
                disabled={isUploading}
              >
                <Upload className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={handleRemove}
                className="h-9 w-9 p-0"
                disabled={isUploading}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mt-2 space-y-2">
            {fileName && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="truncate">{fileName}</span>
                <button
                  onClick={handleRemove}
                  className="ml-auto rounded-full p-1 hover:bg-muted"
                  disabled={isUploading}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            
            {isUploading ? (
              <div className="space-y-2">
                <Progress value={progress} className="h-2 w-full" />
                <p className="text-xs text-muted-foreground">Uploading: {progress}%</p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  onClick={handleUploadToCloudinary}
                  className="w-full"
                  disabled={cloudinaryUrl !== null}
                >
                  {cloudinaryUrl ? (
                    <>
                      <Check className="mr-2 h-4 w-4" /> Uploaded to Cloudinary
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" /> Upload Direct to Cloudinary
                    </>
                  )}
                </Button>
              </div>
            )}
            
            {error && (
              <p className="text-sm text-destructive">{error.message}</p>
            )}
            
            {cloudinaryUrl && (
              <div className="mt-2 text-sm">
                <p className="font-medium">Cloudinary URL:</p>
                <p className="mt-1 break-all rounded bg-muted p-2 text-xs">{cloudinaryUrl}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}