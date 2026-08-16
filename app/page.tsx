"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 30%, #ff4500 0%, transparent 40%), radial-gradient(ellipse at 80% 20%, #00c8ff 0%, transparent 45%), radial-gradient(ellipse at 50% 60%, #ff1493 0%, transparent 35%), radial-gradient(ellipse at 30% 80%, #9d4edd 0%, transparent 40%), #000",
          backgroundSize: "200% 200%",
          opacity: 0.9,
        }}
        animate={{
          backgroundPosition: [
            "0% 50%",
            "100% 50%",
            "100% 100%",
            "0% 100%",
            "0% 50%",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 300,
            height: 300,
            background: "#ff1493",
            filter: "blur(60px)",
            opacity: 0.5,
            top: "10%",
            left: "-50px",
          }}
          animate={{
            x: [0, 80, 0],
            y: [0, 60, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 250,
            height: 250,
            background: "#00c8ff",
            filter: "blur(60px)",
            opacity: 0.5,
            top: "30%",
            right: "-50px",
          }}
          animate={{
            x: [0, -70, 0],
            y: [0, 80, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 280,
            height: 280,
            background: "#9d4edd",
            filter: "blur(60px)",
            opacity: 0.5,
            bottom: "20%",
            left: "30%",
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -70, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Dark overlay bottom */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen max-w-md mx-auto w-full">
        {/* Center logo */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            <Logo size="lg" />
          </motion.div>
        </div>

        {/* Bottom section */}
        <div className="px-6 pb-10 space-y-6">
          <motion.div
            className="text-center space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-white">
              An App Only For
            </p>
            <h1 className="text-4xl font-bold uppercase tracking-wide">
              Extroverts
            </h1>
          </motion.div>

          <motion.p
            className="text-center text-[11px] text-white/80 leading-relaxed px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          >
            <span className="text-red-400 font-semibold">Warning:</span>{" "}
            Entering may lead to spontaneous dancing and unsolicited high-fives!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          >
            <Button onClick={() => router.push("/terms")}>CONTINUE</Button>
          </motion.div>
        </div>
      </div>
    </main>
  );
}