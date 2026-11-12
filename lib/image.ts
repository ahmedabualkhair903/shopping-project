export function canOptimizeImage(source: string): boolean {
  return (
    (source.startsWith("/") && !source.startsWith("//")) ||
    source.startsWith("https://fakestoreapi.com/")
  );
}
