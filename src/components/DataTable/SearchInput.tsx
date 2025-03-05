import { useEffect, useRef } from 'react';
import { X } from '@phosphor-icons/react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle Escape key to clear search
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onChange('');
        inputRef.current?.blur(); // unfocus the search input when cleared
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onChange]);

  return (
    <div className="relative flex items-center">
      <label htmlFor="search" className="sr-only">
        Search characters
      </label>
      <input
        id="search"
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name..."
        className="border border-gray-300 rounded px-3 py-1 pr-8 w-64"
        aria-label="Search Star Wars characters"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
