"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  Monitor,
  MessageCircle,
  Mic,
  ArrowRight,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import CountryCodeSelect, {
  DEFAULT_COUNTRY,
  type Country,
} from "./components/CountryCodeSelect";

const Avatar3D = dynamic(() => import("./components/Avatar3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-xl">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
    </div>
  ),
});

const LiveKitWidget = dynamic(() => import("./components/LiveKitWidget"), {
  ssr: false,
});

const NAV_ITEMS: string[] = ["Products", "Pricing", "AboutUs"];

export default function Home() {
  const [activeId, setActiveId] = useState<string | null>("voice");
  const [showAvatarWidget, setShowAvatarWidget] = useState(false);
  const [isAnyAgentOpen, setIsAnyAgentOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] =
    useState<Country>(DEFAULT_COUNTRY);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isCallLoading, setIsCallLoading] = useState(false);
  const [callStatus, setCallStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [callState, setCallState] = useState<
    "idle" | "connecting" | "connected" | "disconnected"
  >("idle");
  const [currentCallId, setCurrentCallId] = useState<string | null>(null);

  const handleMakeCall = async () => {
    // Prevent multiple simultaneous calls
    if (callState === "connecting" || callState === "connected") {
      setCallStatus({
        type: "error",
        message: "Please wait for the current call to finish",
      });
      // Auto-dismiss after 3 seconds
      setTimeout(() => {
        setCallStatus({ type: null, message: "" });
      }, 3000);
      return;
    }

    if (!phoneNumber.trim()) {
      setCallStatus({
        type: "error",
        message: "Please enter a phone number",
      });
      // Auto-dismiss after 3 seconds
      setTimeout(() => {
        setCallStatus({ type: null, message: "" });
      }, 3000);
      return;
    }

    // Construct full phone number with country code
    const fullPhoneNumber = `${selectedCountry.dialCode}${phoneNumber}`;

    setIsCallLoading(true);
    setCallStatus({ type: null, message: "" });
    setCallState("connecting");

    try {
      const response = await fetch("http://localhost:5002/makeCall", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone_number: fullPhoneNumber }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setCallStatus({
          type: "success",
          message: `Call connecting to ${fullPhoneNumber}...`,
        });
        setCurrentCallId(data.call_id || fullPhoneNumber);
        setIsAnyAgentOpen(true);
        // Start polling for call status
        pollCallStatus(data.call_id || fullPhoneNumber);

        // Auto-dismiss after 3 seconds
        setTimeout(() => {
          setCallStatus({ type: null, message: "" });
        }, 3000);
      } else {
        setCallStatus({
          type: "error",
          message: data.error || "Failed to initiate call",
        });
        setCallState("idle");
        // Auto-dismiss after 3 seconds
        setTimeout(() => {
          setCallStatus({ type: null, message: "" });
        }, 3000);
      }
    } catch (error) {
      setCallStatus({
        type: "error",
        message: "Network error.",
      });
      setCallState("idle");
      // Auto-dismiss after 3 seconds
      setTimeout(() => {
        setCallStatus({ type: null, message: "" });
      }, 3000);
    } finally {
      setIsCallLoading(false);
    }
  };

  const pollCallStatus = async (callId: string) => {
    let hasTransitionedToConnected = false; // Track if we've already transitioned
    let wasConnected = false; // Track if call was ever connected

    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(
          `http://localhost:5002/callStatus/${callId}`,
        );
        const data = await response.json();

        if (data.status === "connected") {
          if (!hasTransitionedToConnected) {
            wasConnected = true;
            setCallState("connected");
            setCallStatus({
              type: "success",
              message: "Call connected!",
            });
            hasTransitionedToConnected = true;

            // Auto-dismiss notification after 3 seconds
            setTimeout(() => {
              setCallStatus({ type: null, message: "" });
            }, 3000);
          }
        } else if (data.status === "disconnected" || data.status === "failed") {
          setCallState("disconnected");
          setCallStatus({
            type: "error",
            message: wasConnected ? "Call disconnected" : "No answer",
          });
          clearInterval(pollInterval);
          // Re-enable hover on other cards after call ends
          setIsAnyAgentOpen(false);
          // Auto-dismiss notification after 3 seconds
          setTimeout(() => {
            setCallStatus({ type: null, message: "" });
          }, 3000);
        }
      } catch (error) {
        console.error("Error polling call status:", error);
      }
    }, 2000); // Poll every 2 seconds

    // Stop polling after 2 minutes (timeout)
    setTimeout(() => {
      clearInterval(pollInterval);
      if (callState === "connecting") {
        setCallState("disconnected");
        setCallStatus({
          type: "error",
          message: "No answer",
        });
        // Re-enable hover on other cards after timeout
        setIsAnyAgentOpen(false);
        // Auto-dismiss notification after 3 seconds
        setTimeout(() => {
          setCallStatus({ type: null, message: "" });
        }, 3000);
      }
    }, 120000);
  };

  const products = [
    {
      id: "whatsapp",
      title: "WhatsApp Agent",
      subtitle: "Automated Messaging",
      description:
        "Scale your outreach on the worlds most popular app. Perfect for sales qualification and instant support.",
      shortHighlight: "Automate sales and support on WhatsApp instantly.",
      backgroundImage: "/assets/whatsapp-agent-bg.png",
      icon: <MessageCircle className="w-8 h-8" />,
      color: "from-green-400 to-emerald-300",
      bgGlow: "bg-green-400/20",
    },
    {
      id: "voice",
      title: "Calling Agent",
      isPopular: true,
      subtitle: "Human-like Voice AI",
      description:
        "Zero-latency voice processing that handles interruptions, accents, and complex logic flows naturally.",
      shortHighlight: "Zero-latency voice interactions. Handles interruptions.",
      backgroundImage: "/assets/voice-agent-bg.png",
      icon: <Mic className="w-8 h-8" />,
      color: "from-purple-400 to-pink-300",
      bgGlow: "bg-purple-400/20",
    },
    {
      id: "web",
      title: "Web Agent",
      subtitle: "Context-aware Site Assistance",
      description:
        "Embeds directly into your DOM to understand user journey and provide instant, context-aware support.",
      shortHighlight: "Seamlessly integrates with your website. Context-aware.",
      backgroundImage: "/assets/web-agent-bg.png",
      icon: <Monitor className="w-8 h-8" />,
      color: "from-blue-400 to-cyan-300",
      bgGlow: "bg-cyan-400/20",
    },
  ];

  // Render mockup based on product ID and active state
  const renderMockup = (productId: string, isActive: boolean) => {
    if (productId === "web") {
      return (
        <div className="w-full max-w-xs h-48 bg-white/40 rounded-xl border border-white/50 shadow-sm backdrop-blur-md overflow-hidden flex items-center justify-center">
          {isActive && (
            <Avatar3D
              scale={1.2}
              position={[0, -1.15, 0]}
              enableOrbitControls={false}
            />
          )}
        </div>
      );
    }

    if (productId === "voice") {
      return (
        <div className="w-full max-w-xs flex items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/60 flex items-center justify-center shadow-lg animate-pulse">
            <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-24 h-2 bg-gray-800/10 rounded-full"></div>
            <div className="w-16 h-2 bg-gray-800/10 rounded-full"></div>
          </div>
        </div>
      );
    }

    if (productId === "whatsapp") {
      return (
        <div className="w-full max-w-xs bg-[#E5DDD5]/80 rounded-xl p-3 border border-white/50 shadow-sm backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-black"></div>
          <div className="relative z-10 bg-white p-2 rounded-lg shadow-sm text-xs mb-2 w-3/4 ml-auto rounded-tr-none">
            Hey! Can I schedule a demo?
          </div>
          <div className="relative z-10 bg-[#DCF8C6] p-2 rounded-lg shadow-sm text-xs w-3/4 mr-auto rounded-tl-none">
            Absolutely. Pick a time below.
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="h-screen w-full bg-[#F0F4F8] font-sans overflow-hidden relative flex flex-col">
      {/* --- BACKGROUND AMBIENT --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#A0E1E1] rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#D4C4FB] rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute top-[20%] left-[30%] w-[40vw] h-[40vw] bg-[#AFF8D8] rounded-full mix-blend-multiply filter blur-[100px] opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      {/* --- HEADER --- */}
      <nav className="absolute top-0 left-0 w-full z-50 p-6 flex justify-between items-center">
        <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
          <img
            src="/assets/logo.jpeg"
            alt="logo"
            className="w-6 h-6 rounded object-cover"
          />

          <span className="text-gray-800 font-bold tracking-tight">
            Afterlife
          </span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600 bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/30">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              className="group relative h-[1.2em] overflow-hidden"
            >
              <div className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-[1.2em]">
                <span className="flex items-center h-[1.2em]">{item}</span>
                <span className="flex items-center h-[1.2em] text-black font-bold">
                  {item}
                </span>
              </div>
            </button>
          ))}
        </div>
      </nav>

      {/* --- MAIN STAGE --- */}
      <main className="flex-1 flex flex-col md:flex-row relative z-10 h-full p-4 md:p-6 gap-4 md:gap-6 pt-24 md:pt-24">
        {products.map((product) => {
          const isActive = activeId === product.id;

          return (
            <div
              key={product.id}
              onMouseEnter={() => !isAnyAgentOpen && setActiveId(product.id)}
              className={`
                relative h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-[2rem] overflow-hidden cursor-pointer border border-white/40 shadow-2xl
                ${isActive ? "flex-[3] md:flex-[2.5]" : "flex-1"}
                group
              `}
            >
              {/* IMAGE LAYER */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={product.backgroundImage}
                  alt=""
                  className={`w-full h-full object-cover transition-all duration-700 ${isActive ? "opacity-20 scale-105" : "opacity-40 grayscale-[20%] scale-100"}`}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-white/10 ${isActive ? "backdrop-blur-xl" : "backdrop-blur-sm"}`}
                ></div>
              </div>

              {/* GLOW LAYER */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 ${isActive ? "opacity-100" : "opacity-0"} bg-gradient-to-b ${product.bgGlow} to-transparent mix-blend-overlay`}
              ></div>

              {/* CONTENT CONTAINER */}
              {/* FIX: Changed justify-center to justify-end and added pb-12 to prevent top clipping */}
              <div className="relative h-full flex flex-col justify-end p-8 md:p-12 z-10 pb-20">
                {/* POPULAR BADGE */}

                {product.isPopular && (
                  <div
                    className={`absolute top-12 right-12 z-20 px-3 py-1 bg-black/5 backdrop-blur-md border border-black/5 rounded-full flex items-center gap-1.5 transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`}
                  >
                    <Sparkles
                      size={12}
                      className="text-purple-600 fill-purple-600"
                    />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-800">
                      Popular
                    </span>
                  </div>
                )}

                {/* ICON & ARROW */}
                {/* FIX: Absolute positioning for icon to keep it stable at the top */}
                <div
                  className={`absolute top-8 left-8 md:top-12 md:left-12 flex items-center justify-between w-[calc(100%-4rem)] transition-all duration-500`}
                >
                  <div
                    className={`p-4 rounded-2xl bg-white/50 shadow-sm text-gray-800 transition-transform duration-500 ${isActive ? "scale-0" : "scale-90 origin-top-left"}`}
                  >
                    {product.icon}
                  </div>
                  <div
                    className={`w-10 h-10 rounded-full border border-gray-800/10 flex items-center justify-center transition-all duration-500 ${isActive ? "rotate-90 bg-gray-900 text-white" : "rotate-0 bg-white/50 text-gray-600"}`}
                  >
                    <ChevronRight size={20} />
                  </div>
                </div>

                {/* TEXT CONTENT BLOCK */}
                {/* FIX: Added min-w-[300px] to prevent text squishing when card is narrow */}
                <div className="min-w-[300px]">
                  {/* TITLE */}
                  {/* FIX: Added whitespace-nowrap to prevent "WhatsApp" from breaking onto two lines */}
                  <h2
                    className={`font-bold text-gray-900 leading-none whitespace-nowrap transition-all duration-500 ${isActive ? "text-3xl md:text-4xl mb-4 translate-y-0" : "text-2xl md:text-3xl mb-2 translate-y-2"}`}
                  >
                    {product.title.split(" ")[0]}
                    <br />
                    <span
                      className={`text-transparent bg-clip-text bg-gradient-to-r ${product.color} pb-1`}
                    >
                      {product.title.split(" ")[1]}
                    </span>
                  </h2>

                  {/* SHORT HIGHLIGHT (Inactive State) */}
                  <div
                    className={`transition-all duration-500 ${!isActive ? "opacity-100 h-auto" : "opacity-0 h-0 overflow-hidden"}`}
                  >
                    <p className="text-sm text-gray-700 font-medium leading-relaxed max-w-[200px]">
                      {product.shortHighlight}
                    </p>
                  </div>

                  {/* FULL DESCRIPTION (Active State) */}
                  <div
                    className={`transition-all duration-700 ease-out overflow-hidden ${isActive ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6 max-w-md font-medium">
                      {product.description}
                    </p>

                    {/* MOCKUP CONTAINER */}
                    <div className="mb-6">
                      {renderMockup(product.id, isActive)}
                    </div>

                    {/* CTA BUTTONS */}
                    <div className="pt-2">
                      {product.id === "web" ? (
                        <button
                          onClick={() => {
                            setShowAvatarWidget(true);
                            setIsAnyAgentOpen(true);
                          }}
                          className="flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-bold shadow-lg hover:bg-gray-800 transition-colors"
                        >
                          <span>Try Agent</span>
                          <ArrowRight size={18} />
                        </button>
                      ) : product.id === "whatsapp" ? (
                        <div
                          className="flex flex-col gap-3 w-full max-w-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* Option 1: Message Us */}
                          <div className="flex items-center justify-between bg-white/40 border border-white/50 backdrop-blur-md rounded-xl p-2 px-3 shadow-sm">
                            <div className="flex flex-col">
                              <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">
                                Message Us
                              </span>
                              <span className="text-sm font-mono font-bold text-gray-800">
                                +1 (555) 123-4567
                              </span>
                            </div>
                            <button className="p-2 bg-[#25D366] text-white rounded-full shadow-md hover:bg-[#128C7E] transition-colors">
                              <MessageCircle size={16} />
                            </button>
                          </div>

                          {/* Option 2: Request Demo */}
                          <div className="flex items-center gap-2 p-1 bg-white/40 border border-white/50 backdrop-blur-md rounded-full shadow-sm focus-within:ring-2 focus-within:ring-gray-900/20 w-max">
                            <input
                              type="tel"
                              placeholder="Or enter your number"
                              className="bg-transparent border-none outline-none text-gray-900 px-4 py-2 w-40 text-sm font-medium"
                            />
                            <button
                              onClick={() => setIsAnyAgentOpen(true)}
                              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full font-bold shadow-md hover:bg-gray-800 transition-colors text-sm"
                            >
                              Get Demo <ArrowRight size={14} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-3 w-full max-w-sm">
                          <div className="flex items-center gap-1 p-1.5 bg-white/40 border border-white/50 backdrop-blur-md rounded-full shadow-sm focus-within:ring-2 focus-within:ring-gray-900/20">
                            <CountryCodeSelect
                              value={selectedCountry}
                              onChange={setSelectedCountry}
                              disabled={
                                isCallLoading ||
                                callState === "connecting" ||
                                callState === "connected"
                              }
                            />
                            <div className="w-px h-6 bg-gray-300/50"></div>
                            <input
                              type="tel"
                              placeholder="555 000 0000"
                              value={phoneNumber}
                              onChange={(e) => {
                                // Only allow numbers and basic formatting characters
                                const value = e.target.value.replace(
                                  /[^\d\s()-]/g,
                                  "",
                                );
                                setPhoneNumber(value);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && !isCallLoading) {
                                  handleMakeCall();
                                }
                              }}
                              disabled={
                                isCallLoading ||
                                callState === "connecting" ||
                                callState === "connected"
                              }
                              className="bg-transparent border-none outline-none text-gray-900 px-3 py-2 flex-1 text-sm font-medium disabled:opacity-50"
                            />
                            <button
                              onClick={handleMakeCall}
                              disabled={
                                isCallLoading ||
                                callState === "connecting" ||
                                callState === "connected"
                              }
                              className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-full font-bold shadow-md hover:bg-gray-800 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                            >
                              {callState === "connecting" ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                                  Connecting...
                                </>
                              ) : callState === "connected" ? (
                                <>
                                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                  Connected
                                </>
                              ) : callState === "disconnected" ? (
                                <>
                                  Call Again <ArrowRight size={16} />
                                </>
                              ) : (
                                <>
                                  Call Me <ArrowRight size={16} />
                                </>
                              )}
                            </button>
                          </div>

                          {/* Inline Notification */}
                          {callStatus.type && (
                            <div
                              className={`px-4 py-2.5 rounded-xl backdrop-blur-md border shadow-sm transition-all duration-300 animate-slide-up ${
                                callStatus.type === "success"
                                  ? "bg-white/40 border-white/50"
                                  : "bg-white/40 border-white/50"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {callStatus.type === "success" ? (
                                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0" />
                                ) : (
                                  <div className="w-2 h-2 bg-red-500 rounded-full shrink-0" />
                                )}
                                <span className="text-xs font-medium text-gray-800">
                                  {callStatus.message}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Persistent Disconnected State Message */}
                          {callState === "disconnected" && !callStatus.type && (
                            <div className="px-4 py-2.5 rounded-xl backdrop-blur-md border bg-white/40 border-white/50 shadow-sm">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-orange-500 rounded-full shrink-0" />
                                <span className="text-xs font-medium text-gray-800">
                                  Call Disconnected - Ready for next call
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </main>

      {/* --- AVATAR WIDGET --- */}
      {showAvatarWidget && (
        <LiveKitWidget
          onClose={() => {
            setShowAvatarWidget(false);
            setIsAnyAgentOpen(false);
          }}
        />
      )}

      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translate(-50%, 20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
