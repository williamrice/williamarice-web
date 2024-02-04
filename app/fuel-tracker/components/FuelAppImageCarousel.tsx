import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const FuelAppImageCarousel = () => {
  return (
    <Carousel className="w-full max-w-sm md:max-w-lg">
      <CarouselContent>
        {Array.from({ length: 3 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex-col aspect-square items-center justify-center p-6">
                  <p className="mb-4">Image {index + 1} / 3</p>
                  <Image
                    width={800}
                    height={800}
                    // only doing plus 10 because github caching was storing old photos
                    src={`https://raw.githubusercontent.com/williamrice/williamrice.github.io/main/FuelTrackerAppShowCase/${
                      index + 10
                    }.png`}
                    alt="Fuel Tracker App"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default FuelAppImageCarousel;
