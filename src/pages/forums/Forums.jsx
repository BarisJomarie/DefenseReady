import { ForumNavBar } from "./ForumNavBar"
import { ForumSearchBar } from "./ForumSearchBar"
import { ForumPosts } from "./ForumPosts"
export const Forums = ({searchQuery, setSearchQuery}) => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ForumNavBar />
      <ForumSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ForumPosts searchQuery={searchQuery} />
    </div>
  )
}