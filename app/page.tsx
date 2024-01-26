import DialogueSidebar from "@/components/Manga/DialogueSidebar";
import MangaReader from "@/components/Manga/MangaReader";

export default function Home() {
  return (
    // Home page
    <main className="flex overflow-hidden flex-1 gap-x-2 relative">
      {/* Manga View */}
      <MangaReader />

      {/* Text Sidebar */}
      <DialogueSidebar />
    </main>
  );
}
