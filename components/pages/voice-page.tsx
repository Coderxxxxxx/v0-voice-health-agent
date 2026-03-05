"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mic, MicOff, Send, Bot, User, Volume2, Clock, Heart, AlertCircle, Pill } from "lucide-react"
import { voiceInteractionLogs } from "@/lib/mock-data"
import { useI18n } from "@/lib/i18n-context"

type Message = {
  id: number
  role: "user" | "assistant"
  content: string
  timestamp: string
  type?: string
}

const quickCommands = [
  { label: "What are my medications?", icon: Pill },
  { label: "Check my blood pressure", icon: Heart },
  { label: "When is my next appointment?", icon: Clock },
  { label: "Add a reminder: Take vitamin D", icon: Pill },
  { label: "First aid for headache", icon: AlertCircle },
]

const aiResponses: Record<string, string> = {
  "what are my medications?": "You currently have 5 active medications: Metoprolol (50mg, twice daily), Lisinopril (10mg, once daily), Atorvastatin (20mg, once daily), Aspirin (81mg, once daily), and Metformin (500mg, twice daily).",
  "check my blood pressure": "Your latest blood pressure reading is 128/82 mmHg, recorded today. This is within normal range. Your average over the past week is 135/87 mmHg.",
  "when is my next appointment?": "Your next appointment with Dr. James Harrison (Cardiology) is scheduled for March 5, 2026 at 10:00 AM at City General Hospital.",
  "add a reminder: take vitamin d": "I've added a new reminder: Take vitamin D supplement daily. Would you like to set a specific time for this reminder?",
  "first aid for headache": "For a headache, here's what you can do: 1) Rest in a dark, quiet room, 2) Apply a cold or warm compress to your head, 3) Stay hydrated, 4) Take over-the-counter pain relievers like paracetamol if approved by your doctor. 5) If severe or persistent, seek medical attention.",
  "update my medical history": "I'm ready to update your medical history. What new information would you like to add? You can tell me about new diagnoses, allergies, surgeries, or any other health changes.",
}

export function VoicePage() {
  const { t } = useI18n()
  const [activeTab, setActiveTab] = useState("chat")
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
        <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance">{t('voice')}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t('startConversation')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="flex flex-col h-[600px]">
            <CardHeader className="pb-0 border-b">
              <div className="flex items-center justify-between mb-4">
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
                  {isListening ? t('stopRecording') : t('startRecording')}
                </Button>
              </div>
            </CardHeader>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1">
              <div className="border-b px-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="chat">{t('chat')}</TabsTrigger>
                  <TabsTrigger value="voice">{t('voice')}</TabsTrigger>
                  <TabsTrigger value="transcripts">{t('transcripts')}</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="chat" className="flex flex-col h-full flex-1 m-0">
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
                    placeholder={t('send')}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" disabled={!input.trim() || isProcessing}>
                    <Send className="size-4" />
                  </Button>
                </form>
              </div>
            </TabsContent>

            <TabsContent value="voice" className="flex flex-col h-full flex-1 m-0 p-4">
              <div className="flex flex-col items-center justify-center gap-6 h-full">
                <div className="flex flex-col items-center gap-3">
                  <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 border-2 border-primary">
                    <Mic className="size-10 text-primary" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold">{t('startRecording')}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Click the microphone button in the header to start recording your voice
                    </p>
                  </div>
                </div>
                {isListening && (
                  <div className="w-full">
                    <div className="flex items-center justify-center gap-1 mb-4">
                      {[...Array(15)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1 bg-primary rounded-full"
                          style={{
                            height: `${Math.random() * 40 + 10}px`,
                            animation: `pulse 0.5s ease-in-out infinite`,
                            animationDelay: `${i * 0.1}s`,
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-center text-sm font-medium text-primary">Listening...</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="transcripts" className="flex flex-col h-full flex-1 m-0">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                  {messages.filter(m => m.role === 'user').map((message, idx) => (
                    <div key={`${message.id}-${idx}`} className="border rounded-lg p-3">
                      <div className="flex items-start gap-3">
                        <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                          <User className="size-3" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{message.content}</p>
                          <p className="text-[11px] text-muted-foreground mt-1">{message.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            </Tabs>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">{t('askMedicine')}</CardTitle>
              <CardDescription>Common voice commands</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {quickCommands.map(({ label, icon: Icon }) => (
                <Button
                  key={label}
                  variant="outline"
                  size="sm"
                  className="justify-start text-left h-auto py-2.5 px-3 text-sm"
                  onClick={() => handleSend(label)}
                >
                  <Icon className="size-3.5 mr-2 shrink-0 text-muted-foreground" />
                  {label}
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
