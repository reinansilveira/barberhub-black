import Image from "next/image";

export function Photo({
  src,
  alt = "",
  className,
  sizes = "(max-width: 900px) 100vw, 40vw",
  priority = false,
}: {
  src: string;
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`photo ${className ?? ""}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />
    </div>
  );
}
