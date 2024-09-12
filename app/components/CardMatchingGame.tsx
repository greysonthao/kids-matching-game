import React, { useState, useEffect } from "react";
import { Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  content: string;
  isFlipped: boolean;
}

interface GameCardProps {
  id: number;
  content: string;
  isFlipped: boolean;
  onClick: (id: number) => void;
}

const GameCard: React.FC<GameCardProps> = ({
  id,
  content,
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
    <CardContent className="p-0">{isFlipped && content}</CardContent>
  </Card>
);

export const CardMatchingGame: React.FC = () => {
  const [cards, setCards] = useState<GameCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [turns, setTurns] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    //const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯"];
    const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰"];

    const shuffledCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, content: emoji, isFlipped: false }));
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
      if (cards[firstCardId].content === cards[secondCardId].content) {
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <h1 className="text-3xl font-bold mb-4">Card Matching Game</h1>
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
            content={card.content}
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
            <AlertDialogTitle>Congratulations!</AlertDialogTitle>
            <AlertDialogDescription>
              You won the game in {turns} turns!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={initializeGame}>
              Play Again
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
