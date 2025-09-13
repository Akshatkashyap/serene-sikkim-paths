import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Camera, Heart, Download, Share, ZoomIn } from "lucide-react";

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
  category: string;
  photographer?: string;
  likes: number;
  isLiked: boolean;
}

interface MonasteryGalleryProps {
  monasteryId: string;
  monasteryName: string;
}

const MonasteryGallery = ({ monasteryId, monasteryName }: MonasteryGalleryProps) => {
  // Mock gallery data - in real app, this would come from an API
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([
    {
      id: "1",
      url: "/monastery-1.jpg",
      title: "Main Prayer Hall",
      description: "The magnificent main prayer hall with intricate Buddhist artwork",
      category: "Interior",
      photographer: "Tenzin Norbu",
      likes: 24,
      isLiked: false,
    },
    {
      id: "2", 
      url: "/monastery-2.jpg",
      title: "Morning Meditation",
      description: "Monks in peaceful morning meditation session",
      category: "Life",
      photographer: "Karma Tshering",
      likes: 32,
      isLiked: true,
    },
    {
      id: "3",
      url: "/monastery-3.jpg",
      title: "Himalayan Vista",
      description: "Breathtaking view of the Himalayas from the monastery grounds",
      category: "Landscape",
      photographer: "Pema Lhamo",
      likes: 45,
      isLiked: false,
    },
    {
      id: "4",
      url: "/hero-monastery.jpg",
      title: "Golden Hour",
      description: "The monastery bathed in golden evening light",
      category: "Exterior",
      photographer: "Lobsang Tenzin",
      likes: 38,
      isLiked: false,
    },
    {
      id: "5",
      url: "/monastery-1.jpg",
      title: "Prayer Wheels",
      description: "Ancient prayer wheels spinning in the courtyard",
      category: "Details",
      photographer: "Norbu Dolma",
      likes: 19,
      isLiked: false,
    },
    {
      id: "6",
      url: "/monastery-2.jpg", 
      title: "Festival Celebration",
      description: "Colorful mask dance during annual monastery festival",
      category: "Culture",
      photographer: "Sangay Dorje",
      likes: 67,
      isLiked: true,
    },
    {
      id: "7",
      url: "/monastery-3.jpg",
      title: "Sacred Texts",
      description: "Ancient Buddhist scriptures preserved in the library",
      category: "Heritage",
      photographer: "Thukten Norbu",
      likes: 28,
      isLiked: false,
    },
    {
      id: "8",
      url: "/hero-monastery.jpg",
      title: "Mountain Mist",
      description: "Monastery emerging from morning mist like a dream",
      category: "Landscape",
      photographer: "Dolma Sherpa",
      likes: 52,
      isLiked: false,
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const categories = ["All", "Interior", "Exterior", "Landscape", "Life", "Culture", "Heritage", "Details"];
  
  const filteredImages = selectedCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const toggleLike = (imageId: string) => {
    setGalleryImages(prev => prev.map(img => 
      img.id === imageId 
        ? { ...img, isLiked: !img.isLiked, likes: img.isLiked ? img.likes - 1 : img.likes + 1 }
        : img
    ));
  };

  const handleDownload = (image: GalleryImage) => {
    // Mock download functionality
    console.log(`Downloading ${image.title}`);
  };

  const handleShare = (image: GalleryImage) => {
    // Mock share functionality
    if (navigator.share) {
      navigator.share({
        title: `${image.title} - ${monasteryName}`,
        text: image.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="space-y-6">
      {/* Gallery Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Camera className="h-6 w-6 text-monastery-red" />
          <h3 className="text-2xl font-bold">Sacred Gallery</h3>
          <Badge variant="secondary">{filteredImages.length} photos</Badge>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="text-xs"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Masonry Gallery Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {filteredImages.map((image, index) => (
          <Card 
            key={image.id} 
            className="break-inside-avoid overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300"
            style={{ marginBottom: '16px' }}
          >
            <div className="relative">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                      style={{ 
                        height: `${200 + (index % 3) * 100}px`,
                        objectFit: 'cover'
                      }}
                      onClick={() => setSelectedImage(image)}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ZoomIn className="h-5 w-5 text-white drop-shadow-lg" />
                    </div>
                  </div>
                </DialogTrigger>
                
                <DialogContent className="max-w-4xl max-h-[90vh] p-0">
                  {selectedImage && (
                    <div className="relative">
                      <img
                        src={selectedImage.url}
                        alt={selectedImage.title}
                        className="w-full h-auto max-h-[70vh] object-contain"
                      />
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold mb-2">{selectedImage.title}</h3>
                            <p className="text-muted-foreground mb-2">{selectedImage.description}</p>
                            {selectedImage.photographer && (
                              <p className="text-sm text-muted-foreground">
                                📸 Photo by {selectedImage.photographer}
                              </p>
                            )}
                          </div>
                          <Badge variant="outline">{selectedImage.category}</Badge>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleLike(selectedImage.id)}
                            className={selectedImage.isLiked ? "text-red-500" : ""}
                          >
                            <Heart className={`h-4 w-4 mr-1 ${selectedImage.isLiked ? "fill-current" : ""}`} />
                            {selectedImage.likes}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(selectedImage)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleShare(selectedImage)}
                          >
                            <Share className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>

              {/* Image Overlay Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium text-sm">{image.title}</h4>
                    <p className="text-white/80 text-xs">{image.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(image.id);
                      }}
                      className={`text-white hover:text-red-300 p-1 h-auto ${image.isLiked ? "text-red-400" : ""}`}
                    >
                      <Heart className={`h-4 w-4 ${image.isLiked ? "fill-current" : ""}`} />
                      <span className="ml-1 text-xs">{image.likes}</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center pt-4">
        <Button variant="outline">
          <Camera className="h-4 w-4 mr-2" />
          Load More Photos
        </Button>
      </div>
    </div>
  );
};

export default MonasteryGallery;