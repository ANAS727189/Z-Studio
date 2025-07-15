import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const hackerLogs = [
  "[WARNING] Unauthorized breach detected...",
  "[ERROR] Root access granted to unknown user.",
  "[MALWARE] Injecting payload into /system32...",
  "[CRITICAL] BIOS override in progress...",
  "[ALERT] Shutting down kernel security...",
  "[!!!] GPU meltdown initiated...",
  "[CRASH] Destroying boot sector...",
  "[x.x.x.x] Incoming attack from deep web proxy...",
  "[FATAL] Data corruption spreading across drives...",
  "[SELF-DESTRUCT] Final protocol activated...",
  "💀 SYSTEM FAILURE IMMINENT 💀",
  "Successfully fooled haha 🤡",
  "You tried to close the tab dont you ?, BYE BYE IDIOT !"
];

const HackerScreen = ({ onClose }: { onClose: () => void }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < hackerLogs.length) {
        setLogs((prev) => [...prev, hackerLogs[index]]);
        setIndex((prev) => prev + 1);
      } else {
        clearInterval(interval);
        setTimeout(onClose, 8000);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [index, onClose]);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black text-green-400 font-mono text-sm z-[9999] p-6 overflow-y-auto">
      <div className="animate-pulse mb-4 text-red-500 text-lg">!! SYSTEM COMPROMISED !!</div>
      {logs.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
};

export default HackerScreen;
