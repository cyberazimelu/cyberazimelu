import { getImageProps, type ImageProps } from "next/image";

/**
 * Uses Next.js' supported image prop generator so srcSet, sizes, and the
 * optimizer URL stay intact while omitting its CSP-blocked inline style attr.
 */
export function OptimizedImage(props: ImageProps) {
  const generated = getImageProps(props).props;

  // The supported getImageProps example renders an img directly. Its generated
  // style is only Next.js' `color: transparent` fallback and is unnecessary here.
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...generated} alt={props.alt} style={undefined} />;
}
