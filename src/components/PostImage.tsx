'use client'

import Image from 'next/image'

export default function PostImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-zinc-100">
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        loading="eager"
        className="object-cover"
        onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
      />
    </div>
  )
}
