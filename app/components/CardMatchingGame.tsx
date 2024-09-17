import React, { useState, useEffect } from "react";
import Image from "next/image";
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
    {/* (<Image src={imageUrl} alt="card" layout="fill" objectFit="cover" />) : (
    <div className="card-back"></div>) */}
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
    const imageUrls = [
      "https://fastly.picsum.photos/id/804/200/300.jpg?hmac=iNvnrzdzAcNx5ZKyG3JWnH4EIYwl-9Lp_4WqWA4R5mo",
      "https://fastly.picsum.photos/id/187/200/300.jpg?hmac=RGKQU40hHnXm-pBoMbUE5TDcy26DLc6CdcqednFcmB0",
      "https://fastly.picsum.photos/id/755/200/300.jpg?hmac=CfzLROBA3atEQnBKXK5SeavNo-1QRwZRwcqZwwdBMdM",
      "https://fastly.picsum.photos/id/279/200/300.jpg?hmac=fYDbVmnm7vDGt7SA51v-qMUKHIn7HKCp5v9d8Wx_SVM",
      "https://fastly.picsum.photos/id/928/200/300.jpg?hmac=0vBcHV9dVfFTsvcFDn8PRUQiOaH72_2aaKnmlU1PHWk",
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
