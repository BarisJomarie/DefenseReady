import {cn} from '@/lib/utils';
import { Search } from 'lucide-react';

export const ForumSearchBar = ({searchQuery, setSearchQuery}) => {
  return (
    <section 
      id="search post"
      className="relative px-4 flex items-center justify-between">
      {/* SEARCH BAR */}
      <div className='flex flex-row sm:justify-start w-full lg:justify-center py-4'>
        <div className='relative w-full lg:w-1/2'>
          <Search className='absolute text-foreground left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none'/>
          <input 
            className={cn(
              "relative bg-foreground/8 border border-border-medium text-foreground text-sm rounded-xl placeholder:text-foreground block w-full pl-10 pr-4 py-2.5 rounded-xl shadow-xs outline-none",
              "focus:outline-none")}
            placeholder='Search A Post'
            onChange={(e) => {setSearchQuery(e.target.value)}}
            type='text'
            value={searchQuery}/>
        </div>
      </div> 
    </section>
  )
}