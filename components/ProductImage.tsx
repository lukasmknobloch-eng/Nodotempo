import Image from "next/image";

type Props = {
  src?: string;
  alt: string;
  sizes?: string;
  preload?: boolean;
  className?: string;
  /** Text, der ohne Foto in der Fläche steht */
  placeholder?: string;
};

/** Produktfoto – oder eine ruhige Fläche, solange noch kein Foto existiert. */
export function ProductImage({ src, alt, sizes = "(max-width: 768px) 50vw, 25vw", preload, className, placeholder }: Props) {
  return (
    <div className={`product-image ${className ?? ""}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} preload={preload} quality={90} />
      ) : (
        <span className="product-image-empty">{placeholder ?? "Foto folgt"}</span>
      )}
    </div>
  );
}
