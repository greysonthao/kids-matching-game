import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import Leaderboard from "./Leaderboard";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface GameCard {
  id: number;
  imageUrl: string;
  isFlipped: boolean;
}

interface GameCardProps {
  id: number;
  imageUrl: string;
  isFlipped: boolean;
  onClick: (id: number) => void;
}

const GameCard: React.FC<GameCardProps> = ({
  id,
  imageUrl,
  isFlipped,
  onClick,
}) => (
  <Card
    className={`w-20 h-28 m-2 cursor-pointer ${
      isFlipped ? "bg-primary-foreground" : "bg-primary"
    } flex items-center justify-center text-4xl transition-all duration-300 transform ${
      isFlipped ? "rotate-y-180" : ""
    }`}
    onClick={() => onClick(id)}
  >
    <CardContent className="p-0">
      {isFlipped && (
        <Image
          src={imageUrl}
          alt="card"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      )}
    </CardContent>
  </Card>
);

export const CardMatchingGame = () => {
  const [cards, setCards] = useState<GameCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [turns, setTurns] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const { width, height } = useWindowSize();
  const [leaderboard, setLeaderboard] = useState<
    { name: string; turns: number }[]
  >([]);
  const [playerName, setPlayerName] = useState("");
  const [addToLeaderboard, setAddToLeaderboard] = useState(false);

  useEffect(() => {
    initializeGame();
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setGameWon(true);

      const highestTurns =
        leaderboard.length > 0
          ? Math.max(...leaderboard.map((entry) => entry.turns))
          : Infinity;

      if (turns <= highestTurns || leaderboard.length < 3) {
        setAddToLeaderboard(true);
      }

      //     submitToLeaderboard(newEntry);
      //     fetchLeaderboard();
      //   }
      // }

      // if (updatedLeaderboard.includes(newEntry)) {
      //   const playerName = prompt(
      //     "Congratulations! Enter your name for the leaderboard:"
      //   );
      //   if (playerName) {
      //     newEntry.name = playerName;
      //     setLeaderboard(updatedLeaderboard);
      //     submitToLeaderboard(newEntry);
      //   }
      // }
    }
  }, [matchedCards]);

  const initializeGame = () => {
    setAddToLeaderboard(false);
    setPlayerName("");
    const imageUrls = [
      "https://raw.githubusercontent.com/greysonthao/kids-matching-game/main/images/pawpatrol/Marshall.webp",
      "https://raw.githubusercontent.com/greysonthao/kids-matching-game/main/images/pawpatrol/Rubble.webp",
      "https://raw.githubusercontent.com/greysonthao/kids-matching-game/main/images/pawpatrol/chase.webp",
      "https://raw.githubusercontent.com/greysonthao/kids-matching-game/main/images/pawpatrol/everest.webp",
      "https://raw.githubusercontent.com/greysonthao/kids-matching-game/main/images/pawpatrol/plush.webp",
      "https://raw.githubusercontent.com/greysonthao/kids-matching-game/main/images/pawpatrol/rocky.webp",
      "https://raw.githubusercontent.com/greysonthao/kids-matching-game/main/images/pawpatrol/ryder.webp",
      "https://raw.githubusercontent.com/greysonthao/kids-matching-game/main/images/pawpatrol/skye.webp",
      "https://raw.githubusercontent.com/greysonthao/kids-matching-game/main/images/pawpatrol/turbot.webp",
      "https://raw.githubusercontent.com/greysonthao/kids-matching-game/main/images/pawpatrol/zuma.webp",
    ];

    const shuffledCards = [...imageUrls, ...imageUrls]
      .sort(() => Math.random() - 0.5)
      .map((imageUrl, index) => ({
        id: index,
        imageUrl: imageUrl,
        isFlipped: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setTurns(0);
    setGameWon(false);
  };

  const handleCardClick = (id: number) => {
    if (
      flippedCards.length === 2 ||
      matchedCards.includes(id) ||
      flippedCards.includes(id)
    )
      return;

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setTurns(turns + 1);
      const [firstCardId, secondCardId] = newFlippedCards;
      if (cards[firstCardId].imageUrl === cards[secondCardId].imageUrl) {
        setMatchedCards([...matchedCards, firstCardId, secondCardId]);
        setFlippedCards([]);
        if (matchedCards.length + 2 === cards.length) {
          setGameWon(true);
        }
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  const fetchLeaderboard = async () => {
    const response = await fetch("/api/leaderboard");
    const data = await response.json();
    console.log("data: ", data);
    setLeaderboard(data.leaderboard);
  };

  const submitToLeaderboard = async (entry: {
    name: string;
    turns: number;
  }) => {
    await fetch("/api/leaderboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    });
    fetchLeaderboard();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      {gameWon && <Confetti width={width} height={height} />}
      <h1 className="text-3xl font-bold mb-4 text-center">
        Paw Patrol Matching Game
      </h1>
      <div>
        {leaderboard && leaderboard.length > 0 && (
          <Leaderboard leaderboard={leaderboard} />
        )}
      </div>
      <div className="mb-4 flex flex-col items-center">
        <Button onClick={initializeGame} className="flex items-center mb-2">
          <Shuffle className="mr-2 h-4 w-4" /> New Game
        </Button>
        <span className="text-xl font-semibold">Turns: {turns}</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {cards.map((card) => (
          <GameCard
            key={card.id}
            id={card.id}
            imageUrl={card.imageUrl}
            isFlipped={
              flippedCards.includes(card.id) || matchedCards.includes(card.id)
            }
            onClick={handleCardClick}
          />
        ))}
      </div>

      <AlertDialog open={gameWon}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Congratulations!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              You won the game in {turns} turns!
            </AlertDialogDescription>
          </AlertDialogHeader>
          {addToLeaderboard && (
            <div className="flex flex-col items-center">
              <input
                type="text"
                id="playerName"
                className="border p-2 mb-4"
                placeholder="Your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
            </div>
          )}
          <AlertDialogFooter>
            {addToLeaderboard && (
              <AlertDialogAction
                onClick={() => {
                  if (playerName.trim()) {
                    const newEntry = { name: playerName, turns };
                    submitToLeaderboard(newEntry);
                    initializeGame();
                  } else {
                    alert("Please enter your name.");
                  }
                }}
              >
                Submit
              </AlertDialogAction>
            )}
            {!addToLeaderboard && (
              <AlertDialogAction onClick={() => initializeGame()}>
                New Game
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
