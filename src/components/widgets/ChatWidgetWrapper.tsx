"use client";

import dynamic from "next/dynamic";

// Dynamically import ChatWidget with SSR disabled to prevent hydration issues
const ChatWidget = dynamic(() => import("@/components/widgets/ChatWidget"), {
  ssr: false,
  loading: () => null, // Don't show loading state for chat widget
});

export default function ChatWidgetWrapper() {
  return <ChatWidget />;
}
