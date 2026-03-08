import { useState } from 'react';
import { motion } from 'framer-motion';

const snails = [
  { id: 1, name: "Турбо-Слизь", color: "bg-red-500", speed: 2.5 },
  { id: 2, name: "Мега-Ракушка", color: "bg-blue-500", speed: 3.2 },
  { id: 3, name: "Шустрый Эдуард", color: "bg-green-500", speed: 2.8 },
];

export default function App() {
  const [isRacing, setIsRacing] = useState(false);
  const [bet, setBet] = useState(null);
  const [winner, setWinner] = useState(null);

  const startRace = () => {
    setIsRacing(true);
    setWinner(null);
    // Имитация запроса на бэкенд для фиксации ставки и получения результата
    setTimeout(() => {
      setIsRacing(false);
      setWinner(snails[1].name); // В реальном проекте победителя отдает бэкенд
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10 font-sans">
      <h1 className="text-4xl font-bold mb-8 text-center text-yellow-400">🏁 FastSnail Bet 🏁</h1>
      
      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-xl">
        <h2 className="text-xl mb-4">Выберите своего чемпиона:</h2>
        <div className="flex gap-4 mb-8">
          {snails.map((snail) => (
            <button
              key={snail.id}
              onClick={() => setBet(snail.id)}
              className={`px-4 py-2 rounded-md font-bold transition-all ${bet === snail.id ? 'ring-4 ring-yellow-400 ' + snail.color : 'bg-gray-700 hover:bg-gray-600'}`}
            >
              {snail.name}
            </button>
          ))}
        </div>

        <div className="space-y-6 bg-gray-700 p-4 rounded-lg relative overflow-hidden border-r-4 border-checkered">
          {snails.map((snail) => (
            <div key={snail.id} className="relative h-12 flex items-center border-b border-gray-600 pb-2">
              <span className="absolute left-0 text-sm opacity-50">{snail.name}</span>
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: isRacing ? '600px' : 0 }}
                transition={{ duration: snail.speed, ease: "easeInOut" }}
                className={`w-10 h-10 rounded-full ${snail.color} flex items-center justify-center text-2xl z-10`}
              >
                🐌
              </motion.div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={startRace} 
            disabled={!bet || isRacing}
            className="bg-yellow-500 text-black px-8 py-3 rounded-full font-bold text-xl hover:bg-yellow-400 disabled:opacity-50"
          >
            {isRacing ? 'Гонка идет! 🚀' : 'СДЕЛАТЬ СТАВКУ И НАЧАТЬ ЗАБЕГ'}
          </button>
          
          {winner && (
            <div className="mt-6 text-2xl font-bold text-green-400 animate-bounce">
              Победитель: {winner}!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
