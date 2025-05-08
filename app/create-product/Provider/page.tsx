'use client';

import { DirectImageUpload } from "@/components/enhanced-image-upload";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ImageUploadPage() {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [cloudinaryData, setCloudinaryData] = useState<any | null>(null);

  const handleImageUploaded = (url: string, data: any) => {
    setUploadedImageUrl(url);
    setCloudinaryData(data);
    console.log("Image uploaded to:", url);
    console.log("Cloudinary data:", data);
  };

  return (
    <div className="container max-w-4xl py-10">
      <h1 className="mb-8 text-3xl font-bold">Image Upload Demo</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <DirectImageUpload onImageUploaded={handleImageUploaded} />
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Image Data</CardTitle>
              <CardDescription>Information about your uploaded image</CardDescription>
            </CardHeader>
            <CardContent>
              {uploadedImageUrl ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="image-url">Image URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="image-url"
                        value={uploadedImageUrl}
                        readOnly
                        onClick={(e) => (e.target as HTMLInputElement).select()}
                      />
                      <Button
                        variant="outline"
                        onClick={() => {
                          navigator.clipboard.writeText(uploadedImageUrl);
                          alert("URL copied to clipboard!");
                        }}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                  
                  {cloudinaryData && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="public-id">Public ID</Label>
                        <Input
                          id="public-id"
                          value={cloudinaryData.public_id}
                          readOnly
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="dimensions">Dimensions</Label>
                        <Input
                          id="dimensions"
                          value={`${cloudinaryData.width} × ${cloudinaryData.height}`}
                          readOnly
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="format">Format</Label>
                        <Input
                          id="format"
                          value={cloudinaryData.format}
                          readOnly
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="json-data">Raw JSON Data</Label>
                        <textarea
                          id="json-data"
                          value={JSON.stringify(cloudinaryData, null, 2)}
                          readOnly
                          rows={8}
                          className="font-mono text-xs"
                        />
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex h-40 items-center justify-center rounded-lg border border-dashed text-center text-muted-foreground">
                  <p>Upload an image to see its data</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}