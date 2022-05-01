import PetCard from "../PetCard/PetCard";
import './PetContainer.css';


const PetContainer = ({ result }) => {
/**
 * Grid Wrapper for the Pets Card
 * Takes in the results array from the Petfinder's Api
 * Only the first page results are passed
 */
  return (
    <div className="puppy-container-wrapper">
        <PetCard result={result}/>
    </div>
  )
}

export default PetContainer


