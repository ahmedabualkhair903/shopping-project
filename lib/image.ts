export function canOptimizeImage(source: string): boolean {
  const isLocalPath =
    source.startsWith("/") && !source.startsWith("//");
  const isJfif = /\.jfif(?:$|[?#])/i.test(source);

  return (
    (isLocalPath && !isJfif) ||
    source.startsWith("https://fakestoreapi.com/")
  );
}
