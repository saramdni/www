'use client'

export default function ProjectCard({ name, desc, image, link }: { name: string; desc: string; image?: string; link?: string }) {
  return (
    <div className="card group">
      <div className="w-full h-36 bg-gray-200">
        {image ? <img src={image} alt={name} className="w-full h-full object-cover" /> : null}
      </div>
      <div className="p-4">
        <div className="text-sm text-gray-500">Name</div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{desc}</p>
        <div className="mt-3">
          <a href={link || '#'} className="text-sm underline">View Project ↗</a>
        </div>
      </div>
    </div>
  )
}
