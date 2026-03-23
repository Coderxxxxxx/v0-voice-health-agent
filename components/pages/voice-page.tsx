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
import { detectLanguage, detectEnglishDialect, getLanguageSpecificGreeting } from "@/lib/language-detector"

type Message = {
  id: number
  role: "user" | "assistant"
  content: string
  timestamp: string
  type?: string
  detectedLanguage?: 'en' | 'ur-roman' | 'ur-rtl'
  dialect?: string
}

const quickCommands = [
  { label: "Meri davayin kya hain?", icon: Pill },
  { label: "Mera blood pressure check karo", icon: Heart },
  { label: "Mera agla appointment kab hai?", icon: Clock },
  { label: "Nai reminder add karo", icon: Pill },
  { label: "Sar dard ke liye pehli madad", icon: AlertCircle },
]

const aiResponses: Record<string, string> = {
  "meri davayin kya hain?": "Aap ke paas 5 faal davayin hain: Metoprolol (50mg, din mein 2 baar), Lisinopril (10mg, din mein 1 baar), Atorvastatin (20mg, din mein 1 baar), Aspirin (81mg, din mein 1 baar), aur Metformin (500mg, din mein 2 baar).",
  "meri davaiyaan kya hain": "Aap ke paas 5 faal davayin hain: Metoprolol (50mg, din mein 2 baar), Lisinopril (10mg, din mein 1 baar), Atorvastatin (20mg, din mein 1 baar), Aspirin (81mg, din mein 1 baar), aur Metformin (500mg, din mein 2 baar).",
  "mera blood pressure check karo": "Aap ki sabse nayi blood pressure reading 128/82 mmHg hai, jo aaj record ki gai. Yeh normal range mein hai. Aap ka guzra hua hafta average 135/87 mmHg tha.",
  "mera blood pressure kya hai": "Aap ki sabse nayi blood pressure reading 128/82 mmHg hai, jo aaj record ki gai. Yeh normal range mein hai. Aap ka guzra hua hafta average 135/87 mmHg tha.",
  "mera agla appointment kab hai?": "Aap ka agla appointment Dr. Ahmed Hassan (Cardiology) ke saath 5 March 2026 ko 10:00 AM par Aga Khan University Hospital, Lahore mein scheduled hai.",
  "mara agla appointment": "Aap ka agla appointment Dr. Ahmed Hassan (Cardiology) ke saath 5 March 2026 ko 10:00 AM par Aga Khan University Hospital, Lahore mein scheduled hai.",
  "nai reminder add karo": "Main ne nai reminder add kar di: Vitamin D supplement din mein ek baar lein. Kya aap is ke liye koi specific time set karna chahte ho?",
  "sar dard ke liye pehli madad": "Sar dard ke liye ye kadam uthayen: 1) Andheri, khamoshi wali jagah par aaram lein, 2) Sar par thandi ya garm compress lagayen, 3) Khub pani pien, 4) Over-the-counter pain reliever jaisa paracetamol le sakte ho (agar doctor ne approve kia ho). 5) Agar bohot bura ho toh turant doctor se milin.",
  "medical history update karni hai": "Main aap ki medical history update karne ke liye tayyar hoon. Kya nayi information add karna chahte ho? Aap mujhe nayi bimariyon, davai se allergies, surgeries, ya kisi aur health changes ke baare mein bata sakte ho.",
}

export function VoicePage() {
  const { t, language } = useI18n()
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

  // Auto-translate responses based on detected language from user input
  const getLanguageSpecificResponse = (baseText: string, detectedLang?: string): string => {
    const targetLang = detectedLang || language
    if (targetLang === 'ur-roman' || targetLang === 'ur-rtl') {
      // Simple language mapping for Urdu responses
      const urduResponses: Record<string, Record<string, string>> = {
        "You currently have 5 active medications": {
          'ur-roman': "Aap ke paas 5 active davayin hain: Metoprolol (50mg, din mein 2 baar), Lisinopril (10mg, din mein 1 baar), Atorvastatin (20mg, din mein 1 baar), Aspirin (81mg, din mein 1 baar), aur Metformin (500mg, din mein 2 baar).",
          'ur-rtl': "آپ کے پاس 5 فعال دوائیں ہیں: Metoprolol (50mg، دن میں 2 بار)، Lisinopril (10mg، دن میں 1 بار)، Atorvastatin (20mg، دن میں 1 بار)، Aspirin (81mg، دن میں 1 بار)، اور Metformin (500mg، دن میں 2 بار)۔"
        },
        "Your latest blood pressure reading": {
          'ur-roman': "Aapki sabse nayi blood pressure reading 128/82 mmHg hai, aaj record ki gai. Yeh normal range mein hai. Aapka guzra hua week average 135/87 mmHg tha.",
          'ur-rtl': "آپ کی تازہ ترین بلڈ پریشر ریڈنگ 128/82 mmHg ہے، آج ریکارڈ کی گئی۔ یہ عام حد میں ہے۔ آپ کا گزشتہ ہفتہ اوسط 135/87 mmHg تھا۔"
        },
        "Your next appointment": {
          'ur-roman': "Aapka agla appointment ڈاکٹر James Harrison (Cardiology) ke saath scheduled hai 5 March 2026 ko 10:00 AM par City General Hospital mein.",
          'ur-rtl': "آپ کی اگلی ملاقات ڈاکٹر جیمز ہیریسن (کارڈیولوجی) کے ساتھ 5 مارچ 2026 کو 10:00 AM پر City General Hospital میں شیڈول ہے۔"
        },
        "I've added a new reminder": {
          'ur-roman': "Main ne ek nayi reminder add kar di: Vitamin D supplement daily. Kya aap kisi specific time ke liye yeh reminder set karna chahte ho?",
          'ur-rtl': "میں نے ایک نئی reminder شامل کی: روزانہ Vitamin D supplement۔ کیا آپ اس reminder کو کسی مخصوص وقت کے لیے سیٹ کرنا چاہتے ہیں؟"
        },
        "For a headache, here's what": {
          'ur-roman': "Sar dard ke liye, yeh kuch kaam karenge: 1) Andheri, shuq jegh jagah mein aaram lein, 2) Sar par thandi ya garam compress lagayen, 3) Khub pani pien, 4) Paracetamol jaise over-the-counter pain reliever le sakte ho (agar doctor ne approve kia ho). 5) Agar bohot bura ho toh doctor se milein.",
          'ur-rtl': "سر درد کے لیے، یہاں کچھ کام ہیں: 1) سیاہ، خاموش جگہ میں آرام کریں، 2) سر پر ٹھنڈی یا گرم پٹی لگائیں، 3) بہت پانی پیئں، 4) paracetamol جیسی دوا لے سکتے ہو (اگر ڈاکٹر نے منظوری دی ہو)۔ 5) اگر بہت بری ہو تو ڈاکٹر سے ملیں۔"
        },
        "I'm ready to update": {
          'ur-roman': "Main aapki medical history update karne ke liye tayyar hoon. Kya nayi information add karna chahte ho? Aap mujhe nayi bimariyon, drug allergies, surgeries, ya kisi aur health changes ke baare mein bata sakte ho.",
          'ur-rtl': "میں آپ کی طبی تاریخ اپ ڈیٹ کرنے کے لیے تیار ہوں۔ آپ کیا نئی معلومات شامل کرنا چاہتے ہیں؟ آپ مجھے نئی بیماریوں، دوائوں سے الرجی، سرجریز، یا کسی دوسری صحتی تبدیلیوں کے بارے میں بتا سکتے ہو۔"
        }
      }

      // Check if response matches any of our translation keys
      for (const [key, translations] of Object.entries(urduResponses)) {
        if (baseText.includes(key)) {
          return translations[targetLang] || baseText
        }
      }
    }
    return baseText
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return

    setIsProcessing(true)

    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    // Auto-detect language from user input
    const detectedLang = detectLanguage(messageText)
    const dialect = detectedLang === 'en' ? detectEnglishDialect(messageText) : undefined

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: messageText,
      timestamp: now,
      detectedLanguage: detectedLang,
      dialect: dialect,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    setTimeout(() => {
      const baseResponse = aiResponses[messageText.toLowerCase()] ||
        "Main aap ki request samajh gaya. Aap ke health profile ke mutabiq, main aapko Dr. Ahmed Hassan se baat karne ki sifarish karta hoon. Kya main aap ki koyi aur madad kar sakta hoon?"

      const responseText = getLanguageSpecificResponse(baseResponse, detectedLang)

      const assistantMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: responseText,
        timestamp: now,
        detectedLanguage: detectedLang,
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 h-[calc(100vh-200px)]">
        <div className="lg:col-span-2 flex flex-col min-h-0">
          <Card className="flex flex-col flex-1 overflow-hidden">
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

            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1 overflow-hidden">
              <div className="border-b px-4 shrink-0">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="voice"><Voice></Voice> Mode</TabsTrigger>
                  <TabsTrigger value="transcripts">Transcripts</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="chat" className="flex flex-col flex-1 m-0 min-h-0 overflow-hidden">
                {isListening && (
                  <div className="flex items-center justify-center gap-3 bg-primary/5 border-b px-4 py-3 shrink-0">
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
                    <span className="text-sm font-medium text-primary">Suntaa hoon...</span>
                  </div>
                )}

                <ScrollArea className="flex-1 min-h-0 p-4" ref={scrollRef}>
                  <div className="flex flex-col gap-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                      >
                        <div
                          className={`flex size-8 shrink-0 items-center justify-center rounded-full ${message.role === "user"
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-primary text-primary-foreground"
                            }`}
                        >
                          {message.role === "user" ? <User className="size-4" /> : <Bot className="size-4" />}
                        </div>
                        <div
                          className={`flex flex-col gap-1 max-w-[75%] ${message.role === "user" ? "items-end" : "items-start"
                            }`}
                        >
                          <div
                            className={`rounded-xl px-4 py-2.5 text-sm leading-relaxed ${message.role === "user"
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

                <div className="border-t p-4 shrink-0">
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

              <TabsContent value="voice" className="flex flex-col flex-1 m-0 p-4 min-h-0 overflow-hidden">
                <div className="flex flex-col items-center justify-center gap-6 flex-1">
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 border-2 border-primary">
                      <Mic className="size-10 text-primary" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold">{t('startRecording')}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Apni awaz record karne ke liye header mein microphone button par click karen
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
                      <p className="text-center text-sm font-medium text-primary">Suntaa hoon...</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="transcripts" className="flex flex-col flex-1 m-0 min-h-0 overflow-hidden">
                <ScrollArea className="flex-1 min-h-0 p-4">
                  <div className="space-y-3">
                    {messages.filter(m => m.role === 'user').map((message, idx) => (
                      <div key={`${message.id}-${idx}`} className="border rounded-lg p-3">
                        <div className="flex items-start gap-3">
                          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                            <User className="size-3" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-sm font-medium text-foreground flex-1">{message.content}</p>
                              {message.detectedLanguage && (
                                <Badge variant="outline" className="text-[10px] shrink-0">
                                  {message.detectedLanguage === 'en' ? '🇬🇧 English' : message.detectedLanguage === 'ur-roman' ? '🇵🇰 Roman Urdu' : '🇵🇰 اردو'}
                                </Badge>
                              )}
                              {message.dialect && message.detectedLanguage === 'en' && (
                                <Badge variant="secondary" className="text-[10px] shrink-0">
                                  {message.dialect}
                                </Badge>
                              )}
                            </div>
                            <p className="text-[11px] text-muted-foreground">{message.timestamp}</p>
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
              <CardTitle className="text-base font-semibold">Baatcheet Log</CardTitle>
              <CardDescription>Taaza voice activity</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {voiceInteractionLogs.slice(0, 4).map((log) => (
                <div key={log.id} className="flex items-start gap-3 rounded-lg border p-2.5">
                  <Badge
                    variant="outline"
                    className={`text-[10px] shrink-0 mt-0.5 ${log.type === "reminder"
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
