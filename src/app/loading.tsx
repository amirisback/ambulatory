export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center bg-background py-24">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
        <span className="text-sm font-medium text-muted-foreground">
          Memuat layanan RS Ambulatory Care...
        </span>
      </div>
    </div>
  );
}
