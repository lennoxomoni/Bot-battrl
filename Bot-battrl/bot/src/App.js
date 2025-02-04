
import React, { useState, useEffect } from "react"; // Import React and its hooks (useState, useEffect)
import BotCollection from "./components/BotCollection"; // Import BotCollection component
import YourBotArmy from "./components/YourBotArmy"; // Import YourBotArmy component
import SortBar from "./components/SortBar"; // Import SortBar component
import Footer from "./components/Footer"; // Import Footer component
import "./App.css"; // Import CSS styles

function App() {
  // State variables
  const [bots, setBots] = useState([]); // Stores the list of available bots
  const [army, setArmy] = useState([]); // Stores the list of bots in the user's army
  const [error, setError] = useState(null); // Stores error messages (if any)
  const [isLoading, setIsLoading] = useState(true); // Tracks whether the bots are still loading
  const [darkMode, setDarkMode] = useState(false); // Tracks dark mode state (true = dark mode, false = light mode)

  // useEffect to fetch bot data when the component mounts
  useEffect(() => {
    fetch("http://localhost:8001/bots") // Fetch bot data from API
      .then((response) => response.json()) // Convert response to JSON
      .then((data) => {
        setBots(data); // Update bots state with fetched data
        setIsLoading(false); // Set loading to false after data is loaded
      })
      .catch((error) => {
        console.error("Error fetching bots:", error); // Log error to console
        setError(error.message); // Store error message in state
        setIsLoading(false); // Set loading to false even if there is an error
      });
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // Function to add a bot to the army
  const addToArmy = (bot) => {
    if (!army.some((armyBot) => armyBot.id === bot.id)) { // Check if bot is already in the army
      setArmy([...army, bot]); // Add bot to army if not already present
    }
  };

  // Function to remove a bot from the army
  const removeFromArmy = (bot) => {
    setArmy(army.filter((armyBot) => armyBot.id !== bot.id)); // Remove the bot by filtering it out of the array
  };

  // Function to delete a bot permanently
  const deleteBot = (bot) => {
    fetch(`http://localhost:8001/bots/${bot.id}`, { // Make a DELETE request to remove the bot from the API
      method: "DELETE",
    }).then(() => {
      setBots(bots.filter((b) => b.id !== bot.id)); // Remove bot from the bots state
      setArmy(army.filter((armyBot) => armyBot.id !== bot.id)); // Also remove the bot from the army state if present
    });
  };

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // Toggle the darkMode state between true and false
  };

  // Conditional rendering for loading and error states
  if (isLoading) return <p>Loading bots...</p>; // Show loading message while fetching bots
  if (error) return <p>Error loading bots: {error}</p>; // Show error message if fetching fails

  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}> {/* Apply dark or light mode class */}
      <h1>BOT BATTRL WEBSITE</h1>
      <button onClick={toggleDarkMode}> {/* Button to toggle dark mode */}
        {darkMode ? "Light Mode" : "Dark Mode"} {/* Change button text based on mode */}
      </button>
      <SortBar bots={bots} setBots={setBots} /> {/* Component for sorting bots */}
      <YourBotArmy army={army} removeFromArmy={removeFromArmy} deleteBot={deleteBot} /> {/* Component to display selected bots */}
      <BotCollection bots={bots} addToArmy={addToArmy} deleteBot={deleteBot} /> {/* Component to display all available bots */}
      <Footer /> {/* Footer component */}
    </div>
  );
}

export default App; // Export the App component to be used in index.js
