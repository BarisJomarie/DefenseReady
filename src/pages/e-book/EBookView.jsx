import { useState, useEffect, useRef } from "react"
import { ReactReader, ReactReaderStyle } from "react-reader"
import { ThemeToggle } from "@/components/ThemeToggle"

// Custom styles object to clean up layout structures
const customReaderStyles = {
  ...ReactReaderStyle,
  arrow: {
    ...ReactReaderStyle.arrow,
    display: 'none',
  },
  arrowHover: {
    ...ReactReaderStyle.arrowHover,
    display: 'none',
  },
  reader: {
    ...ReactReaderStyle.reader,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  // Hides the native floating TOC drawer controls
  tocButton: {
    ...ReactReaderStyle.tocButton,
    display: 'none',
  },
  tocButtonWrapper: {
    ...ReactReaderStyle.tocButtonWrapper,
    display: 'none',
  }
};

export const EBookView = () => {
  const [location, setLocation] = useState(null);
  const renditionRef = useRef(null);
  const epubUrl = `${import.meta.env.BASE_URL}defenseready_book.epub`;
  const [checkedItems, setCheckedItems] = useState({});
  
  // State management to store chapters and track dropdown open status
  const [toc, setToc] = useState([]);
  const [isTocOpen, setIsTocOpen] = useState(false);

  useEffect(() => {
    const saveChecks = localStorage.getItem('book-progress');
    if (saveChecks) setCheckedItems(JSON.parse(saveChecks));

    const saveLocation = localStorage.getItem('book-page');
    if (saveLocation) setLocation(saveLocation);
  }, []);

  // Close dropdown if user clicks anywhere else on the screen
  useEffect(() => {
    const handleOutsideClick = () => setIsTocOpen(false);
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  const syncEpubCheckboxes = (contents) => {
    const epubDocument = contents.document;
    const checkboxes = epubDocument.querySelectorAll('input[type="checkbox"]');
    const currentProgress = JSON.parse(localStorage.getItem('book-progress') || '{}');

    checkboxes.forEach((checkbox) => {
      const id = checkbox.getAttribute('id');
      if (!id) return;

      checkbox.checked = !!currentProgress[id];
      checkbox.addEventListener('change', (e) => {
        const isChecked = e.target.checked;
        const updatedProgress = {
          ...JSON.parse(localStorage.getItem('book-progress') || '{}'),
          [id]: isChecked
        };
        localStorage.setItem('book-progress', JSON.stringify(updatedProgress));
        setCheckedItems(updatedProgress);
      })
    })
  }

  const handleExternalLinks = (contents) => {
  const epubDocument = contents.document;
  const externalLinks = epubDocument.querySelectorAll('a[href^="http"]');

  externalLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Stop the iframe from trying to open it
      const url = link.getAttribute('href');
      
      // Open the YouTube link safely
      if (url) {
        window.top.open(url, '_blank', 'noopener,noreferrer');
      }
    });
  });
};

  const applyTailwindTheme = () => {
    if (!renditionRef.current) return;
    const bodyStyles = getComputedStyle(document.body);
    
    renditionRef.current.themes.default({
      'body': {
        'background-color': `hsl(${bodyStyles.getPropertyValue('--background').trim()}) !important`,
        'color': `hsl(${bodyStyles.getPropertyValue('--foreground').trim()}) !important`,
        'padding': '0 !important',
        'margin': '0 !important',
      },
      ':root': {
        '--theme-bg': `hsl(${bodyStyles.getPropertyValue('--background').trim()}) !important`,
        '--theme-fg': `hsl(${bodyStyles.getPropertyValue('--foreground').trim()}) !important`,
        '--theme-primary': `hsl(${bodyStyles.getPropertyValue('--primary').trim()}) !important`,
        '--theme-border': `hsl(${bodyStyles.getPropertyValue('--border').trim()}) !important`,
      }
    });
  };

  useEffect(() => {
    const observer = new MutationObserver(() => {
      applyTailwindTheme();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="h-screen w-full bg-background text-foreground flex flex-col overflow-hidden">
      
      {/* Dedicated Fluid Reader Header */}
      <header className="w-full border-b border-border bg-background/80 backdrop-blur-md px-6 py-4 flex items-center justify-between z-30">
        <div className="flex items-center space-x-4">
          <a href={import.meta.env.BASE_URL} className="text-xl font-bold text-primary hidden sm:flex items-center hover:opacity-90 transition-opacity">
            <span>
              <span className="text-glow text-foreground">Defense</span>Ready
            </span>
          </a>

          {/* TOC Dropdown Button Component */}
          {toc.length > 0 && (
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setIsTocOpen(!isTocOpen)}
                className="px-3 py-1.5 text-xs font-semibold rounded-md border border-border bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center gap-1.5 transition-all duration-150"
              >
                Chapters
                <span className={`transition-transform duration-200 ${isTocOpen ? 'rotate-180' : ''}`}>▾</span>
              </button>
              
              {/* Dropdown Menu Portal Card */}
              {isTocOpen && (
                <div className="absolute left-0 mt-2 w-64 max-h-72 overflow-y-auto bg-background text-popover-foreground border border-border rounded-md shadow-lg z-50 py-1.5 animate-in fade-in slide-in-from-top-2 duration-100 z-100">
                  {toc.map((chapter, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setLocation(chapter.href);
                        setIsTocOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-accent hover:text-accent-foreground transition-colors truncate block"
                    >
                      {chapter.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-6">
          <a href={import.meta.env.BASE_URL} className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200">
            Home
          </a>
          <div className="flex items-center scale-90">
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      {/* E-Book Canvas Area */}
      <div className="flex-1 relative w-full text-foreground">
        <ReactReader
          url={epubUrl}
          location={location}
          locationChanged={(loc) => {
            setLocation(loc);
            localStorage.setItem('book-page', loc);
          }}
          // Listens for the book loading and saves the table of contents data to state
          tocChanged={(tocArray) => setToc(tocArray)}
          epubOptions={{
            spread: 'none', 
            allowScriptedContent: true,
            allowPopups: true,
          }}
          readerStyles={customReaderStyles}
          getRendition={(rendition) => {
            renditionRef.current = rendition;
            rendition.book.ready.then(() => {
              applyTailwindTheme();
            });
            rendition.hooks.content.register((contents) => {
              syncEpubCheckboxes(contents);
              handleExternalLinks(contents);
            });
          }}
        />
      </div>

      {/* Bottom Navigation Controls */}
      <div className="w-full bg-background border-t border-border flex justify-between items-center gap-1 z-10">
        <button 
          onClick={() => renditionRef.current?.prev()} 
          className="px-5 py-3 w-full bg-primary text-primary-foreground font-medium text-sm shadow-sm hover:opacity-90 active:scale-98 transition-all duration-150"
        >
          ← Previous
        </button>
        
        <button 
          onClick={() => renditionRef.current?.next()} 
          className="px-5 py-3 w-full bg-primary text-primary-foreground font-medium text-sm shadow-sm hover:opacity-90 active:scale-98 transition-all duration-150"
        >
          Next →
        </button>
      </div>
    </div>
  )
}