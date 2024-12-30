import React from "react";
import HeroCard from "./HeroCard";

function PublicScreen() {
  return (
    <div
      className="min-h-screen font-mono flex items-center justify-evenly"
      id="background"
    >
      <HeroCard
        buttons={true}
        title={"Welcome to Tasky"}
        subtitle={"Start your task management journey with us!"}
      />
    </div>
  );
}

export default PublicScreen;
