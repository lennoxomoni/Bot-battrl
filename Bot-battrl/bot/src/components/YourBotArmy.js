
import React from "react";
import BotCard from "./BotCard";

function YourBotArmy({ army, removeFromArmy, deleteBot }) {
  return (
    <div className="your-bot-army">
      <h2>Your Bot Army</h2>
      {army.map((bot) => (
        <BotCard
          key={bot.id}
          bot={bot}
          handleClick={() => removeFromArmy(bot)}
          handleDelete={() => deleteBot(bot)}
        />
      ))}
    </div>
  );
}

export default YourBotArmy;
