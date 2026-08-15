"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { MapPin } from "lucide-react";
import { toast } from "sonner";

export default function LocationPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"fetching" | "fallback">("fetching");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate location fetch
    const timer = setTimeout(() => {
      setStatus("fallback");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleEnable = () => {
    if (!("geolocation" in navigator)) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Success — permission granted
        setLoading(false);
        toast.success("Location enabled");
        localStorage.setItem("locationEnabled", "true");
        localStorage.setItem(
          "userLocation",
          JSON.stringify({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        );
        setTimeout(() => {
          router.push("/home");
        }, 500);
      },
      (error) => {
        // Error — user denied or other issue
        setLoading(false);

        if (error.code === error.PERMISSION_DENIED) {
          toast.error(
            "Location permission denied. Please enable it from browser settings."
          );
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          toast.error("Location information is unavailable.");
        } else if (error.code === error.TIMEOUT) {
          toast.error("Location request timed out. Please try again.");
        } else {
          toast.error("Unable to get your location.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleSkip = () => {
    // Optional — user can skip if they don't want to share location
    localStorage.setItem("locationEnabled", "false");
    router.push("/home");
  };

  return (
    <main className="min-h-screen flex flex-col max-w-md mx-auto relative">
      {/* Top area — logo + status icon */}
      <div className="p-6 flex justify-between items-start">
        <Logo size="lg" />
        {status === "fallback" && (
          <div className="bg-green-500 rounded-full p-2">
            <MapPin className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      {/* Message */}
      <div className="px-6 pt-8">
        {status === "fetching" ? (
          <h1 className="sm:text-[1.04rem] md:text-[1.4rem] font-extrabold uppercase leading-tight text-white/50">
            Trying to fetch your{" "}
            <span style={{ color: "#b57eff" }}>location</span>...
          </h1>
        ) : (
          <h1 className="sm:text-[1.04rem] md:text-[1.4rem] font-extrabold uppercase leading-tight">
            We use your <span style={{ color: "#b57eff" }}>location</span> to
            suggest nearby events.
          </h1>
        )}
      </div>

      {/* Bottom */}
      {status === "fallback" && (
        <div className="mt-auto px-6 pb-10 space-y-3">
          <p className="text-[11px] md:text-sm text-white/50">
            Taking longer than expected. Please check permissions.
          </p>
          <Button onClick={handleEnable} loading={loading}>
            ENABLE LOCATION
          </Button>
          <Button variant="ghost" onClick={handleSkip} disabled={loading}>
            Skip for now
          </Button>
        </div>
      )}
    </main>
  );
}