import { useEffect, useState } from "react"
import { ForumNavBar } from "./ForumNavBar"
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MessageCircle, Send } from "lucide-react";

export const ForumPostView = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // State to track the local comment input field text
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}mock_post.json`)
      .then((res) => res.json())
      .then((data) => {
        const singlePost = data.find((p) => p.id === parseInt(id));
        setPost(singlePost);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading JSON: ", err);
        setLoading(false);
      });
  }, [id]);

  // Function to push a comment directly into your active post state
  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return; // Prevent posting empty spaces

    const newComment = {
      id: Date.now(), // Generate a temporary unique ID
      username: "AnonymousUser", 
      "comment-body": commentText.trim()
    };

    // "Push" logic using state cloning: Spreads the old post properties 
    // and copies over all old comments while safely appending our brand new one
    setPost((prevPost) => ({
      ...prevPost,
      comments: prevPost.comments ? [...prevPost.comments, newComment] : [newComment]
    }));

    setCommentText("");
  };

  if (loading) return <div className="text-center py-20 text-muted-foreground">Loading post...</div>;
  if (!post) return <div className="text-center py-20 text-muted-foreground">Post not found!</div>;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ForumNavBar />
      <main className="max-full w-3/4 mx-auto px-4 py-24">
        {/* Back Button */}
        <Link to="/forums" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-all w-fit border border-border rounded-md py-2 px-4 hover:border-primary ">
          <ArrowLeft className="w-4 h-4" /> Back to Forums
        </Link>
        
        {/*Post*/}
        <article className="border border-border p-8 rounded-xl bg-foreground/2 space-y-4">
          <div className="px-3 py-1 rounded-md bg-primary/10 w-fit">
            <p className="text-primary font-bold text-xs">@{post.username}</p>
          </div>
          
          <h1 className="text-2xl font-bold text-foreground">{post["post-head"]}</h1>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{post["post-body"]}</p>
        </article>

        {/* Comments Section Layout */}
        <section className="mt-8 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 border-b border-border pb-2">
            <MessageCircle className="w-5 h-5 text-muted-foreground" />
            Comments ({post.comments ? post.comments.length : 0})
          </h2>

          {/*Interactive Form Layout */}
          <form onSubmit={handleSubmitComment} className="flex gap-2 w-full items-center my-4">
            <input 
              type="text"
              placeholder="Join the discussion... write a comment!"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full bg-foreground/5 border border-border text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground/60"
            />
            <button 
              type="submit" 
              className="p-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Comments Rendering List */}
          <div className="space-y-3">
            {post.comments && post.comments.map((comment) => (
              <div key={comment.id} className="p-4 border border-border/60 rounded-lg bg-background text-left">
                <p className="text-xs font-bold text-primary mb-1">@{comment.username}</p>
                <p className="text-sm text-foreground">{comment["comment-body"]}</p>
              </div>
            ))}
            
            {(!post.comments || post.comments.length === 0) && (
              <p className="text-muted-foreground text-sm italic py-4">No comments yet. Be the first to start the discussion!</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};