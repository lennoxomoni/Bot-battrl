
import React from "react";
import BotCard from "./BotCard";

function BotCollection({ bots, addToArmy, deleteBot }) {
  return (
    <div className="bot-collection">
      {bots.map((bot) => (
        <BotCard
          key={bot.id}
          bot={bot}
          handleClick={() => addToArmy(bot)}
          handleDelete={() => deleteBot(bot)}
        />
      ))}
    </div>
  );
}

export default BotCollection;