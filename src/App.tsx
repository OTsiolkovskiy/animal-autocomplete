import { useEffect, useState } from "react"
import { Loading } from "./components/Loading/Loading";
import { AutocompleteInput } from "./components/AutocompleteInput/AutocompleteInput";

function App() {
const [animals, setAnimals] = useState<string[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const [inputValue, setInputValue] = useState<string>('');

useEffect(() => {
  setTimeout(() => {
    fetch('/animals.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch animals');
      }
      return response.json();
    })
    .then(data => {
      setAnimals(data);
      setLoading (false);
    })
    .catch(error => {
      console.error(error);
      setLoading(false);
    });
  }, 3000)
}, []);

if (loading) {
  return <Loading />
}

  return (
    <>
      <AutocompleteInput 
        animals={animals} 
        inputValue={inputValue} 
        setInputValue={setInputValue} 
      />
       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam numquam magni odit molestias, officiis amet omnis a veritatis perferendis alias suscipit quia dicta error quaerat. Ipsam nesciunt a quia doloremque quod rerum? Facilis neque perferendis error recusandae, omnis fuga ducimus quisquam, dolor, repudiandae voluptates dicta sint repellat quasi eaque nam?</p>
    </>
  )
}

export default App
