import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface LeaderboardProps {
  leaderboard: { name: string; turns: number }[];
}

// const Leaderboard: React.FC<LeaderboardProps> = ({ leaderboard }) => {
//   return (
//     <div className="mb-4 p-4 bg-black shadow rounded-lg">
//       <h2 className="text-2xl font-bold mb-4 text-center text-gray-100">
//         Leaderboard
//       </h2>
//       <ul className="list-none p-0">
//         {leaderboard.map((entry, index) => (
//           <li
//             key={index}
//             className={`text-lg py-2 px-4 bg-gray-100 rounded-md mb-2`}
//           >
//             <span className="font-semibold">
//               {index + 1}. {entry.name}
//             </span>
//             : {entry.turns} turns
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
const Leaderboard: React.FC<LeaderboardProps> = ({ leaderboard }) => {
  return (
    <div className="mb-4">
      <Collapsible>
        <CollapsibleTrigger>
          <button className="text-xl font-bold text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded">
            Leaderboard
          </button>
        </CollapsibleTrigger>
        <div className="mb-4"></div>
        <CollapsibleContent>
          <ul className="list-none p-0">
            {leaderboard.map((entry, index) => (
              <li
                key={index}
                className={`text-lg py-2 px-4 bg-gray-100 rounded-md mb-2`}
              >
                <span className="font-semibold">
                  {index + 1}. {entry.name}
                </span>
                : {entry.turns} turns
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Leaderboard;
