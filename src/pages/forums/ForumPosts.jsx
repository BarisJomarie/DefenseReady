import { MessageCircle, Plus, X } from "lucide-react"; // Imported Plus and X icons
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ForumPosts = ({ searchQuery }) => {
  const [fetchPosts, setFetchPosts] = useState([]);
  
  // 1. Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}mock_post.json`)
      .then((res) => res.json())
      .then((data) => { setFetchPosts(data); })
      .catch((err) => console.error("Error loading JSON: ", err));
  }, []);

  // 2. Form Submission Handler
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!titleInput.trim() || !bodyInput.trim()) return; // Don't allow empty fields

    const newPost = {
      id: Date.now(), // Unique temporary numerical ID
      username: "CurrentUser",
      "post-head": titleInput.trim(),
      "post-body": bodyInput.trim(),
      comments: [] // Initialize with zero comments
    };

    // Prepend the new post so it appears at the very top of the list!
    setFetchPosts((prevPosts) => [newPost, ...prevPosts]);

    // Reset fields and close overlay
    setTitleInput("");
    setBodyInput("");
    setIsModalOpen(false);
  };

  const filteredPosts = fetchPosts.filter((post) => {
    const matchesHead = post["post-head"].toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBody = post["post-body"].toLowerCase().includes(searchQuery.toLowerCase());
    return matchesHead || matchesBody;
  });

  return (
    <section id="post-section" className="relative px-4 max-w-full mx-auto border-t border-border">
      
      {/* 3. Add Post Trigger Control Area */}
      <div className="flex flex-row justify-between items-center mb-6 mt-4">
        <div>
          {searchQuery && (
            <p className="text-sm text-muted-foreground font-medium animate-fade-in">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found matching "{searchQuery}"
            </p>
          )}
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Post
        </button>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-center">
        {filteredPosts.map((post) => (
          <div 
            className="p-6 cursor-pointer border-2 border-border rounded-lg hover:border-primary transition-all duration-300 h-full" 
            key={post.id}
            onClick={() => { navigate(`/forums/${post.id}`); }}
          >
            <div className="flex flex-col items-start gap-2">
              <div className="p-2 rounded-md bg-primary/10">
                <p className="text-primary font-bold">{post["post-head"]}</p>
              </div>
              
              <div className="text-left relative w-full h-50 border border-border p-4 rounded-md overflow-hidden">
                <p className="text-muted-foreground text-sm">{post["post-body"]}</p>
                <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-background to-transparent pointer-events-none" />
              </div>

              <div className="text-left relative w-full flex flex-row items-center gap-1.5 text-muted-foreground mt-4">
                <MessageCircle className="w-4 h-4"/>
                <p className="text-sm font-medium">{post.comments ? post.comments.length : 0}</p>
              </div>
            </div>
          </div>
        ))}

        {filteredPosts.length === 0 && (
          <p className="text-muted-foreground col-span-full text-center py-8">No posts found matching "{searchQuery}"</p>
        )}
      </div>

      {/* 4. FORM OVERLAY POPUP MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Black Translucent Backdrop Overlay */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
            onClick={() => setIsModalOpen(false)} 
          />

          {/* Form Modal Content Window Box */}
          <div className="relative bg-background border border-border w-full max-w-lg rounded-2xl shadow-xl p-6 z-10 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header / Close Button */}
            <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
              <h3 className="text-lg font-bold text-foreground">Create a New Forum Post</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-md text-muted-foreground hover:bg-foreground/5 hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Input Submission Form */}
            <form onSubmit={handleCreatePost} className="space-y-4 text-left">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Post Title</label>
                <input 
                  type="text"
                  placeholder="Enter a compelling header title..."
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  className="w-full bg-foreground/5 border border-border text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary text-foreground"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Content Body</label>
                <textarea 
                  rows="5"
                  placeholder="What's on your mind? Type your post message here..."
                  value={bodyInput}
                  onChange={(e) => setBodyInput(e.target.value)}
                  className="w-full bg-foreground/5 border border-border text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary text-foreground resize-none"
                  required
                />
              </div>

              {/* Form Action Controls */}
              <div className="flex justify-end gap-3 pt-2 border-t border-border">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium border border-border rounded-xl hover:bg-foreground/5 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors shadow-sm cursor-pointer"
                >
                  Publish Post
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </section>
  );
};