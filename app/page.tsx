"use client";

import PixelImageLoader from "@/components/image-pixel-loading";
import { useLenisScroll } from "@/hooks/use-lenis-scroll";
import Link from "next/link";

export default function Home() {
  useLenisScroll();

  const imgArr = [
    "https://c4.wallpaperflare.com/wallpaper/1023/896/855/500px-photography-landscape-wallpaper-preview.jpg",
    "https://c4.wallpaperflare.com/wallpaper/998/540/41/500px-nature-photography-wallpaper-preview.jpg",
    "https://c4.wallpaperflare.com/wallpaper/793/884/885/agnes-perrodon-nature-500px-landscape-wallpaper-preview.jpg",
    "https://i.pinimg.com/originals/d4/7e/9e/d47e9e4a28894bfbd416b4f53ca15b95.jpg"
  ]

  return (
    <main className="px-3 md:px-5 lg:px-10 py-3 lg:py-5">
      <header className="flex">
      </header>
      <section>
        <div className="mt-[100px]">
          <div className='lg:text-3xl font-[500]'>
            Load Images Like a Pro.
          </div>
          <div>pixel-loading image effect</div>
          <div
            className="h-[50vh] my-5 border-l border-white/30 ml-20"
          />
          <div className="ml-16">scoll</div>
          <div
            className="h-[20vh] my-5 border-l border-white/30 ml-20"
          />
        </div>
        <div className="grid lg:grid-cols-2">
          {imgArr.map((img: string, index: number) => (
            <div key={index} className={`h-[500px] w-[400px] ${index % 2 !== 0 && 'mt-[200px]'}`}>
              <PixelImageLoader
                imageSrc={img}
              />
            </div>
          ))}
        </div>
      </section>
      <footer className="pb-10 pt-40 text-center">
        <div className="text-2xl">Credits</div>
        <div className="flex flex-col mt-5">
          <Link className="hover:text-blue-500 hover:underline transition-all" href={"https://lenis.darkroom.engineering/"}>Lenis</Link>
          <Link className="hover:text-blue-500 hover:underline transition-all" href={"https://gsap.com/"}>Gsap</Link>
          <Link className="hover:text-blue-500 hover:underline transition-all" href={"https://imagesloaded.desandro.com/"}>Imagesloaded</Link>
        </div>
        <div className="text-2xl mt-20">Inspiration</div>
        <div className="flex flex-col mt-5">
          <Link className="hover:text-blue-500 hover:underline transition-all" href={"https://locomotive.ca/en"}>Locomotive</Link>
        </div>
      </footer>
    </main>
  );
}
