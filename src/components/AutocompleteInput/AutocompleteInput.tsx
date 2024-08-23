import { useEffect, useRef, useState } from "react";

import './AutocompleteInput.css';

type Props = {
  animals: string[], 
  inputValue: string, 
  setInputValue: (value: string) => void
}

export const AutocompleteInput: React.FC<Props> = ({ animals, inputValue, setInputValue}) => {
  const [showList, setShowList] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  const filteredAnimals = animals.filter(animal => animal.toLowerCase().startsWith(inputValue.toLowerCase()));

  const handleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setShowList(true);
  }

  const handleChooseAnimal = (animal: string) => {
    setInputValue(animal);
    setShowList(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowList(false);
      }
    }
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputRef]);

  return (
    <div ref={inputRef} className="container">
        <input className="input"
          type="text" 
          aria-placeholder="Search animal" 
          value={inputValue}
          onChange={handleInputValue}
          />
        <span 
          className="arrow" 
          onClick={() => {
            // setInputValue('');
            setShowList(!showList);
          }}
        >
          ▼
        </span>
      
        {showList &&
          <ul className="list">
          {filteredAnimals.length > 0 ? (filteredAnimals.map(animal => (
            <li className="list_item"
              key={animal}
              onClick={() => handleChooseAnimal(animal)}
            >
              {animal}
            </li>
          ))) : (
            <li>No matches found</li>
          )}
        </ul>}

      </div>
  )
}