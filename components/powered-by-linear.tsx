import Image from "next/image"

export function PoweredByLinear() {
  return (
    <div className="flex items-center justify-center space-x-2 text-gray-400 dark:text-gray-500">
      <span className="text-xs">Powered by</span>
      <a href="https://linear.app" target="_blank" rel="noopener noreferrer">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/linear-SD6WHJdqVM0KeWEGYTF5p0N67uBZC6.svg"
          alt="Linear logo"
          width={12}
          height={12}
        />
      </a>
    </div>
  )
}

