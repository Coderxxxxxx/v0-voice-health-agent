"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Mic, MicOff, Send, Bot, User, Volume2 } from "lucide-react"
import { voiceInteractionLogs } from "@/lib/mock-data"

type Message = {
  id: number
  role: "user" | "assistant"
  content: string
  timestamp: string
  type?: string
}

const quickCommands = [
  "What are my medications?",
  "Check my blood pressure",
  "When is my next appointment?",
  "Log vitals: BP 130/85",
  "What should I eat today?",
]

const aiResponses: Record<string, string> = {
  "what are my medications?": "You currently have 5 active medications: Metoprolol (50mg, twice daily), Lisinopril (10mg, once daily), Atorvastatin (20mg, once daily), Aspirin (81mg, once daily), and Metformin (500mg, twice daily).",
  "check my blood pressure": "Your latest blood pressure reading is 128/82 mmHg, recorded today. This is within normal range. Your average over the past week is 135/87 mmHg.",
  "when is my next appointment?": "Your next appointment with Dr. James Harrison (Cardiology) is scheduled for March 5, 2026 at 10:00 AM at City General Hospital.",
  "log vitals: bp 130/85": "Blood pressure 130/85 mmHg has been recorded at the current time. This reading is within the elevated range. I recommend monitoring closely and following your low-sodium diet plan.",
  "what should i eat today?": "Based on your DASH diet plan: Breakfast - Oatmeal with berries, lunch - Grilled salmon with leafy greens, dinner - Lean chicken with steamed vegetables. Keep sodium under 2,300mg. Increase potassium-rich foods like bananas and sweet potatoes.",
}

export function VoicePage() {
  const [messages, setMessages] = useState<Message[]>(
    voiceInteractionLogs.map((log) => [
      { id: log.id * 2 - 1, role: "user" as const, content: log.command, timestamp: log.timestamp, type: log.type },
      { id: log.id * 2, role: "assistant" as const, content: log.response, timestamp: log.timestamp, type: log.type },
    ]).flat()
  )
  const [input, setInput] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return

    const now = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: messageText,
      timestamp: now,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsProcessing(true)

    setTimeout(() => {
      const responseText = aiResponses[messageText.toLowerCase()] ||
        "I understand your request. Based on your health profile, I recommend consulting with Dr. Harrison for specific medical advice. Is there anything else I can help you with?"

      const assistantMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: responseText,
        timestamp: now,
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsProcessing(false)
    }, 1200)
  }

  const toggleListening = () => {
    setIsListening((prev) => !prev)
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false)
        handleSend("What are my medications?")
      }, 2500)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance">Voice Assistant</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Interact with VitaVoice using natural language
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="flex flex-col h-[600px]">
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Bot className="size-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold">VitaVoice Agent</CardTitle>
                    <CardDescription className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-success inline-block" />
                      Online and listening
                    </CardDescription>
                  </div>
                </div>
                <Button
                  variant={isListening ? "destructive" : "default"}
                  size="sm"
                  onClick={toggleListening}
                  className="gap-2"
                >
                  {isListening ? <MicOff className="size-4" /> : <Mic className="size-4" />}
                  {isListening ? "Stop" : "Voice Mode"}
                </Button>
              </div>
            </CardHeader>

            {isListening && (
              <div className="flex items-center justify-center gap-3 bg-primary/5 border-b px-4 py-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-primary rounded-full animate-pulse"
                      style={{
                        height: `${Math.random() * 20 + 8}px`,
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-primary">Listening...</span>
              </div>
            )}

            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="flex flex-col gap-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
                        message.role === "user"
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {message.role === "user" ? <User className="size-4" /> : <Bot className="size-4" />}
                    </div>
                    <div
                      className={`flex flex-col gap-1 max-w-[75%] ${
                        message.role === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        {message.content}
                      </div>
                      <div className="flex items-center gap-2 px-1">
                        <span className="text-[11px] text-muted-foreground">{message.timestamp}</span>
                        {message.role === "assistant" && (
                          <button className="text-muted-foreground hover:text-foreground transition-colors">
                            <Volume2 className="size-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isProcessing && (
                  <div className="flex gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Bot className="size-4" />
                    </div>
                    <div className="rounded-xl bg-secondary px-4 py-3">
                      <div className="flex gap-1">
                        <div className="size-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="size-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="size-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="border-t p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="flex gap-2"
              >
                <Input
                  placeholder="Type a command or question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={!input.trim() || isProcessing}>
                  <Send className="size-4" />
                </Button>
              </form>
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Quick Commands</CardTitle>
              <CardDescription>Common voice commands</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {quickCommands.map((cmd) => (
                <Button
                  key={cmd}
                  variant="outline"
                  size="sm"
                  className="justify-start text-left h-auto py-2.5 px-3 text-sm"
                  onClick={() => handleSend(cmd)}
                >
                  <Mic className="size-3.5 mr-2 shrink-0 text-muted-foreground" />
                  {cmd}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Interaction Log</CardTitle>
              <CardDescription>Recent voice activity</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {voiceInteractionLogs.slice(0, 4).map((log) => (
                <div key={log.id} className="flex items-start gap-3 rounded-lg border p-2.5">
                  <Badge
                    variant="outline"
                    className={`text-[10px] shrink-0 mt-0.5 ${
                      log.type === "reminder"
                        ? "border-primary/30 text-primary"
                        : log.type === "confirmation"
                          ? "border-success/30 text-success"
                          : log.type === "query"
                            ? "border-chart-4/30 text-chart-4"
                            : "border-muted-foreground/30 text-muted-foreground"
                    }`}
                  >
                    {log.type}
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{log.command}</p>
                    <p className="text-[11px] text-muted-foreground">{log.timestamp}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
