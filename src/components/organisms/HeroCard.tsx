// components/HeroCard.tsx

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/lib/variants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface HeroCardProps {
  title: string
  description: string
  image: string
  link: string
  linkText: string
  classname?: string
}

export const HeroCard: React.FC<HeroCardProps> = ({
  title,
  description,
  image,
  link,
  linkText,
  classname,
}) => {
  return (
    <div
      className={cn(
        'relative w-96 rounded overflow-hidden hover:bg-gray-900 bg-black shadow-lg group hover:shadow-lg transition-all duration-1000 p-6',
        classname,
      )}
    >
      <Image
        src={image}
        alt={title}
        width={500}
        height={500}
        className=" w-full object-cover rounded aspect-square grayscale filter group-hover:grayscale-0 transition-all duration-1000"
      />

      <div className="  h-full text-white  pt-8">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="mt-2 mb-4 font-light text-sm text-gray-300">
          {description}
        </p>
        <Link href={link} className={buttonVariants({ variant: 'default' })}>
          {linkText}
        </Link>
      </div>
    </div>
  )
}